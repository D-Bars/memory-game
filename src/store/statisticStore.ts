import { create } from 'zustand';
import { GameStat } from '../types/GameStat';

interface statisticsStore {
  stats: GameStat[];
  loadStats: () => void;
}

export const useStatisticsStore = create<statisticsStore>((set) => ({
  stats: [],
  loadStats: () => {
    const savedStats = localStorage.getItem('userStats');
    const statsArray = savedStats ? JSON.parse(savedStats) : [];
    set({ stats: statsArray });
  },
}));