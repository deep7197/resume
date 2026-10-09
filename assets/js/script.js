/* ---------- Content ---------- */

const PROFILE = {
    name: "Mandeep Singh",
    role: "WordPress Developer | PHP Web Developer",
    location: "Rajpura, Punjab",
    phone: "+91 7814030215",
    email: "deep7197@gmail.com",
    linkedin: "https://www.linkedin.com/in/mandeep-singh-50b52430a/",
    github: "https://github.com/deep7197",
    summary: "I'm a WordPress and PHP Web Developer with experience building custom plugins and Theme, Elementor widgets, Divi modules, Gutenberg blocks, REST APIs, and web applications. I enjoy solving complex problems, learning new technologies, and building scalable, user-friendly applications.",
    resume: "assets/resume/MandeepSinghResume.pdf"
};

const SOCIAL = [
    { icon: "fab fa-facebook-f", text: "Facebook", href: "https://www.facebook.com/profile.php?id=100067015698772" },
    { icon: "fab fa-instagram", text: "Instagram", href: "https://www.instagram.com/m__d__singh/" },
    { icon: "fab fa-linkedin-in", text: "LinkedIn", href: PROFILE.linkedin },
    { icon: "fab fa-github", text: "GitHub", href: PROFILE.github }
];

const EXPERIENCE = [
    {
        title: "Senior Web Developer",
        company: "Erginous Technologies",
        companyUrl: "https://erginous.com/",
        place: "Rajpura, India",
        period: "09/2025 - 09/2026",
        duration: "1 year",
        points: [
            "Built and maintained the PHP APIs behind mobile apps, powering multiple features and business workflows.",
            "Built meeting management modules that made web applications easier to use and speeded up team workflows.",
            "Developed backend APIs and features for Vadi, an AI meeting intelligence platform covering recording, transcription, AI summaries, searchable insights, cloud storage and real-time processing.",
            "Contributed to the Complaints Management module of the OzStaff system.",
            "Integrated and improved the AI chatbot on the Inovcares platform.",
            "Built session creation and preview report features for reporting systems.",
            "Worked on AI-driven data processing and management features."
        ]
    },
    {
        title: "WordPress Developer",
        company: "CoolPlugins",
        companyUrl: "https://www.coolplugins.net/",
        place: "Mohali, Punjab",
        period: "08/2023 - 07/2025",
        duration: "2 years",
        points: [
            "Built custom addons and extensions for the Elementor and Divi page builders.",
            "Created Elementor widgets and Divi modules with responsive, easy-to-use controls.",
            "Added and maintained features in event management plugins, including event handling and scheduling.",
            "Wrote and maintained custom WordPress plugins & Theme focused on performance, scalability and reusable code.",
            "Worked daily with WordPress hooks, REST APIs, AJAX, custom post types and the Settings API.",
            "Integrated chatbots and built custom Gutenberg block plugins for WordPress sites."
        ]
    }
];

const PROJECTS = [
    { name: "LC HoverPeek", type: "WordPress plugin", url: "https://wordpress.org/plugins/lc-hoverpeek/" },
    { name: "LC Kit for Elementor", type: "Elementor widgets", url: "https://wordpress.org/plugins/lc-addons-kit-for-elementor/" },
    { name: "MS Gallery for Divi", type: "Divi modules", url: "https://wordpress.org/plugins/ms-gallery-for-divi-lite/" },
    { name: "Botisst AI Chat Assistant", type: "AI chatbot plugin", url: "https://wordpress.org/plugins/botisst-ai-chat-assistant/" },
    { name: "Blockive Premium Addon", type: "Gutenberg blocks", url: "https://wordpress.org/plugins/blockive-premium-addon-for-block/" }
];

const SKILLS = [
    { group: "Backend", items: ["PHP", "Laravel", "CodeIgniter", "MySQL", "REST API Integration", "Plugin/Theme Architecture"] },
    { group: "WordPress", items: ["WordPress Development", "Elementor", "Divi", "Gutenberg"] },
    { group: "Frontend", items: ["JavaScript", "jQuery", "React JS", "TypeScript", "NextJS", "Bootstrap", "Tailwind", "HTML", "CSS", "SCSS"] },
    { group: "Automation and AI", items: ["N8N", "MCP", "Zapier", "Prompt Engineering", "Python (Basic)", "Claude Code Cli", "Codex"] },
    { group: "Other", items: ["Shopify (Basic)", "Debugging & Troubleshooting", "Support Agent"] }
];

