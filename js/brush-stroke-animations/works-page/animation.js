const worksSection = document.querySelector(".works");
const worksReveal = worksSection.querySelectorAll(".works-brush-reveal");

let worksAnim = [];
let worksHasAnimated = false;

const worksStart = () => {
    if(!worksHasAnimated){
        worksHasAnimated = true;

        worksAnim = [...worksReveal].map((worksReveal) => {
            return worksReveal.animate(
                [
                    {strokeDashoffset: 1},
                    {strokeDashoffset: 0}
                ],
                {
                    duration: 3000,
                    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                    fill: "forwards"
                }
            );
        });
    }
};

const worksObserver = new IntersectionObserver(
    (worksEntries) => {
        worksEntries.forEach((worksEntry) => {
            if(worksEntry.isIntersecting && !worksHasAnimated){
                worksStart();
                worksObserver.unobserve(worksEntry.target);
            }
        });
    },
    {
        threshold: 0.2
    }
);

worksObserver.observe(worksSection);