import CardItem from './CardItem';
import cl from './styles/CardsList.module.scss';
import { useGameLogic } from "../hooks/useGameLogic";
import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

const CardsList = () => {
    const { GameProgress, handleCardClick, handleMismatch } = useGameLogic();
    useEffect(() => {
        const { mismatchedCards } = useGameStore.getState();
        if (mismatchedCards.length) {
            const [firstCard, secondCard] = mismatchedCards;
            handleMismatch(GameProgress, firstCard, secondCard);
        }
    }, []);
    return (
        <div className={cl.cards_box}>
            {
                GameProgress.map(card => (
                    <CardItem
                        key={card.uniqueId}
                        card={card}
                        checkCard={handleCardClick}
                    />
                ))
            }
        </div>
    );
};
export default CardsList;