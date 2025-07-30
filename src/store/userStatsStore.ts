import { create } from "zustand";
import { GameStat } from '../types/GameStat';

interface userStatsStore {
    stats: GameStat[];
    nickname: string;
    difficultLevel: string;
    finalAttempts: number;
    finalTime: string;
    setNickname: (name: string) => void;
    setDifficultLevel: (level: string) => void;
    setAttempts: (attempts: number) => void;
    setFinalTime: (time: string) => void;
    resetStats: () => void;
    saveStats: () => void;
    loadStats: () => void;
}

export const useUserStatsStore = create<userStatsStore>((set) => ({
    stats: [],
    nickname: '',
    difficultLevel: '',
    finalAttempts: 0,
    finalTime: '00:00:00',
    setNickname: (name) => set({ nickname: name }),
    setDifficultLevel: (level) => set({ difficultLevel: level }),
    setAttempts: (attempts) => set({ finalAttempts: attempts }),
    setFinalTime: (time) => set({ finalTime: time }),
    resetStats: () => set({ nickname: '', difficultLevel: '', finalAttempts: 0, finalTime: '00:00:00' }),
    saveStats: () => set((state) => {
        const savedStats = localStorage.getItem('userStats');

        const statsArray = savedStats ? JSON.parse(savedStats) : [];
        const newGameStats = {
            nickname: state.nickname,
            difficultLevel: state.difficultLevel,
            finalAttempts: state.finalAttempts,
            finalTime: state.finalTime
        };

        statsArray.push(newGameStats);

        localStorage.setItem('userStats', JSON.stringify(statsArray));

        return { ...state, stats: statsArray };
    }),
    loadStats: () => {
        const savedStats = localStorage.getItem('userStats');
        const statsArray = savedStats ? JSON.parse(savedStats) : [];
        set({
            nickname: statsArray[statsArray.length - 1]?.nickname || '',
            difficultLevel: statsArray[statsArray.length - 1]?.difficultLevel || '',
            finalAttempts: statsArray[statsArray.length - 1]?.finalAttempts || 0,
            finalTime: statsArray[statsArray.length - 1]?.finalTime || '00:00:00',
            stats: statsArray
        });
    }
}))