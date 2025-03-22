import { Card } from "../types/Card";

interface getShuffledArrayArg{
    cards: Card[]
}

export const getShuffledArray = ({ cards }: getShuffledArrayArg): Card[] => {
    const shuffledArr = [...cards];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
};