import { useGameStore } from "../store/gameStore";
import { useUserStatsStore } from "../store/userStatsStore";
import { useNavigate } from "react-router-dom";

export const useGameOver = () => {
    const { resetGame } = useGameStore();
    const { resetCurrentStat } = useUserStatsStore();
    const navigate = useNavigate();

    return () => {
        resetGame(navigate);
        resetCurrentStat();
    };
};