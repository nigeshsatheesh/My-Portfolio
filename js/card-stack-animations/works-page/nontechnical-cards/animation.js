const nonTechnicalWorksCards = document.querySelectorAll(".nontechnical-works-card");
const nonTechnicalWorksCardsOrder = [...nonTechnicalWorksCards];

nonTechnicalWorksCards.forEach((nonTechnicalWorksCard) => {
    nonTechnicalWorksCard.addEventListener("click", () => {
        if(nonTechnicalWorksCard === nonTechnicalWorksCardsOrder[0]){
            nonTechnicalWorksCardsOrder.push(nonTechnicalWorksCardsOrder.shift());
            nonTechnicalWorksCardsStyling();
        }
    });
});

let noOfNonTechnicalWorksCards = nonTechnicalWorksCards.length;

const nonTechnicalWorksCardsStyling = () => {
    nonTechnicalWorksCardsOrder.forEach((nonTechnicalWorksCard, index) => {
        nonTechnicalWorksCard.style.transform = `translate(${-110*index}px, ${20*index}px)`;
        nonTechnicalWorksCard.style.opacity = 1 - (index / noOfNonTechnicalWorksCards);
        nonTechnicalWorksCard.style.zIndex = noOfNonTechnicalWorksCards - index;
        nonTechnicalWorksCard.classList.toggle("top", index === 0);
    });
}

nonTechnicalWorksCardsStyling();