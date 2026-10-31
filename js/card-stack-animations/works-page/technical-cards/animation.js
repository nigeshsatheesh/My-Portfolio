const technicalWorksCards = document.querySelectorAll(".technical-works-card");
const technicalWorksCardsOrder = [...technicalWorksCards];

technicalWorksCards.forEach((technicalWorksCard) => {
    technicalWorksCard.addEventListener("click", () => {
        if(technicalWorksCard === technicalWorksCardsOrder[0]){
            technicalWorksCardsOrder.push(technicalWorksCardsOrder.shift());
            technincalWorksCardsStyling();
        }
    })
});

let noOfTechnicalWorksCards = technicalWorksCards.length;

const technincalWorksCardsStyling = () => {
    technicalWorksCardsOrder.forEach((technicalWorksCard, index) => {
        technicalWorksCard.style.transform = `translate(${-110*index}px, ${10*index}px)`;
        technicalWorksCard.style.opacity = 1 - (index / noOfTechnicalWorksCards);
        technicalWorksCard.style.zIndex = noOfTechnicalWorksCards - index;
        technicalWorksCard.classList.toggle("top", index === 0);
    });
};

technincalWorksCardsStyling();