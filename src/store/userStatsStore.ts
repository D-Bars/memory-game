import { create } from "zustand";
import { GameStat } from '../types/GameStat';
import { saveDataByKey } from "../utils/localStorage/saveDataByKey";
import { getDataByKey } from "../utils/localStorage/getDataByKey";

interface UserStatsStore {
    stats: GameStat[];
    currentStat: GameStat;
    setNickname: (name: string) => void;
    setDifficultLevel: (level: string) => void;
    setAttempts: (attempts: number) => void;
    setFinalTime: (time: string) => void;
    resetCurrentStat: () => void;
    saveCurrentStat: () => void;
    loadStats: () => void;
}

const emptyStat: GameStat = {
    nickname: '',
    difficultLevel: '',
    finalAttempts: 0,
    finalTime: '00:00:00',
};

export const useUserStatsStore = create<UserStatsStore>((set, get) => {
    const updateStats = (partial: Partial<GameStat>) =>
        set((state) => ({ currentStat: { ...state.currentStat, ...partial } }));
    return {
        stats: [],
        currentStat: emptyStat,

        setNickname: (name) => updateStats({ nickname: name }),
        setDifficultLevel: (level) => updateStats({ difficultLevel: level }),
        setAttempts: (attempts) => updateStats({ finalAttempts: attempts }),
        setFinalTime: (time) => updateStats({ finalTime: time }),

        resetCurrentStat: () => set({ currentStat: emptyStat }),

        saveCurrentStat: () => {
            const { stats, currentStat } = get();
            const newStats = [...stats, currentStat];
            saveDataByKey('userStats', newStats);
            set({ stats: newStats});
        },

        loadStats: () => {
            const statsArray = getDataByKey('userStats');
            set({ stats: statsArray });
        }
    }
});
