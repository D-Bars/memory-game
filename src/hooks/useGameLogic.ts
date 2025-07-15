import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { GenerateCardsArray } from "../utils/cardsArray/GenerateCardsArray";
import { isPair } from "../utils/checkCardByClick/isPair";
import { resetCards } from "../utils/checkCardByClick/resetCards";
import { checkGameOver } from "../utils/gameEndings/checkGameOver";
import { gameOver } from "../utils/gameEndings/gameOver";

export function useGameLogic(cards: Card[], cardCount: number) {
    const [finalCardsArray, setFinalCardsArray] = useState<Card[]>([]);
    const [firstOpenedCard, setFirstOpenedCard] = useState<Card | null>(null);
    const [cardWaiting, setCardWaiting] = useState<boolean>(false);

    useEffect(() => {
        const cardsArr = GenerateCardsArray(cards, cardCount);
        setFinalCardsArray(cardsArr);
    }, [cardCount, cards]);

    const handleCardClick = (clickedCard: Card) => {
        if (cardWaiting) return;

        const updatedCards = finalCardsArray.map(cardItem =>
            cardItem.uniqueId === clickedCard.uniqueId ? { ...cardItem, isFlipped: true } : cardItem
        );
        setFinalCardsArray(updatedCards);

        if (firstOpenedCard === null) {
            setFirstOpenedCard(clickedCard);
            return;
        }

        setCardWaiting(true);
        setTimeout(() => {
            if (firstOpenedCard.id === clickedCard.id) {
                const matchedCards = isPair(finalCardsArray, firstOpenedCard, clickedCard);
                setFinalCardsArray(matchedCards);

                if (checkGameOver(matchedCards)) {
                    gameOver();
                }
            } else {
                const reset = resetCards(finalCardsArray, firstOpenedCard, clickedCard);
                setFinalCardsArray(reset);
            }

            setCardWaiting(false);
            setFirstOpenedCard(null);
        }, 1000);
    };

    return { finalCardsArray, handleCardClick, cardWaiting };
}
