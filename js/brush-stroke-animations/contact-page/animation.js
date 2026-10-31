const contactSection = document.querySelector(".contact");
const contactPathReveal = contactSection.querySelectorAll(".contact-brush-path-reveal");
const contactArrowReveal = contactSection.querySelectorAll(".contact-brush-arrow-reveal");

let contactPathAnim = [];
let contactArrowAnim = [];
let contactPathHasAnimated = false;
let contactArrowHasAnimated = false;

const contactPathStart = () => {
    if(!contactPathHasAnimated){
        contactPathHasAnimated = true; 

        contactPathAnim = [...contactPathReveal].map((contactPathReveal) => {
                return contactPathReveal.animate(
                [
                    {strokeDashoffset: 1},
                    {strokeDashoffset: 0}
                ],
                {
                    duration: 3500,
                    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                    fill: "forwards"
                }
            );
        });
    }
};

const contactArrowStart = () => {
    if(!contactArrowHasAnimated){
        contactArrowHasAnimated = true;

        contactArrowAnim = [...contactArrowReveal].map((contactArrowReveal) => {
            return contactArrowReveal.animate(
                [
                    {strokeDashoffset: 1},
                    {strokeDashoffset: 0}
                ],
                {
                    duration: 3500,
                    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                    fill: "forwards"
                }
            );
        });
    }
};

const contactObserver = new IntersectionObserver(
    (contactEntries) => {
        contactEntries.forEach((contactEntry) => {
            if(contactEntry.isIntersecting && !contactPathHasAnimated && !contactArrowHasAnimated){
                contactPathStart();
                contactArrowStart();
                contactObserver.unobserve(contactEntry.target);
            }
        });
    },
    {
        threshold: 0
    }
);

contactObserver.observe(contactSection)