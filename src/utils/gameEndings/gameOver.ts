import { useGameStore } from "../../store/gameStore";
import { useUserStatsStore } from "../../store/userStatsStore";
import { useNavigate } from "react-router-dom";

const { attempts, timeInSecondsStr, resetGame } = useGameStore();
const { resetStats, saveStats, setAttempts, setFinalTime } = useUserStatsStore();
const navigate = useNavigate();

export const gameOver = () => {
    setFinalTime(timeInSecondsStr);
    setAttempts(attempts);
    saveStats();
    resetGame(navigate);
    resetStats();
};