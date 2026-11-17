const workLinks = document.querySelectorAll(".technical-links a, .nontechnical-links a");

workLinks.forEach((workLink) => {
    workLink.addEventListener("click", (event) => {
        if (window.matchMedia("(max-width: 1100px)").matches) {
            event.stopPropagation();
        }
    });
});