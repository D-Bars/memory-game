import { create } from "zustand";
import { Card } from "../types/Card";
import { Difficulty } from "../types/Difficulty";

interface gameState {
    cards: Card[];
    difficulties: Difficulty[];
    attempts: number;
    timer: number;
    setCards: (cards: Card[]) => void;
    incrementAttempts: () => void;
    resetGame: () => void;
}

export const useGameStore = create<gameState>((set) => ({
    cards: [],
    difficulties: [],
    attempts: 0,
    timer: 0,
    setCards: (cards) => set({ cards }),
    incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
    resetGame: () => set({ cards: [], attempts: 0, timer: 0 }),
}));