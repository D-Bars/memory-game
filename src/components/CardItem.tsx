import { Card } from "../types/Card";
import React, { useState } from "react";
import { FC } from "react";
import { useGameStore } from "../store/gameStore";
import cl from './styles/CardItem.module.scss';
import clsx from "clsx";

interface CardProps {
    card: Card;
}

const CardItem: FC<CardProps> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { incrementAttempts } = useGameStore();
    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
        incrementAttempts();
    };
    return (

        <div
            className={clsx(cl.card, { [cl.flipped]: isFlipped })}
            onClick={handleCardClick}>
            <div className={cl.card_front}></div>
            <img className={cl.card_back} src={card.image} />
        </div>
    );
};
export default CardItem;