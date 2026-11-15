const descriptionClampQuery = window.matchMedia("(max-width: 700px)");

document
    .querySelectorAll(".technical-card-content .description, .nontechnical-card-content .description")
    .forEach((description) => {
        description.addEventListener("click", (event) => {
            if (!descriptionClampQuery.matches) return;

            const isExpanded = description.classList.contains("expanded");
            const isTruncated = description.scrollHeight > description.clientHeight;

            if (!isExpanded && !isTruncated) return;

            event.stopPropagation();
            description.classList.toggle("expanded");
        });
    });

document
    .querySelectorAll(".technical-works-card, .nontechnical-works-card")
    .forEach((card) => {
        card.addEventListener("click", () => {
            if (!descriptionClampQuery.matches) return;

            card
                .querySelectorAll(".description.expanded")
                .forEach((description) => description.classList.remove("expanded"));
        });
    });