import { getShuffledArray } from "./getShuffledArray";
import { getSlicedArray } from "./getSliсedArray";
import { getDuplicatedArray } from "./getDuplicatedArray";
import { Card } from "../../types/Card";

export const GenerateCardsArray = (cards: Card[], cardCount: number) => {
    const shuffledArray = getShuffledArray({ cards });
    const slicedArray = getSlicedArray({ cards: shuffledArray, count: cardCount });
    const duplicatedArray = getDuplicatedArray({ cards: slicedArray });
    const duplicatedAndShuffledArray = getShuffledArray({ cards: duplicatedArray });
    return duplicatedAndShuffledArray;
}