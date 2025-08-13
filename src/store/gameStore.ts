import { create } from "zustand";
import { Card } from "../types/Card";
import { NavigateFunction } from "react-router-dom";
import { gameEndController } from "../utils/gameEndings/gameEndController";

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

    setTimeInSecondsStr: (value: string) => void;
    setTimeInSecondsNum: (value: number) => void;
    setInitialCardsArray: (cards: Card[]) => void;
    setActuallGameCards: (cards: Card[]) => void;
    setFirstOpenedCard: (card: Card | null) => void;
    setCardCount: (count: number) => void;
    startGame: () => void,
    incrementAttempts: () => void;
    resetGame: (navigate: NavigateFunction) => void;
    pauseTimer: () => void;
}

export const useGameStore = create<gameState>((set) => ({
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

    setTimeInSecondsStr: (value) => set({ timeInSecondsStr: value }),
    setTimeInSecondsNum: (value) => set({ timeInSecondsNum: value }),
    setInitialCardsArray: (initialCardsArray) => set({ initialCardsArray }),
    setActuallGameCards: (cards) => {
        set({ GameProgress: cards });
        if(cards.every(card => card.isMatched)){
            set({ isWin: true, isGameEnd: true });
            gameEndController();
        }
    },
    setFirstOpenedCard: (card) => set({firstOpenedCard: card}),
    setCardCount: (count) => set({ cardCount: count }),
    startGame: () => set({ isGameStart: true }),
    incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
    resetGame: (navigate) => {
        set({ isGameStart: false, GameProgress: [], attempts: 0, cardCount: 0, timeInSecondsNum: 0, timeInSecondsStr: '00:00:00', isTimerStopped: false });
        navigate("/");
    },
    pauseTimer: () => set({ isTimerStopped: true }),
}));