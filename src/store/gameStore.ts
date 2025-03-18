import { create } from "zustand";

interface Card {
    id: number;
    image: string;
    uniqueId: string;
    isFlipped: boolean;
    isMatched: boolean;
}

interface gameState {
    cards: Card[];
    attempts: number;
    timer: number;
    startGame: (cards: Card[]) => void;
    incrementAttempts: () => void;
    resetGame: () => void;
}

export const useGameStore = create<gameState>((set) => ({
    cards: [],
    attempts: 0,
    timer: 0,
    startGame: (cards) => set({cards}),
    incrementAttempts: () => set ((state) => ({ attempts: state.attempts + 1})),
    resetGame: () => set({cards: [], attempts: 0, timer: 0})
}))