const EDUCATION = [
    { name: "B.Com", detail: "Punjabi University, Patiala" },
    { name: "10+2", detail: "PSEB" },
    { name: "10th", detail: "PSEB" }
];

const LANGUAGES = [
    { name: "English", level: "Proficient" },
    { name: "Hindi", level: "Native" },
    { name: "Punjabi", level: "Native" }
];

/* ---------- Helpers ---------- */

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function link(href, text, className, external) {
    const a = el("a", className, text);
    a.href = href;
    if (external) {
        a.target = "_blank";
        a.rel = "noopener";
    }
    return a;
}

function icon(classes) {
    const i = el("i", classes);
    i.setAttribute("aria-hidden", "true");
    return i;
}

function currentPage() {
    const last = window.location.pathname.replace(/\/+$/, "").split("/").pop().replace(/\.html$/, "");
    return last === "about" || last === "contact" ? last : "home";
}

/* ---------- Page shell ---------- */

document.addEventListener("DOMContentLoaded", function () {
    const page = currentPage();
    document.body.appendChild(createNav(page));

    const main = el("main", "msr_main_container");
    main.id = "main";
    if (page === "contact") main.appendChild(createContactSection());
    else if (page === "about") main.appendChild(createAboutSection());
    else main.appendChild(createMainSection());
    document.body.appendChild(main);

    document.body.appendChild(createFooter());

    if (typeof initEffects === "function") initEffects(page);
});

function createNav(page) {
    const nav = el("nav", "msr_nav");
    nav.setAttribute("aria-label", "Main");
    const inner = el("div", "msr_nav_inner");

    inner.appendChild(link("./", "Mandeep Singh", "msr_brand"));

    const ul = el("ul", "msr_nav_links");
    [
        { key: "home", text: "Home", href: "./" },
        { key: "about", text: "About", href: "./about/" },
        { key: "contact", text: "Contact", href: "./contact/" }
    ].forEach(item => {
        const li = el("li");
        const a = link(item.href, item.text);
        if (item.key === page) a.setAttribute("aria-current", "page");
        li.appendChild(a);
        ul.appendChild(li);
    });
    inner.appendChild(ul);

    inner.appendChild(createThemeToggle());

    const dl = link(PROFILE.resume, "Download resume", "msr_btn msr_btn_small");
    dl.setAttribute("download", "MandeepSinghResume.pdf");
    inner.appendChild(dl);

    nav.appendChild(inner);
    return nav;
}

function createThemeToggle() {
    const root = document.documentElement;
    const btn = el("button", "msr_theme_toggle");
    btn.type = "button";
    const sync = () => {
        const light = root.dataset.theme === "light";
        btn.replaceChildren(icon(light ? "fa-solid fa-moon" : "fa-solid fa-sun"));
        btn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
        btn.title = light ? "Dark mode" : "Light mode";
    };
    btn.addEventListener("click", () => {
        const next = root.dataset.theme === "light" ? "dark" : "light";
        root.dataset.theme = next;
        try { localStorage.setItem("msr-theme", next); } catch (e) { /* storage blocked */ }
        sync();
        window.dispatchEvent(new CustomEvent("msr-theme"));
    });
    sync();
    return btn;
}

function createFooter() {
    const footer = el("footer", "msr_footer");
    const inner = el("div", "msr_footer_inner");
    inner.appendChild(el("p", "", "© 2026 Mandeep Singh"));
    inner.appendChild(createSocialLinks());
    footer.appendChild(inner);
    return footer;
}

function createSocialLinks() {
    const ul = el("ul", "msr_social_links");
    SOCIAL.forEach(item => {
        const li = el("li");
        const a = link(item.href, "", "", true);
        a.setAttribute("aria-label", item.text);
        a.title = item.text;
        a.appendChild(icon(item.icon));
        li.appendChild(a);
        ul.appendChild(li);
    });
    return ul;
}

