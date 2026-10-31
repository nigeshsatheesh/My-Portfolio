const reveal = document.querySelectorAll(".brush-reveal");
let anim = [];

const start = () => {
    anim = [...reveal].map((reveal) => {
        reveal.animate(
            [
                {strokeDashoffset: 1},
                {strokeDashoffset: 0}
            ],
            {
                duration: 3000,
                easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                fill: "forwards"
            }
        )
    });
};

start();