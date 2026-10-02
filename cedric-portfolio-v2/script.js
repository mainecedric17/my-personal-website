const body = document.body;

const theme = document.querySelector("#theme");
const menu = document.querySelector("#menu");
const nav = document.querySelector("#nav");
const year = document.querySelector("#year");
const scrollProgress = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");


// YEAR

year.textContent = new Date().getFullYear();


// DARK MODE

theme.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    theme.textContent = isDark ? "☾" : "☼";

});


// MOBILE MENU

menu.addEventListener("click", () => {

    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");

    menu.textContent = isOpen ? "×" : "☰";

});


// CLOSE MOBILE MENU AFTER CLICK

document.querySelectorAll("#nav a").forEach((link) => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        menu.textContent = "☰";

    });

});


// SCROLL PROGRESS

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;

});


// ACTIVE NAVIGATION

const sections = document.querySelectorAll(
    "main section[id]"
);

const navLinks = document.querySelectorAll(
    "#nav a"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `#nav a[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// PROJECT FILTERS

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((filter) => {

    filter.addEventListener("click", () => {

        filters.forEach((item) => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const type = filter.dataset.filter;

        projects.forEach((project) => {

            const matches =
                type === "all" ||
                project.dataset.type === type;

            project.classList.toggle(
                "hide",
                !matches
            );

        });

    });

});


// CURSOR GLOW

if (window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener("mousemove", (event) => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    });

}


// SCROLL REVEAL

const revealElements = document.querySelectorAll(
    ".section, .project, .skill, .experience-item, .edu-card, .learning, .building-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(25px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 650,
                    easing: "cubic-bezier(.2,.7,.2,1)",
                    fill: "forwards"
                }
            );

            revealObserver.unobserve(entry.target);

        });

    },
    {
        threshold: 0.08
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// PROJECT CASE STUDY MODAL

const modal = document.querySelector("#projectModal");
const modalClose = document.querySelector("#modalClose");
const modalOverlay = document.querySelector(".modal-overlay");

const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalDetails = document.querySelector("#modalDetails");


const projectData = {

    learntrack: {

        category: "01 / THESIS",

        title: "LearnTrack",

        description:
            "A web-based learning management system concept designed to support students and educators through learning analytics and decision-support features.",

        details: [
            {
                title: "Project Type",
                text: "Academic Thesis"
            },
            {
                title: "Focus",
                text: "Learning Management System and Predictive Learning Analytics"
            },
            {
                title: "My Role",
                text: "System development, documentation, testing, and project collaboration"
            }
        ]

    },


    vym: {

        category: "02 / SCHOOL PROJECT",

        title: "VYM Mobility",

        description:
            "A car rental system concept focused on vehicle management, rental operations, GPS tracking, and lock-box integration.",

        details: [
            {
                title: "Project Type",
                text: "Academic System Project"
            },
            {
                title: "Focus",
                text: "Vehicle rental management and tracking"
            },
            {
                title: "Project Scope",
                text: "10 rental vehicles with GPS and lock-box integration"
            }
        ]

    }

};


function openModal(projectName) {

    const project = projectData[projectName];

    if (!project) {
        return;
    }

    modalCategory.textContent = project.category;

    modalTitle.textContent = project.title;

    modalDescription.textContent =
        project.description;

    modalDetails.innerHTML = "";

    project.details.forEach((detail) => {

        const item =
            document.createElement("div");

        item.className = "modal-detail";

        item.innerHTML = `
            <strong>${detail.title}</strong>
            <span>${detail.text}</span>
        `;

        modalDetails.appendChild(item);

    });

    modal.classList.add("open");

    modal.setAttribute("aria-hidden", "false");

    body.classList.add("modal-open");

}


document.querySelectorAll(".case-study").forEach((button) => {

    button.addEventListener("click", () => {

        openModal(button.dataset.project);

    });

});


function closeModal() {

    modal.classList.remove("open");

    modal.setAttribute("aria-hidden", "true");

    body.classList.remove("modal-open");

}


modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", closeModal);


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});


// COPY EMAIL

const copyEmail = document.querySelector("#copyEmail");
const toast = document.querySelector("#toast");

copyEmail.addEventListener("click", async () => {

    const email = "mcedric.tabirao@gmail.com";

    try {

        await navigator.clipboard.writeText(email);

        toast.textContent = "Email copied!";
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);

    } catch (error) {

        window.location.href =
            `mailto:${email}`;

    }

});