/* ---------- Home ---------- */

function createMainSection() {
    const hero = el("section", "msr_hero");

    const text = el("div", "msr_hero_text");
    const nameEl = el("h1", "msr_hero_name", PROFILE.name);
    nameEl.setAttribute("aria-label", PROFILE.name);
    text.appendChild(nameEl);
    text.appendChild(el("p", "msr_hero_role", PROFILE.role));

    const summary = el("p", "msr_hero_summary");
    text.appendChild(summary);
    typeLetterByLetter(summary, PROFILE.summary, 14);

    const actions = el("div", "msr_actions");
    actions.appendChild(link("./about/", "See my experience", "msr_btn"));
    actions.appendChild(link("./contact/", "Get in touch", "msr_btn msr_btn_ghost"));
    text.appendChild(actions);

    const code = createHud();

    const visual = el("div", "msr_hero_visual");
    const img = el("img");
    img.src = "assets/images/msImage.png";
    img.alt = "Portrait of Mandeep Singh";
    img.width = 433;
    img.height = 577;
    const photo = el("div", "msr_photo");
    photo.appendChild(img);
    visual.appendChild(photo);
    visual.appendChild(code);

    hero.appendChild(text);
    hero.appendChild(visual);
    return hero;
}

// Floating profile panel on the hero: what I build, key numbers, and a stack ticker
function createHud() {
    const hud = el("div", "msr_hud");
    hud.setAttribute("role", "group");
    hud.setAttribute("aria-label", "Profile summary");

    const bar = el("div", "msr_hud_bar");
    bar.appendChild(el("span", "msr_hud_dot"));
    bar.appendChild(el("span", "msr_hud_title", "mandeep.profile"));
    bar.appendChild(el("span", "msr_hud_loc", PROFILE.location));
    hud.appendChild(bar);

    const line = el("p", "msr_hud_line");
    line.appendChild(el("span", "msr_hud_prompt", "> I build "));
    const typed = el("span", "msr_hud_typed");
    line.appendChild(typed);
    line.appendChild(el("span", "msr_hud_cursor", "_"));
    hud.appendChild(line);

    const stats = el("ul", "msr_hud_stats");
    [
        ["3+", "years in WordPress and PHP"],
        ["5", "featured plugins"],
        ["2", "product companies"]
    ].forEach(([num, label]) => {
        const li = el("li");
        li.appendChild(el("strong", "", num));
        li.appendChild(el("span", "", label));
        stats.appendChild(li);
    });
    hud.appendChild(stats);

    const stack = ["PHP", "WordPress", "Elementor", "Divi", "Gutenberg", "Laravel", "React", "TypeScript", "MySQL", "REST APIs"];
    const ticker = el("div", "msr_hud_ticker");
    ticker.setAttribute("aria-hidden", "true");
    const track = el("div", "msr_hud_track");
    stack.concat(stack).forEach(name => track.appendChild(el("span", "", name)));
    ticker.appendChild(track);
    hud.appendChild(ticker);

    cycleTyping(typed, [
        "Elementor widgets",
        "Divi modules",
        "Gutenberg blocks",
        "REST APIs",
        "AI chatbot integrations",
        "Laravel applications"
    ]);
    return hud;
}

function cycleTyping(node, phrases) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        node.textContent = phrases.join(", ");
        return;
    }
    let p = 0, i = 0, deleting = false;
    (function tick() {
        const word = phrases[p];
        i += deleting ? -1 : 1;
        node.textContent = word.slice(0, i);
        let delay = deleting ? 35 : 70;
        if (!deleting && i === word.length) { deleting = true; delay = 1400; }
        else if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 350; }
        setTimeout(tick, delay);
    })();
}

/* ---------- About ---------- */

function section(title, className) {
    const s = el("section", "msr_section " + (className || ""));
    s.appendChild(el("h2", "msr_section_title", title));
    return s;
}

