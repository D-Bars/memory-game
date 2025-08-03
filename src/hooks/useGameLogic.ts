import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { GenerateCardsArray } from "../utils/cardsArray/GenerateCardsArray";
import { isPair } from "../utils/checkCardByClick/isPair";
import { resetCards } from "../utils/checkCardByClick/resetCards";
import { checkGameOver } from "../utils/gameEndings/checkGameOver";
import { useGameStore } from "../store/gameStore";
import { useModalWindowStore } from "../store/EndGameModalStore";
import useSound from 'use-sound';
import effectSoundMatched from '/sounds/effect/matched.mp3';
import { useMusicPlayerStore } from "../store/musicStore";
import { useUserStatsStore } from "../store/userStatsStore";


export function useGameLogic(cards: Card[], cardCount: number) {
    const [finalCardsArray, setFinalCardsArray] = useState<Card[]>([]);
    const [firstOpenedCard, setFirstOpenedCard] = useState<Card | null>(null);
    const [cardWaiting, setCardWaiting] = useState<boolean>(false);
    const { pauseTimer, attempts, timeInSecondsStr } = useGameStore();
    const { saveStats, setAttempts, setFinalTime } = useUserStatsStore();
    const { setWin } = useModalWindowStore();
    const { setPageNameTrack, setCurrentTrackEl } = useMusicPlayerStore();

    const [soundMatched] = useSound(effectSoundMatched, {
        volume: 0.5,
        playbackRate: 1.25,
        interrupt: true,
    });

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
            soundMatched();
            setFinalCardsArray(matchedCards);
            setFirstOpenedCard(null);
            if (checkGameOver(matchedCards)) {
                pauseTimer();
                setWin();
                setFinalTime(timeInSecondsStr);
                setAttempts(attempts);
                saveStats();
                setPageNameTrack('win');
                setCurrentTrackEl();
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
