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

export const useUserStatsStore = create<userStatsStore>((set, get) => ({
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
    saveStats: () => {
        const savedStats = localStorage.getItem('userStats');

        const statsArray = savedStats ? JSON.parse(savedStats) : [];
        const newGameStats = {
            nickname: get().nickname,
            difficultLevel: get().difficultLevel,
            finalAttempts: get().finalAttempts,
            finalTime: get().finalTime
        };

        statsArray.push(newGameStats);

        localStorage.setItem('userStats', JSON.stringify(statsArray));
    },
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