import { Card } from "../types/Card";
import { FC } from "react";
import { useGameStore } from "../store/gameStore";
import cl from './styles/CardItem.module.scss';
import clsx from "clsx";

interface CardProps {
    card: Card;
    checkCard: (card: Card) => void;
    isWaiting : boolean;
}

const CardItem: FC<CardProps> = ({ card, checkCard, isWaiting }) => {
    const { incrementAttempts } = useGameStore();
    const handleCardClick = (card: Card) => {
        if (card.isFlipped || card.isMatched || isWaiting) return;
        incrementAttempts();
        checkCard(card);
    };
    return (
        <div
            className={clsx(cl.card, { [cl.flipped]: card.isFlipped })}
            onClick={()=>{handleCardClick(card)}}>
            <div className={cl.card_front}></div>
            <img className={cl.card_back} src={card.image} />
        </div>
    );
};
export default CardItem;