function createAboutSection() {
    const wrap = el("div", "msr_about");

    // Intro
    const intro = el("header", "msr_page_head");
    intro.appendChild(el("h1", "", "About"));
    const p = el("p", "msr_lead");
    p.appendChild(document.createTextNode("I started in commerce, with a B.Com, and taught myself into web development through a six-month PHP Full Stack program. Since then I've built WordPress plugins at "));
    p.appendChild(link("https://www.coolplugins.net/", "CoolPlugins", "msr_link", true));
    p.appendChild(document.createTextNode(" and backend APIs for AI products at "));
    p.appendChild(link("https://erginous.com/", "Erginous Technologies.", "msr_link", true));
    intro.appendChild(p);
    intro.appendChild(el("p", "msr_muted msr_lead_sub", "I work mostly in PHP, WordPress and JavaScript, and I like clean, reusable code that stays fast as a project grows. I enjoy tracing a hard bug to its cause and picking up new tools, from React and TypeScript to AI integrations and automation."));
    wrap.appendChild(intro);

    // Experience (a real sequence, so a timeline)
    const exp = section("Experience");
    const ol = el("ol", "msr_timeline");
    EXPERIENCE.forEach(job => {
        const li = el("li", "msr_job");

        const side = el("div", "msr_job_side");
        side.appendChild(el("time", "msr_job_period", job.period));
        side.appendChild(el("span", "msr_job_duration", job.duration));
        li.appendChild(side);

        const body = el("div", "msr_job_body");
        const head = el("div", "msr_job_head");
        head.appendChild(el("h3", "", job.title));
        const co = el("p", "msr_job_company");
        if (job.companyUrl) co.appendChild(link(job.companyUrl, job.company, "msr_link", true));
        else co.appendChild(document.createTextNode(job.company));
        co.appendChild(document.createTextNode(", " + job.place));
        head.appendChild(co);
        body.appendChild(head);

        const ul = el("ul", "msr_points");
        job.points.forEach(pt => ul.appendChild(el("li", "", pt)));
        body.appendChild(ul);

        // Long lists start collapsed to the first three points
        const VISIBLE = 3;
        if (job.points.length > VISIBLE + 1) {
            const items = ul.querySelectorAll("li");
            const toggle = el("button", "msr_job_toggle");
            toggle.type = "button";
            const setOpen = open => {
                items.forEach((item, i) => { item.hidden = !open && i >= VISIBLE; });
                toggle.textContent = open ? "Show less" : "Show all " + items.length + " points";
                toggle.setAttribute("aria-expanded", String(open));
            };
            toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
            setOpen(false);
            body.appendChild(toggle);
        }

        li.appendChild(body);
        ol.appendChild(li);
    });
    exp.appendChild(ol);
    wrap.appendChild(exp);

    // Projects
    const proj = section("More projects");
    const projIntro = el("p", "msr_muted");
    projIntro.appendChild(document.createTextNode("Contributed to live WordPress.org plugins, developing custom Elementor widgets, Divi modules, and Gutenberg blocks. Implemented AI and API integrations, responsive design controls, and advanced editor functionality to enhance usability, flexibility, and performance."));
    proj.appendChild(projIntro);
    const cards = el("ul", "msr_plugin_grid");
    PROJECTS.forEach(p => {
        const li = el("li", "msr_plugin_card");
        const title = el("strong");
        if (p.url) title.appendChild(link(p.url, p.name, "msr_link", true));
        else title.appendChild(document.createTextNode(p.name));
        li.appendChild(title);
        li.appendChild(el("span", "msr_muted_block", p.type));
        if (p.url) li.appendChild(link(p.url, "View on WordPress.org", "msr_link msr_plugin_org", true));
        cards.appendChild(li);
    });
    proj.appendChild(cards);
    wrap.appendChild(proj);

    // Skills
    const skills = section("Skills");

    // 3D carousel: core skills orbiting on a ring (decorative, full list is below)
    const ringSkills = ["PHP", "WordPress", "Elementor", "Divi", "Gutenberg", "Laravel", "React JS", "TypeScript", "MySQL", "REST APIs"];
    const ring = el("div", "msr_ring");
    ring.setAttribute("aria-hidden", "true");
    const track = el("div", "msr_ring_track");
    ringSkills.forEach((name, i) => {
        const item = el("span", "msr_ring_item", name);
        item.style.setProperty("--i", i);
        item.style.setProperty("--n", ringSkills.length);
        track.appendChild(item);
    });
    ring.appendChild(track);
    skills.appendChild(ring);

    const grid = el("div", "msr_skill_grid");
    SKILLS.forEach(group => {
        const box = el("div", "msr_skill_group");
        box.appendChild(el("h3", "", group.group));
        const ul = el("ul", "msr_chips");
        group.items.forEach(item => ul.appendChild(el("li", "msr_chip", item)));
        box.appendChild(ul);
        grid.appendChild(box);
    });
    skills.appendChild(grid);
    wrap.appendChild(skills);

    // Education / internship / languages
    const trio = el("div", "msr_trio");

    const edu = section("Education", "msr_panel");
    const eduUl = el("ul", "msr_plain");
    EDUCATION.forEach(e => {
        const li = el("li");
        li.appendChild(el("strong", "", e.name));
        li.appendChild(document.createTextNode(" " + e.detail));
        if (e.period) li.appendChild(el("span", "msr_muted_block", e.period));
        eduUl.appendChild(li);
    });
    edu.appendChild(eduUl);

    const intern = section("Internship", "msr_panel");
    intern.appendChild(el("h3", "msr_panel_sub", "PHP Full Stack, Teclive Mohali"));
    intern.appendChild(el("p", "msr_muted", "Six months of hands-on training in full stack development. Frontend with HTML, CSS, JavaScript and Bootstrap. Backend with Core PHP and MySQL. Dynamic apps with Laravel, including REST API integrations, CRUD operations and the basics of deployment."));

    const lang = section("Languages", "msr_panel");
    const langUl = el("ul", "msr_plain");
    LANGUAGES.forEach(l => {
        const li = el("li");
        li.appendChild(el("strong", "", l.name));
        li.appendChild(el("span", "msr_muted_block", l.level));
        langUl.appendChild(li);
    });
    lang.appendChild(langUl);

    trio.appendChild(edu);
    trio.appendChild(intern);
    trio.appendChild(lang);
    wrap.appendChild(trio);

    return wrap;
}

