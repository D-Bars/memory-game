import { Card } from "../types/Card";

export const GenerateCardsArray = (): Card[] => {
    const imagesArray = [
        'card1.jpg',
        'card2.jpg',
        'card3.jpg',
        'card4.jpg',
        'card5.jpg',
        'card6.jpg',
        'card7.jpg',
        'card8.jpg',
        'card9.jpg',
        'card10.png',
        'card11.jpg',
        'card12.jpg',
    ]
    return imagesArray.map((imageName, index) => ({
        id: index + 1,
        image: `/images/cards/${imageName}`,
        uniqueId: `card-${index + 1}`,
        isFlipped: false,
        isMatched: false,
    }));
};