import { useGameStore } from "../store/gameStore";
import CardItem from './CardItem';
import cl from './styles/CardsList.module.scss';
import { useGameLogic } from "../hooks/useGameLogic";

const CardsList = () => {
    const { cardCount, cards } = useGameStore();
    const {finalCardsArray, handleCardClick, cardWaiting} = useGameLogic(cards, cardCount);

    return (
        <div className={cl.cards_box}>
            {
                finalCardsArray.map(card => (
                    <CardItem
                        key={card.uniqueId}
                        card={card}
                        checkCard={handleCardClick}
                        isWaiting={cardWaiting}
                    />
                ))
            }
        </div>
    );
};
export default CardsList;