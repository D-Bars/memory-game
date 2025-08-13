import { Card } from "../types/Card";
import { FC } from "react";
import cl from './styles/CardItem.module.scss';
import clsx from "clsx";

interface CardProps {
    card: Card;
    checkCard: (card: Card) => void;
}

const CardItem: FC<CardProps> = ({ card, checkCard }) => {
    return (
        <div className={cl.card_wrapper} onClick={() => checkCard(card)}>
            <div className={clsx(cl.card, { [cl.flipped]: card.isFlipped })}>
                <div className={cl.card_front}></div>
                <img className={cl.card_back} src={card.image} />
            </div>
        </div>
    );
};
export default CardItem;