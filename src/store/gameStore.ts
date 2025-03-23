import { create } from "zustand";
import { Card } from "../types/Card";

interface gameState {
    isGameStart: boolean;
    cards: Card[];
    cardCount: number;
    attempts: number;
    timeInSecondsStr: string;
    timeInSecondsNum: number;
    isTimerRunning: boolean;

    setTimeInSecondsStr: (value: string) => void;
    setTimeInSecondsNum: (value: number) => void;
    setCards: (cards: Card[]) => void;
    setCardCount: (count: number) => void;
    startGame: () => void,
    incrementAttempts: () => void;
    resetGame: (navigate: Function) => void;
}

export const useGameStore = create<gameState>((set) => ({
    isGameStart: false,
    cards: [],
    cardCount: 0,
    attempts: 0,
    timeInSecondsStr: '00:00:00',
    timeInSecondsNum: 0,
    isTimerRunning: false,

    setTimeInSecondsStr: (value) => set({ timeInSecondsStr: value }),
    setTimeInSecondsNum: (value) => set({ timeInSecondsNum: value }),
    setCards: (cards) => set({ cards }),
    setCardCount: (count) => set({cardCount: count}),
    startGame: () => set({isGameStart: true}),
    incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
    resetGame: (navigate) => {
        set({ isGameStart: false, attempts: 0, cardCount: 0, timeInSecondsNum: 0, timeInSecondsStr: '00:00:00' });
        navigate("/");
    },
}));