import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { useGameStore } from "../store/gameStore";
import { useUserStatsStore } from "../store/userStatsStore";
import { useNavigate } from "react-router-dom";
import { GenerateCardsArray } from "../utils/cardsArray/GenerateCardsArray";
import { isPair } from "../utils/checkCardByClick/isPair";
import { resetCards } from "../utils/checkCardByClick/resetCards";

export function useGameLogic(cards: Card[], cardCount: number) {
  const { attempts, timeInSecondsStr, resetGame } = useGameStore();
  const { resetStats, saveStats, setAttempts, setFinalTime } = useUserStatsStore();
  const [finalCardsArray, setFinalCardsArray] = useState<Card[]>([]);
  const [firstOpenedCard, setFirstOpenedCard] = useState<Card | null>(null);
  const [cardWaiting, setCardWaiting] = useState<boolean>(false);
  const navigate = useNavigate();

  const gameOver = () => {
    setFinalTime(timeInSecondsStr);
    setAttempts(attempts);
    saveStats();
    resetGame(navigate);
    resetStats();
  };

  const checkGameOver = (cards: Card[]) => cards.every(card => card.isMatched);

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

    if (firstOpenedCard.id === clickedCard.id) {
      const matchedCards = isPair(finalCardsArray, firstOpenedCard, clickedCard);
      setFinalCardsArray(matchedCards);
      setCardWaiting(false);
      setFirstOpenedCard(null);

      setTimeout(() => {
        if (checkGameOver(matchedCards)) {
          gameOver();
        }
      }, 1000);
    } else {
      setTimeout(() => {
        const reset = resetCards(finalCardsArray, firstOpenedCard, clickedCard);
        setFinalCardsArray(reset);
        setCardWaiting(false);
        setFirstOpenedCard(null);
      }, 1000);
    }
  };

  return { finalCardsArray, handleCardClick, cardWaiting };
}
