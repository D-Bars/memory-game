import { Difficulty } from '../types/Difficulty';

export const getDifficultyLevels = (): Difficulty[] => {
    return [
        { level: 'easy', cardCount: 6 },
        { level: 'medium', cardCount: 12 },
        { level: 'hard', cardCount: 18 },
    ];
}