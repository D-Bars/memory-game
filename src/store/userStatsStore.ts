import { create } from "zustand";

interface userStatsStore{
    nickname: string;
    difficultLevel: string;
    finalAttempts: number;
    finalTime: number;
    setNickname: (name: string) => void;
    setDifficultLevel: (level: string) => void;
    setAttempts: (attempts: number) => void;
    setTime: (time: number) => void;
    resetStats: () => void;
}

export const useUserStatsStore = create<userStatsStore>((set) => ({
    nickname: '',
    difficultLevel: '',
    finalAttempts: 0,
    finalTime: 0,
    setNickname: (name) => set({nickname:name}),
    setDifficultLevel: (level) => set({difficultLevel:level}),
    setAttempts: (attempts) => set({finalAttempts:attempts}),
    setTime: (time) => set({finalTime:time}),
    resetStats: () => set({ nickname: '', difficultLevel: '', finalAttempts: 0, finalTime: 0 }),
}))