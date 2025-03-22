import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { getShuffledArray } from "../utils/getShuffledArray";
import { getSlicedArray } from "../utils/getSliсedArray";
import { getDuplicatedArray } from "../utils/getDuplicatedArray";
import { Card } from "../types/Card";
import CardItem from './CardItem';
import cl from './styles/CardsList.module.scss';

const CardsList = () => {
    const { cardCount, cards } = useGameStore();
    const [finalCardsArray, setFinalCardsArray] = useState<Card[]>([]);

    const handleClickItem = () => {
        console.log(1);
    }
    useEffect(() => {
        const prepareCardsArray = () => {
            const shuffledArray = getShuffledArray({ cards });
            const slicedArray = getSlicedArray({ cards: shuffledArray, count: cardCount });
            const duplicatedArray = getDuplicatedArray({ cards: slicedArray });
            const duplicatedAndShuffledArray = getShuffledArray({ cards: duplicatedArray });
            return duplicatedAndShuffledArray;
        }

        const cardsArr = prepareCardsArray();
        setFinalCardsArray(cardsArr);
    }, [cardCount, cards]);

    return (
        <div className={cl.cards_box}>
            {
                finalCardsArray.map((card) => (
                    <CardItem
                        key={card.uniqueId}
                        card={card}
                        // onClicked={handleClickItem}
                    />
                ))
            }
        </div>
    );
};
export default CardsList;