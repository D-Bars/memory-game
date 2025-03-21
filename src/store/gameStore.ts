import { create } from "zustand";
import { Card } from "../types/Card";

interface gameState {
    isGameStart: boolean;
    cards: Card[];
    attempts: number;
    timer: number;
    setCards: (cards: Card[]) => void;
    startGame: () => void,
    incrementAttempts: () => void;
    resetGame: () => void;
}

export const useGameStore = create<gameState>((set) => ({
    isGameStart: false,
    cards: [],
    attempts: 0,
    timer: 0,
    setCards: (cards) => set({ cards }),
    startGame: () => set({isGameStart: true}),
    incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
    resetGame: () => set({ isGameStart: false, attempts: 0, timer: 0 }),
}));