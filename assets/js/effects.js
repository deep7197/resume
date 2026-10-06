/* Effects layer: 3D background scene, tilt cards, scroll reveal, text scramble.
   Loaded after script.js, which calls initEffects(page) once the page is built. */

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

function initEffects(page) {
    initCursorGlow();
    initReveal();
    initTimeline();
    initTilt();
    const name = document.querySelector(".msr_hero_name");
    if (name) scrambleText(name, PROFILE.name);
    initScene(page);
}

function initCursorGlow() {
    const glow = el("div", "msr_glow");
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);
    window.addEventListener("pointermove", e => {
        glow.style.setProperty("--mx", e.clientX + "px");
        glow.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });
}

function initReveal() {
    if (REDUCED_MOTION || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll(
        ".msr_page_head, .msr_section_title, .msr_job, .msr_skill_group, .msr_panel, .msr_contact_item, .msr_section > .msr_chips, .msr_section > .msr_muted"
    );
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("msr_in");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    targets.forEach((node, i) => {
        node.classList.add("msr_reveal");
        node.style.transitionDelay = (i % 4) * 70 + "ms";
        io.observe(node);
    });
}

function initTilt() {
    if (REDUCED_MOTION || window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll(".msr_hero_visual, .msr_panel, .msr_contact_item, .msr_skill_group").forEach(card => {
        card.classList.add("msr_tilt");
        card.addEventListener("pointermove", e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.setProperty("--ry", (x * 12).toFixed(2) + "deg");
            card.style.setProperty("--rx", (-y * 12).toFixed(2) + "deg");
            card.style.setProperty("--px", (x * 100 + 50).toFixed(1) + "%");
            card.style.setProperty("--py", (y * 100 + 50).toFixed(1) + "%");
        });
        card.addEventListener("pointerleave", () => {
            card.style.setProperty("--ry", "0deg");
            card.style.setProperty("--rx", "0deg");
        });
    });
}

function scrambleText(node, finalText) {
    if (REDUCED_MOTION) return;
    const glyphs = "!<>-_/[]{}=+*^?#01";
    const total = 36;
    let frame = 0;
    // Lock the final height so scrambled glyphs of other widths cannot shift the hero
    node.textContent = finalText;
    node.style.minHeight = node.offsetHeight + "px";
    const timer = setInterval(() => {
        const settled = Math.floor((frame / total) * finalText.length);
        let out = "";
        for (let i = 0; i < finalText.length; i++) {
            out += finalText[i] === " " || i < settled
                ? finalText[i]
                : glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        node.textContent = out;
        if (++frame > total) {
            clearInterval(timer);
            node.textContent = finalText;
        }
    }, 40);
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

function initScene(page) {
    if (REDUCED_MOTION) return;
    loadScript(THREE_URL).then(() => buildScene(page)).catch(() => {});
}

function buildScene(page) {
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
        return;
    }
    const canvas = renderer.domElement;
    canvas.id = "msr_bg";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060f, 0.03);
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
    camera.position.z = 9;

    // Star field in cyan and violet
    const count = 2200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color(0x3df2ff);
    const violet = new THREE.Color(0xa35cff);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
        const c = Math.random() > 0.5 ? cyan : violet;
        col.set([c.r, c.g, c.b], i * 3);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
        size: 0.07, vertexColors: true, transparent: true, opacity: 0.85,
        blending: THREE.AdditiveBlending, depthWrite: false
    }));
    scene.add(stars);

    // One wireframe shape per page, with a counter-rotating core
    const shapes = {
        home: new THREE.TorusKnotGeometry(1.6, 0.45, 160, 18),
        about: new THREE.IcosahedronGeometry(2.1, 1),
        contact: new THREE.SphereGeometry(2, 28, 18)
    };
    const outer = new THREE.Mesh(shapes[page], new THREE.MeshBasicMaterial({
        color: 0x3df2ff, wireframe: true, transparent: true, opacity: 0.55
    }));
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 0), new THREE.MeshBasicMaterial({
        color: 0xa35cff, wireframe: true, transparent: true, opacity: 0.9
    }));
    const group = new THREE.Group();
    group.add(outer, inner);
    scene.add(group);

    // Grid floor that drifts toward the viewer
    const grid = new THREE.GridHelper(80, 80, 0x3df2ff, 0x2a2f7a);
    grid.position.y = -7;
    grid.material.transparent = true;
    grid.material.opacity = 0.35;
    scene.add(grid);

    // Recolor the scene to match the page theme (additive glow only works on dark)
    const starColors = [];
    for (let i = 0; i < count; i++) starColors.push(col[i * 3] < 0.5 ? 0 : 1);
    function applyTheme() {
        const light = document.documentElement.dataset.theme === "light";
        const a = new THREE.Color(light ? 0x3a3fe0 : 0x3df2ff);
        const b = new THREE.Color(light ? 0x9333ea : 0xa35cff);
        starColors.forEach((which, i) => {
            const c = which === 0 ? a : b;
            col.set([c.r, c.g, c.b], i * 3);
        });
        starGeo.attributes.color.needsUpdate = true;
        stars.material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
        stars.material.opacity = light ? 0.6 : 0.85;
        stars.material.needsUpdate = true;
        outer.material.color.set(light ? 0x3a3fe0 : 0x3df2ff);
        inner.material.color.set(light ? 0x9333ea : 0xa35cff);
        outer.material.opacity = light ? 0.4 : 0.55;
        scene.fog.color.set(light ? 0xeef0fa : 0x05060f);
        grid.material.opacity = light ? 0.22 : 0.35;
        grid.material.color.set(light ? 0x6b72d6 : 0xffffff);
    }
    applyTheme();
    window.addEventListener("msr-theme", applyTheme);

    let mx = 0, my = 0, scrollY = 0, baseScale = 1;
    window.addEventListener("pointermove", e => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

    function resize() {
        const w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const wide = w > 860;
        baseScale = wide ? 1 : 0.8;
        group.position.set(wide ? 4.2 : 0, wide ? 0 : 3.2, wide ? -2 : -6);
    }
    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    (function loop() {
        requestAnimationFrame(loop);
        const t = clock.getElapsedTime();
        outer.rotation.x = t * 0.18 + scrollY * 0.0012;
        outer.rotation.y = t * 0.25;
        inner.rotation.x = -t * 0.4;
        inner.rotation.y = -t * 0.3;
        group.scale.setScalar(baseScale * (1 + Math.sin(t * 1.4) * 0.04));
        stars.rotation.y = t * 0.012 + mx * 0.15;
        stars.rotation.x = my * 0.1;
        grid.position.z = (t * 1.5) % 1;
        camera.position.x += (mx * 1.6 - camera.position.x) * 0.04;
        camera.position.y += (-my * 1.2 - camera.position.y) * 0.04;
        camera.position.z = 9 - Math.min(scrollY / 900, 1) * 2.5;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    })();
}

/* Timeline: fill the spine as the reader scrolls and light up nodes already passed */
function initTimeline() {
    const timeline = document.querySelector(".msr_timeline");
    if (!timeline) return;
    const jobs = timeline.querySelectorAll(".msr_job");
    const update = () => {
        const rect = timeline.getBoundingClientRect();
        const mark = window.innerHeight * 0.6;
        const progress = Math.min(Math.max((mark - rect.top) / rect.height, 0), 1);
        timeline.style.setProperty("--progress", (progress * 100).toFixed(1) + "%");
        jobs.forEach(job => {
            job.classList.toggle("msr_passed", job.getBoundingClientRect().top + 34 < mark);
        });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
}
