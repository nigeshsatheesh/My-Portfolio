
document.addEventListener("DOMContentLoaded", () => {
    const sections = ["about", "skills", "works", "journey", "contact"]
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if (!sections.length) return;

    const basePath = "/portfolio/";

    let scrollFrame = null;
    let isProgrammaticScroll = false;
    let scrollTimeout = null;

    function getSectionFromURL() {
        const path = window.location.pathname.replace(/\/+$/, "");
        const match = path.match(/^\/portfolio\/(about|skills|works|journey|contact)$/i);

        return match ? match[1].toLowerCase() : null;
    }

    function updateURL(sectionId, method = "replaceState") {
        const newURL = `${basePath}${sectionId}`;

        if (window.location.pathname !== newURL) {
            history[method]({ section: sectionId }, "", newURL);
        }
    }

    function goToSection(sectionId, updateHistory = true) {
        const target = document.getElementById(sectionId);

        if (!target) return;

        isProgrammaticScroll = true;

        if (updateHistory) {
            updateURL(sectionId, "pushState");
        }

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            isProgrammaticScroll = false;
            updateActiveSection();
        }, 1000);
    }

    function updateActiveSection() {
        if (isProgrammaticScroll) return;

        const referencePoint = window.innerHeight * 0.4;

        let activeSection = sections[0];

        for (const section of sections) {
            const rect = section.getBoundingClientRect();

            if (rect.top <= referencePoint) {
                activeSection = section;
            } else {
                break;
            }
        }

        updateURL(activeSection.id);
    }

    document.addEventListener("click", event => {
        const link = event.target.closest("a");

        if (!link) return;

        const url = new URL(link.href, window.location.origin);

        if (url.origin !== window.location.origin) return;

        const match = url.pathname.match(
            /^\/portfolio\/(about|skills|works|journey|contact)\/?$/i
        );

        if (!match) return;

        event.preventDefault();

        goToSection(match[1].toLowerCase());
    });

    window.addEventListener("scroll", () => {
        if (scrollFrame !== null) return;

        scrollFrame = requestAnimationFrame(() => {
            updateActiveSection();
            scrollFrame = null;
        });
    }, { passive: true });

    window.addEventListener("popstate", () => {
        const sectionId = getSectionFromURL();

        if (sectionId) {
            goToSection(sectionId, false);
        }
    });

    const initialSection = getSectionFromURL();

    if (initialSection) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                goToSection(initialSection, false);
            }, 150);
        });
    } else {
        updateURL("about");
    }
});
