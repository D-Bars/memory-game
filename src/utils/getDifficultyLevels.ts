import { Difficulty } from '../types/Difficulty';

export const getDifficultyLevels = (): Difficulty[] => {
    return [
        { level: 'easy', cardCount: 2 },
        { level: 'medium', cardCount: 12 },
        { level: 'hard', cardCount: 18 },
    ];
}