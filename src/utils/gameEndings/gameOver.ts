import { useGameStore } from "../../store/gameStore";
import { useUserStatsStore } from "../../store/userStatsStore";
import { useNavigate } from "react-router-dom";


export const gameOver = () => {
    const { attempts, timeInSecondsStr, resetGame } = useGameStore();
    const { resetStats, saveStats, setAttempts, setFinalTime } = useUserStatsStore();
    const navigate = useNavigate();
    
    setFinalTime(timeInSecondsStr);
    setAttempts(attempts);
    saveStats();
    resetGame(navigate);
    resetStats();
};