const aboutSection = document.querySelector(".about");
const aboutReveal = aboutSection.querySelector(".about-brush-reveal");

let aboutHasAnimated = false;

const aboutStart = () =>{
    if(!aboutHasAnimated){
        aboutHasAnimated = true;

        aboutReveal.animate(
            [
                { strokeDashoffset: 1 },
                { strokeDashoffset: 0 }
            ],
            {
                duration: 3000,
                easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                fill: "forwards"
            }
        );
    }
};

const aboutObserver = new IntersectionObserver(
    (aboutEntries) => {
        aboutEntries.forEach((aboutEntry) => {
            if(aboutEntry.isIntersecting && !aboutHasAnimated){
                aboutStart();
                aboutObserver.unobserve(aboutEntry.target);
            }
        });
    },
    {
        threshold: 0.8
    }
);

aboutObserver.observe(aboutSection);