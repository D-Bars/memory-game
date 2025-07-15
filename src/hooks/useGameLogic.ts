import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { GenerateCardsArray } from "../utils/cardsArray/GenerateCardsArray";
import { isPair } from "../utils/checkCardByClick/isPair";
import { resetCards } from "../utils/checkCardByClick/resetCards";
import { checkGameOver } from "../utils/gameEndings/checkGameOver";
import { useGameOver } from "./useGameOver";


export function useGameLogic(cards: Card[], cardCount: number) {
    const [finalCardsArray, setFinalCardsArray] = useState<Card[]>([]);
    const [firstOpenedCard, setFirstOpenedCard] = useState<Card | null>(null);
    const [cardWaiting, setCardWaiting] = useState<boolean>(false);
    const gameOver = useGameOver();

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

        if (firstOpenedCard.id === clickedCard.id) {
            const matchedCards = isPair(updatedCards, firstOpenedCard, clickedCard);
            setFinalCardsArray(matchedCards);
            setFirstOpenedCard(null);
            if (checkGameOver(matchedCards)) {
                gameOver();
            }
        } else {
            setCardWaiting(true);
            setTimeout(() => {
                const reset = resetCards(updatedCards, firstOpenedCard, clickedCard);
                setFinalCardsArray(reset);
                setCardWaiting(false);
                setFirstOpenedCard(null);
            }, 1000);
        }
    };

    return { finalCardsArray, handleCardClick, cardWaiting };
}
