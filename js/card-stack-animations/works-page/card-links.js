let downX = 0, downY = 0, dragged = false;

window.addEventListener("pointerdown", (e) => {
    downX = e.clientX;
    downY = e.clientY;
    dragged = false;
}, true);

window.addEventListener("pointermove", (e) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 5) dragged = true;
}, true);

function guard(e) {
    if (!e.target.closest(".technical-works-card, .nontechnical-works-card")) return;
    const hasSelection = window.getSelection()?.toString().length > 0;
    if (hasSelection || dragged) {
        e.stopImmediatePropagation();
        e.stopPropagation();
    }
}

window.addEventListener("click", guard, true);
window.addEventListener("mouseup", guard, true);


const workLinks = document.querySelectorAll(".technical-links a, .nontechnical-links a");

workLinks.forEach((workLink) => {
    workLink.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});