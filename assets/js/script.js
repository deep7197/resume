document.addEventListener("DOMContentLoaded", function () {
    // Add Navigation
    document.body.appendChild(createNav());

    // Create main container wrapper
    const mainContainer = document.createElement("div");
    mainContainer.className = "msr_main_container";

    // Detect which page we're on
    const path = window.location.pathname;
    const page = path.replace(/\/+$/, "").split("/").pop().replace(/\.html$/, "");
    const isContact = page === "contact";
    const isAbout = page === "about";

    if (isContact) {
        mainContainer.appendChild(createContactSection());
    } else if (isAbout) {
        mainContainer.appendChild(createAboutSection());
    } else {
        mainContainer.appendChild(createMainSection());
    }

    document.body.appendChild(mainContainer);

    // Add Footer
    document.body.appendChild(createFooter());
});

function createNav() {
    const nav = document.createElement("nav");
    nav.className = "msr_nav";
    const navUl = document.createElement("ul");
    navUl.className = "msr_nav_links";
    [
        { text: "Home", href: "./" },
        { text: "About", href: "./about.html" },
        { text: "Contact", href: "./contact.html" },
        { text: "Download Resume", href: "assets/resume/MandeepSinghResume.pdf", download: true, liClass: "msr_resume_link" }
    ].forEach(link => {
        const li = document.createElement("li");
        if (link.liClass) li.className = link.liClass;
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.text;
        if (link.download) a.setAttribute("download", "MandeepSinghResume.pdf");
        li.appendChild(a);
        navUl.appendChild(li);
    });
    nav.appendChild(navUl);
    return nav;
}

function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "msr_footer";
    const p = document.createElement("p");
    p.innerHTML = "&copy; 2025 Mandeep Singh";
    footer.appendChild(p);
    footer.appendChild(createSocialLinks());
    return footer;
}

function createSocialLinks() {
    const socialUl = document.createElement("ul");
    socialUl.className = "msr_social_links";
    const links = [
        {
            icon: "fab fa-facebook-f",
            href: "https://www.facebook.com/profile.php?id=100067015698772",
            text: "Facebook"
        },
        {
            icon: "fab fa-instagram",
            href: "https://www.instagram.com/m__d__singh/",
            text: "Instagram"
        },
        {
            icon: "fab fa-linkedin-in",
            href: "https://www.linkedin.com/in/mandeep-singh-50b52430a/",
            text: "LinkedIn"
        }
    ];
    links.forEach(link => {
        const li = document.createElement("li");
        const i = document.createElement("i");
        i.className = link.icon;
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(i);
        li.appendChild(a);
        socialUl.appendChild(li);
    });
    return socialUl;
}

function createMainSection() {
    // Only return the mainDetails div, not the wrapper
    const mainDetails = document.createElement("div");
    mainDetails.className = "msr_main_details";
    const img = document.createElement("img");
    img.src = "assets/images/msImage.png";
    img.alt = "mandeep Singh";
    const mainContent = document.createElement("div");
    mainContent.className = "msr_main_content";
    const h1 = document.createElement("h1");
    h1.className = "msr_main_heading";
    h1.textContent = "Mandeep Singh";
    mainContent.appendChild(h1);
    mainDetails.appendChild(img);
    mainDetails.appendChild(mainContent);
    // Typewriter effect for description
    const descriptionText = "I'm a motivated and detail-oriented PHP/WordPress Developer with one year of hands-on experience in plugin development. I am eager to join a growth-focused IT company to enhance my technical skills and contribute to real-world projects while growing professionally";
    typeLetterByLetter("p", "msr_main_description", descriptionText, mainContent, 100);
    return mainDetails;
}

