import { Card } from "../types/Card";
import { FC } from "react";
import cl from './styles/CardItem.module.scss';
import clsx from "clsx";
import useSound from 'use-sound';
import clickSoundFlip from '/sounds/click/flip__card.mp3';

interface CardProps {
    card: Card;
    checkCard: (card: Card) => void;
    isWaiting: boolean;
}

const CardItem: FC<CardProps> = ({ card, checkCard, isWaiting }) => {
    const [soundFlip] = useSound(clickSoundFlip, {
        volume: 0.6,
        playbackRate: 1.25,
        interrupt: true,
    });

    const handleCardClick = (card: Card) => {
        if (card.isFlipped || card.isMatched || isWaiting) return;
        soundFlip();
        checkCard(card);
    };
    return (
        <div className={cl.card_wrapper} onClick={() => { handleCardClick(card); }}>
            <div className={clsx(cl.card, { [cl.flipped]: card.isFlipped })}>
                <div className={cl.card_front}></div>
                <img className={cl.card_back} src={card.image} />
            </div>
        </div>
    );
};
export default CardItem;