import { Card } from "../../types/Card";

export function flipAndMatchCards(cards: Card[], firstCard: Card, secondCard: Card): Card[] {
  return cards.map(cardItem =>
    cardItem.id === firstCard.id || cardItem.id === secondCard.id
      ? { ...cardItem, isFlipped: true, isMatched: true }
      : cardItem
  );
}
