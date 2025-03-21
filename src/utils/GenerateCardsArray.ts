import { Card } from "../types/Card";

export const GenerateCardsArray = (): Card[] => {
    const imagesArray = [
        'card1.png',
        'card2.png',
        'card3.png',
        'card4.png',
        'card5.png',
        'card6.png',
        'card7.png',
        'card8.png',
        'card9.png',
        'card10.png',
        'card11.png',
        'card12.png',
    ]
    return imagesArray.map((imageName, index) => ({
        id: index + 1,
        image: `/images/cards/${imageName}`,
        uniqueId: `card-${index + 1}`,
        isFlipped: false,
        isMatched: false,
    }));
};