/* ---------- Contact ---------- */

function createContactSection() {
    const wrap = el("div", "msr_contact");

    const head = el("header", "msr_page_head");
    head.appendChild(el("h1", "", "Contact"));
    head.appendChild(el("p", "msr_lead", "Email is the fastest way to reach me. I'm based in Rajpura, Punjab."));
    wrap.appendChild(head);

    const list = el("ul", "msr_contact_list");
    [
        { icon: "fa-solid fa-envelope", label: "Email", text: PROFILE.email, href: "mailto:" + PROFILE.email },
        { icon: "fa-solid fa-phone", label: "Phone", text: PROFILE.phone, href: "tel:" + PROFILE.phone.replace(/\s/g, "") },
        { icon: "fab fa-linkedin-in", label: "LinkedIn", text: "Mandeep Singh", href: PROFILE.linkedin, external: true },
        { icon: "fab fa-github", label: "GitHub", text: "deep7197", href: PROFILE.github, external: true },
        { icon: "fa-solid fa-location-dot", label: "Location", text: PROFILE.location }
    ].forEach(item => {
        const li = el("li", "msr_contact_item");
        li.appendChild(icon(item.icon));
        const body = el("div");
        body.appendChild(el("span", "msr_contact_label", item.label));
        if (item.href) body.appendChild(link(item.href, item.text, "msr_contact_value", item.external));
        else body.appendChild(el("span", "msr_contact_value", item.text));
        li.appendChild(body);
        list.appendChild(li);
    });
    wrap.appendChild(list);

    return wrap;
}

/* ---------- Typewriter (skipped when reduced motion is requested) ---------- */

function typeLetterByLetter(element, text, speed) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.textContent = text;
        return;
    }
    // Lay out the full text first and lock its height, so nothing around it moves while typing
    element.textContent = text;
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
        element.style.minHeight = element.offsetHeight + "px";
        element.textContent = "";
        let index = 0;
        (function typeNextChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index++);
                setTimeout(typeNextChar, speed);
            }
        })();
    });
}
