import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { getShuffledArray } from "../utils/getShuffledArray";
import { getSlicedArray } from "../utils/getSliсedArray";
import { getDuplicatedArray } from "../utils/getDuplicatedArray";
import { Card } from "../types/Card";
import CardItem from './CardItem';
import cl from './styles/CardsList.module.scss';
import { useUserStatsStore } from "../store/userStatsStore";
import { useNavigate } from "react-router-dom";

const CardsList = () => {
    const { cardCount, cards, attempts, timeInSecondsStr, resetGame } = useGameStore();
    const { resetStats, saveStats, setAttempts, setFinalTime } = useUserStatsStore();
    const [finalCardsArray, setFinalCardsArray] = useState<Card[]>([]);
    const [checkOpenedCard, setCheckOpenedCard] = useState<Card | null>(null);
    const [cardWaiting, setCardWaiting] = useState<boolean>(false);
    const navigate = useNavigate();

    const gameOver = () => {
        setFinalTime(timeInSecondsStr);
        setAttempts(attempts);
        saveStats();
        resetGame(navigate); 
        resetStats(); 
    }

    const checkGameOver = (cards: Card[]) => {
        return cards.every(card => card.isMatched);
    }

    useEffect(() => {
        const prepareCardsArray = () => {
            const shuffledArray = getShuffledArray({ cards });
            const slicedArray = getSlicedArray({ cards: shuffledArray, count: cardCount });
            const duplicatedArray = getDuplicatedArray({ cards: slicedArray });
            const duplicatedAndShuffledArray = getShuffledArray({ cards: duplicatedArray });
            return duplicatedAndShuffledArray;
        }

        const cardsArr = prepareCardsArray();
        setFinalCardsArray(cardsArr);
    }, [cardCount, cards]);

    const handleCardClick = (card: Card) => {
        const updatedCards = finalCardsArray.map(cardItem =>
            cardItem.uniqueId === card.uniqueId ? { ...cardItem, isFlipped: true } : cardItem
        );
        setFinalCardsArray(updatedCards);

        if (checkOpenedCard === null) {
            setCheckOpenedCard(card);
        } else {
            setCardWaiting(true);
            if (checkOpenedCard.id === card.id) {
                const matchedCard = finalCardsArray.map(cardItem =>
                    cardItem.id === checkOpenedCard.id || cardItem.id === card.id
                        ? { ...cardItem, isFlipped: true, isMatched: true }
                        : cardItem
                );
                setFinalCardsArray(matchedCard);
                setCardWaiting(false);
                setTimeout(() => {
                    if (checkGameOver(matchedCard)) {
                        gameOver();
                    }
                }, 1000);
            } else {
                setTimeout(() => {
                    const resetCards = finalCardsArray.map(cardItem =>
                        cardItem.uniqueId === checkOpenedCard.uniqueId || cardItem.uniqueId === card.uniqueId
                            ? { ...cardItem, isFlipped: false }
                            : cardItem
                    );
                    setFinalCardsArray(resetCards);
                    setCardWaiting(false);
                }, 1000);
            }
            setCheckOpenedCard(null);
        }
    }

    return (
        <div className={cl.cards_box}>
            {
                finalCardsArray.map((card) => (
                    <CardItem
                        key={card.uniqueId}
                        card={card}
                        checkCard={handleCardClick}
                        isWaiting={cardWaiting}
                    />
                ))
            }
        </div>
    );
};
export default CardsList;