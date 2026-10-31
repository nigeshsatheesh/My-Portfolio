const journeySetion = document.querySelector(".journey");
const journeyReveal = journeySetion.querySelectorAll(".journey-brush-reveal");

let journeyAnim = [];
let journeyHasAnimated = false;

const journeyStart = () => {
    if(!journeyHasAnimated){
        journeyHasAnimated = true;

        journeyAnim = [...journeyReveal].map((journeyReveal) => {
            return journeyReveal.animate(
                [
                    {strokeDashoffset: 1},
                    {strokeDashoffset: 0}
                ],
                {
                    duration: 6000,
                    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                    fill: "forwards"
                }
            );
        });
    }
};

const journeyObserver = new IntersectionObserver(
    (journeyEntries) => {
        journeyEntries.forEach((journeyEntry) => {
            if(journeyEntry.isIntersecting && !journeyHasAnimated){
                journeyStart();
                journeyObserver.unobserve(journeyEntry.target);
            }
        })
    },
    {
        threshold: 0.2
    }
);

journeyObserver.observe(journeySetion);