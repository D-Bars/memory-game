import { Card } from "../../types/Card";

interface getSlicedArrayArg{
    cards: Card[],
    count: number
}

export const getSlicedArray = ({ cards, count }: getSlicedArrayArg): Card[] => {
    return cards.slice(0, count);
};