function createContactSection() {
    // Create msr_contact wrapper
    const contactWrapper = document.createElement("div");
    contactWrapper.className = "msr_contact";
    // Contact details container
    const contactContainer = document.createElement("div");
    contactContainer.className = "msr_contact_details_container";
    const h2 = document.createElement("h2");
    h2.textContent = "CONTACT DETAILS";
    contactContainer.appendChild(h2);
    const ul = document.createElement("ul");
    // Address
    let li = document.createElement("li");
    let pHeading = document.createElement("p");
    pHeading.className = "msr_heading";
    pHeading.textContent = "Address:";
    li.appendChild(pHeading);
    let pValue = document.createElement("p");
    pValue.textContent = "Vill. NIAMATPUR, P.O. SHAMDOO, Teh. RAJPURA, Dist. PATIALA";
    li.appendChild(pValue);
    ul.appendChild(li);
    // Phone
    li = document.createElement("li");
    pHeading = document.createElement("p");
    pHeading.className = "msr_heading";
    pHeading.textContent = "Phone:";
    li.appendChild(pHeading);
    let a = document.createElement("a");
    a.href = "tel:+91 7814030215";
    a.textContent = "+91 7814030215";
    li.appendChild(a);
    ul.appendChild(li);
    // LinkedIn
    li = document.createElement("li");
    pHeading = document.createElement("p");
    pHeading.className = "msr_heading";
    pHeading.textContent = "LinkedIn:";
    li.appendChild(pHeading);
    a = document.createElement("a");
    a.href = "https://www.linkedin.com/in/mandeep-singh-50b52430a/";
    a.target = "_blank";
    a.textContent = "Mandeep Singh";
    li.appendChild(a);
    ul.appendChild(li);
    // GitHub
    li = document.createElement("li");
    pHeading = document.createElement("p");
    pHeading.className = "msr_heading";
    pHeading.textContent = "GitHub:";
    li.appendChild(pHeading);
    a = document.createElement("a");
    a.href = "https://github.com/deep7197";
    a.target = "_blank";
    a.textContent = "deep7197";
    li.appendChild(a);
    ul.appendChild(li);
    // Email
    li = document.createElement("li");
    pHeading = document.createElement("p");
    pHeading.className = "msr_heading";
    pHeading.textContent = "Email:";
    li.appendChild(pHeading);
    a = document.createElement("a");
    a.href = "mailto:deep7197@gmail.com";
    a.textContent = "deep7197@gmail.com";
    li.appendChild(a);
    ul.appendChild(li);
    contactContainer.appendChild(ul);
    contactWrapper.appendChild(contactContainer);
    return contactWrapper;
}

function createAboutSection() {
    // Only return the aboutDiv
    const aboutDiv = document.createElement("div");
    aboutDiv.className = "msr_about";
    // About Container
    const aboutContainer = document.createElement("div");
    aboutContainer.className = "msr_about_container";
    const h2 = document.createElement("h2");
    h2.className = "msr_secondary_education_heading";
    h2.textContent = "About";
    aboutContainer.appendChild(h2);
    const aboutP = document.createElement("p");
    aboutP.className = "msr_secondary_education_content";
    aboutP.innerHTML = `<span>I</span> come from a non-IT background but have\nsuccessfully built a career in the tech industry as a PHP Full Stack Developer. Currently, I&apos;m\n        working at <a class=\"msr_link\" href=\"https://www.coolplugins.net/\" target=\"_blank\">CoolPlugins</a>, where I focus on developing custom plugins and solutions for WordPress. I\n        have strong skills in PHP, MySQL, HTML, CSS, and JavaScript, and I&apos;m also exploring React to expand\n        my front-end capabilities. My journey into IT reflects my dedication to continuous learning and a\n        passion for creating efficient, user-friendly web tools.`;
    aboutContainer.appendChild(aboutP);
    aboutDiv.appendChild(aboutContainer);
    // Main Education Container
    const mainEduContainer = document.createElement("div");
    mainEduContainer.className = "msr_main_edu_container";
    // Academic Qualifications
    const eduContainer = document.createElement("div");
    eduContainer.className = "msr_education_container";
    const eduH2 = document.createElement("h2");
    eduH2.textContent = "ACADEMIC QUALIFICATIONS";
    eduContainer.appendChild(eduH2);
    const eduUl = document.createElement("ul");
    [
        "10<sup>th</sup> passed from PSEB",
        "10+2 passed from PSEB",
        "B.Com (Accounting and Finance) passed from Punjabi University"
    ].forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = item;
        eduUl.appendChild(li);
    });
    eduContainer.appendChild(eduUl);
    mainEduContainer.appendChild(eduContainer);
    // Technical Qualifications
    const tecEduContainer = document.createElement("div");
    tecEduContainer.className = "msr_tec_education_container";
    const tecH2 = document.createElement("h2");
    tecH2.textContent = "TECHNICAL QUALIFICATION";
    tecEduContainer.appendChild(tecH2);
    const tecUl = document.createElement("ul");
    [
        "6 Months Training PHP Full Stack (Teclive Mohali)",
        "Framwork: LARAVAL"
    ].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        tecUl.appendChild(li);
    });
    tecEduContainer.appendChild(tecUl);
    mainEduContainer.appendChild(tecEduContainer);
    aboutDiv.appendChild(mainEduContainer);
    return aboutDiv;
}

function typeLetterByLetter(tagName, className, text, container, speed = 100) {
    const element = document.createElement(tagName);
    element.className = className;
    container.appendChild(element);
    let index = 0;
    function typeNextChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, speed);
        }
    }
    typeNextChar();
}
