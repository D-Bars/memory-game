import { Card } from "../../types/Card";

interface getDuplicatedArrayArg{
    cards: Card[]
}

export const getDuplicatedArray = ({ cards }: getDuplicatedArrayArg): Card[] => {
    const duplicatedArr = [...cards, ...cards].map((card, index)=>({
        ...card,
        uniqueId: `${card.id}-${index}`
    }));
    return duplicatedArr;
};