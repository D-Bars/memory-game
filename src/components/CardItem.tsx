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
    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };
    return (

        <div
            className={clsx(cl.card, { [cl.flipped]: isFlipped })}
            onClick={handleCardClick}>
            <div className={cl.card_front}>{card.id}</div>
            <div className={cl.card_back}>{card.id}</div>
        </div>
    );
};
export default CardItem;