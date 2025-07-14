import { Card } from "../../types/Card";

export function resetCards(cards: Card[], firstCard: Card, secondCard: Card): Card[] {
  return cards.map(cardItem =>
    cardItem.uniqueId === firstCard.uniqueId || cardItem.uniqueId === secondCard.uniqueId
      ? { ...cardItem, isFlipped: false }
      : cardItem
  );
}
