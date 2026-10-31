const skillsSection = document.querySelector(".skills");
const skillsReveal = skillsSection.querySelectorAll(".skills-brush-reveal");

let skillsAnim = [];
let skillsHasAnimated = false;

const skillsStart = () => {
    if(!skillsHasAnimated){
        skillsHasAnimated = true;
    
        skillsAnim = [...skillsReveal].map((skillsReveal) => {
    
            return skillsReveal.animate(
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
    }
};

const skillsObserver = new IntersectionObserver(
    (skillsEntries) => {
        skillsEntries.forEach((skillsEntry) => {
            if(skillsEntry.isIntersecting && !skillsHasAnimated){
                skillsStart();
                skillsObserver.unobserve(skillsEntry.target);
            }
        })
    },
    {
        threshold: 0.3
    }
);

skillsObserver.observe(skillsSection);