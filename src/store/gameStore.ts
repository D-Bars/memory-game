import { create } from "zustand";
import { Card } from "../types/Card";
import { NavigateFunction } from "react-router-dom";
import { gameEndController } from "../utils/gameEndings/gameEndController";
import { saveDataByKey } from "../utils/localStorage/saveDataByKey";
import { getDataByKey } from "../utils/localStorage/getDataByKey";
import { removeDataByKey } from "../utils/localStorage/removeDataByKey";
import { useUserStatsStore } from "./userStatsStore";

interface gameState {
    isGameStart: boolean;
    GameProgress: Card[];
    initialCardsArray: Card[];
    isWin: boolean,
    isGameEnd: boolean,
    firstOpenedCard: Card | null,
    cardCount: number;
    attempts: number;
    timeInSecondsStr: string;
    timeInSecondsNum: number;
    isTimerStopped: boolean;
    mismatchedCards: Card[] | [];

    setTimeInSecondsStr: (value: string) => void;
    setTimeInSecondsNum: (value: number) => void;
    setInitialCardsArray: (cards: Card[]) => void;
    setActuallGameCards: (cards: Card[]) => void;
    setFirstOpenedCard: (card: Card | null) => void;
    addMismatchedCards: (firstCard: Card, secondCard: Card) => void;
    clearMismatchedCards: () => void;
    setCardCount: (count: number) => void;
    startGame: () => void,
    incrementAttempts: () => void;
    resetGame: (navigate: NavigateFunction) => void;
    pauseTimer: () => void;
    saveGameToLocalStorage: () => void;
    loadGameFromLocalStorage: () => void;
    removeGameByLocalStorage: () => void;
}

export const useGameStore = create<gameState>((set, get) => ({
    isGameStart: false,
    GameProgress: [],
    initialCardsArray: [],
    isWin: false,
    isGameEnd: false,
    firstOpenedCard: null,
    cardCount: 0,
    attempts: 0,
    timeInSecondsStr: '00:00:00',
    timeInSecondsNum: 0,
    isTimerStopped: false,
    mismatchedCards: [],

    setTimeInSecondsStr: (value) => set({ timeInSecondsStr: value }),
    setTimeInSecondsNum: (value) => set({ timeInSecondsNum: value }),
    setInitialCardsArray: (initialCardsArray) => set({ initialCardsArray }),
    setActuallGameCards: (cards) => {
        set({ GameProgress: cards });
        if (cards.every(card => card.isMatched)) {
            set({ isWin: true, isGameEnd: true });
            gameEndController();
        }
    },
    setFirstOpenedCard: (card) => set({ firstOpenedCard: card }),
    addMismatchedCards: (firstCard, secondCard) => {
        set((state) => ({ mismatchedCards: [...state.mismatchedCards, firstCard, secondCard] }));
        get().saveGameToLocalStorage();
    },
    clearMismatchedCards: () => {
        set({ mismatchedCards: [] });
        get().saveGameToLocalStorage();
    },
    setCardCount: (count) => set({ cardCount: count }),
    startGame: () => set({ isGameStart: true }),
    incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
    resetGame: (navigate) => {
        set({
            isGameStart: false,
            GameProgress: [],
            attempts: 0,
            cardCount: 0,
            timeInSecondsNum: 0,
            timeInSecondsStr: '00:00:00',
            isTimerStopped: false,
            firstOpenedCard: null
        });
        navigate("/");
    },
    pauseTimer: () => set({ isTimerStopped: true }),
    saveGameToLocalStorage: () => {
        const { GameProgress, mismatchedCards, timeInSecondsNum, firstOpenedCard, attempts, timeInSecondsStr, cardCount } = get();
        const { currentStat } = useUserStatsStore.getState();
        const savedGame = {
            GameProgress,
            mismatchedCards,
            timeInSecondsNum,
            timeInSecondsStr,
            firstOpenedCard,
            attempts,
            cardCount,
            user: {
                nickname: currentStat.nickname,
                difficultLevel: currentStat.difficultLevel,
            },
        };
        saveDataByKey('game', savedGame);
    },
    loadGameFromLocalStorage: () => {
        const savedGame = getDataByKey('game');
        set({
            isGameStart: true,
            mismatchedCards: savedGame.mismatchedCards,
            GameProgress: savedGame.GameProgress,
            timeInSecondsNum: savedGame.timeInSecondsNum,
            timeInSecondsStr: savedGame.timeInSecondsStr,
            firstOpenedCard: savedGame.firstOpenedCard,
            attempts: savedGame.attempts,
            cardCount: savedGame.cardCount,
        })
        const { setNickname, setDifficultLevel } = useUserStatsStore.getState();
        setNickname(savedGame.user.nickname);
        setDifficultLevel(savedGame.user.difficultLevel);
    },
    removeGameByLocalStorage: () => {
        removeDataByKey('game');
    }
}));