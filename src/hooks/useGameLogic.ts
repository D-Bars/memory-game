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
        setFirstOpenedCard
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
        setActuallGameCards(matchedCards);
        setFirstOpenedCard(null);
    }

    const handleMismatch = (cardsArrayAfterFlip: Card[], openedCard: Card, clickedCard: Card) => {
        setCardWaiting(true);
        setTimeout(() => {
            const reset = resetCards(cardsArrayAfterFlip, openedCard, clickedCard);
            setActuallGameCards(reset);
            setCardWaiting(false);
            setFirstOpenedCard(null);
        }, 1000);
    }

    const flipCard = (clickedCard: Card): Card[] => {
        const flip = GameProgress.map(cardItem =>
            cardItem.uniqueId === clickedCard.uniqueId ? { ...cardItem, isFlipped: true } : cardItem
        );
        soundFlip();
        setActuallGameCards(flip);
        return flip;
    }

    const handleCardClick = (clickedCard: Card) => {
        if (clickedCard.isFlipped || clickedCard.isMatched || cardWaiting) return;
        const cardsArrayAfterFlip = flipCard(clickedCard);
        incrementAttempts();

        if (firstOpenedCard === null) {
            setFirstOpenedCard(clickedCard);
            return;
        }

        if (firstOpenedCard.id === clickedCard.id) {
            handleMatch(cardsArrayAfterFlip, firstOpenedCard, clickedCard);

        } else {
            handleMismatch(cardsArrayAfterFlip, firstOpenedCard, clickedCard);
        }
    };

    return { GameProgress, handleCardClick };
}
