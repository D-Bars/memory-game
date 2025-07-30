import { create } from "zustand";
import { Card } from "../types/Card";

interface gameState {
    isGameStart: boolean;
    savedGameProgress: Card[];
    cards: Card[];
    cardCount: number;
    attempts: number;
    timeInSecondsStr: string;
    timeInSecondsNum: number;
    isTimerStopped: boolean;

    setTimeInSecondsStr: (value: string) => void;
    setTimeInSecondsNum: (value: number) => void;
    setCards: (cards: Card[]) => void;
    setCardCount: (count: number) => void;
    startGame: () => void,
    incrementAttempts: () => void;
    resetGame: (navigate: Function) => void;
    pauseTimer: () => void;
}

export const useGameStore = create<gameState>((set) => ({
    isGameStart: false,
    savedGameProgress: [],
    cards: [],
    cardCount: 0,
    attempts: 0,
    timeInSecondsStr: '00:00:00',
    timeInSecondsNum: 0,
    isTimerStopped: false,

    setTimeInSecondsStr: (value) => set({ timeInSecondsStr: value }),
    setTimeInSecondsNum: (value) => set({ timeInSecondsNum: value }),
    setCards: (cards) => set({ cards }),
    setCardCount: (count) => set({cardCount: count}),
    startGame: () => set({isGameStart: true}),
    incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
    resetGame: (navigate) => {
        set({ isGameStart: false, attempts: 0, cardCount: 0, timeInSecondsNum: 0, timeInSecondsStr: '00:00:00', isTimerStopped:false });
        navigate("/");
    },
    pauseTimer: () => set({isTimerStopped : true}),
}));