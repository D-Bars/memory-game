import { create } from "zustand";

interface modalWindowStore {
    isOpen: boolean;
    isWin: boolean | null;

    setWin: () => void;
    setLose: () => void;
    resetModal: () => void;
}

export const useModalWindowStore = create<modalWindowStore>((set) => ({
    isOpen: false,
    isWin: null,

    setWin: () => {
        set({ isOpen: true, isWin: true });
    },

    setLose: () => {
        set({ isOpen: true, isWin: false });
    },

    resetModal: () => {
        set({ isOpen: false, isWin: null });
    },
}))