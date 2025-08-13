import CardItem from './CardItem';
import cl from './styles/CardsList.module.scss';
import { useGameLogic } from "../hooks/useGameLogic";

const CardsList = () => {
    const { GameProgress, handleCardClick} = useGameLogic();
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