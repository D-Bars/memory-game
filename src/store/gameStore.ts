import { create } from "zustand";
import { Card } from "../types/Card";

interface gameState {
    isGameStart: boolean;
    cards: Card[];
    cardCount: number;
    attempts: number;
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
    setCards: (cards) => set({ cards }),
    setCardCount: (count) => set({cardCount: count}),
    startGame: () => set({isGameStart: true}),
    incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
    resetGame: (navigate) => {
        set({ isGameStart: false, attempts: 0, cardCount: 0 });
        navigate("/");
    },
}));