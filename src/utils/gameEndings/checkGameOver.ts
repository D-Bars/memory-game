import { Card } from "../../types/Card";

export const checkGameOver = (cards: Card[]):boolean =>{
    return cards.every(card => card.isMatched);
}