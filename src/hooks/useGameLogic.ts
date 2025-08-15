import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { GenerateCardsArray } from "../utils/cardsArray/GenerateCardsArray";
import { flipAndMatchCards } from "../utils/checkCardByClick/flipAndMatchCards";
import { resetCards } from "../utils/checkCardByClick/resetCards";
import { useGameStore } from "../store/gameStore";
import useSound from 'use-sound';
import effectSoundMatched from '/sounds/effect/matched.mp3';
import clickSoundFlip from '/sounds/click/flip__card.mp3';


export function useGameLogic() {
    const {
        initialCardsArray,
        cardCount,
        setActuallGameCards,
        incrementAttempts,
        GameProgress,
        firstOpenedCard,
        setFirstOpenedCard,
        addMismatchedCards,
        clearMismatchedCards
    } = useGameStore();
    const [cardWaiting, setCardWaiting] = useState<boolean>(false);

    const [soundFlip] = useSound(clickSoundFlip, {
        volume: 0.6,
        playbackRate: 1.25,
        interrupt: true,
    });

    const [soundMatched] = useSound(effectSoundMatched, {
        volume: 0.5,
        playbackRate: 1.25,
        interrupt: true,
    });

    useEffect(() => {
        if (GameProgress.length) {
            setActuallGameCards(GameProgress);
        } else {
            const cardsArr = GenerateCardsArray(initialCardsArray, cardCount);
            setActuallGameCards(cardsArr);
        }
    }, [cardCount, initialCardsArray, setActuallGameCards]);

    const handleMatch = (cardsArrayAfterFlip: Card[], openedCard: Card, clickedCard: Card) => {
        const matchedCards = flipAndMatchCards(cardsArrayAfterFlip, openedCard, clickedCard);
        soundMatched();
        setFirstOpenedCard(null);
        setActuallGameCards(matchedCards);
    }

    const handleMismatch = (cardsArrayAfterFlip: Card[], openedCard: Card, clickedCard: Card) => {
        setCardWaiting(true);
        // addMismatchedCards(openedCard, clickedCard);
        setTimeout(() => {
            const reset = resetCards(cardsArrayAfterFlip, openedCard, clickedCard);
            setFirstOpenedCard(null);
            setActuallGameCards(reset);
            clearMismatchedCards();
            setCardWaiting(false);
        }, 800);
    }

    const flipCard = (clickedCard: Card): Card[] => {
        soundFlip();
        const flip = GameProgress.map(cardItem =>
            cardItem.uniqueId === clickedCard.uniqueId ? { ...cardItem, isFlipped: true } : cardItem
        );
        setActuallGameCards(flip);
        if (firstOpenedCard === null) {
            setFirstOpenedCard(clickedCard);
        }
        return flip;
    }

    const handleCardClick = (clickedCard: Card) => {
        if (clickedCard.isFlipped || clickedCard.isMatched || cardWaiting) return;
        const cardsArrayAfterFlip = flipCard(clickedCard);

        if (firstOpenedCard) {
            incrementAttempts();
            if (firstOpenedCard.id === clickedCard.id) {
                handleMatch(cardsArrayAfterFlip, firstOpenedCard, clickedCard);
            } else {
                addMismatchedCards(firstOpenedCard, clickedCard);
                handleMismatch(cardsArrayAfterFlip, firstOpenedCard, clickedCard);
            }
        }
        useGameStore.getState().saveGameToLocalStorage();
    };

    return { GameProgress, handleCardClick, handleMismatch };
}
