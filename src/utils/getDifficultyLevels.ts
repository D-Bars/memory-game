import { Difficulty } from '../types/Difficulty';

export const getDifficultyLevels = (): Difficulty[] => {
    return [
        { level: 'easy', cardCount: 4 },
        { level: 'medium', cardCount: 8 },
        { level: 'hard', cardCount: 12 },
    ];
}