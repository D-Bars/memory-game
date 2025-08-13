import { useModalWindowStore } from "../../store/EndGameModalStore";
import { useGameStore } from "../../store/gameStore"
import { useMusicPlayerStore } from "../../store/musicStore";
import { useUserStatsStore } from "../../store/userStatsStore";

export const gameEndController = () => {
    const { saveCurrentStat, setAttempts, setFinalTime } = useUserStatsStore.getState();
    const { setWin } = useModalWindowStore.getState();

    const { setPageNameTrack, setCurrentTrackEl } = useMusicPlayerStore.getState();
    const {
        isGameEnd,
        isWin,
        pauseTimer,
        timeInSecondsStr,
        attempts
    } = useGameStore.getState();

    setFinalTime(timeInSecondsStr);
    setAttempts(attempts);
    saveCurrentStat();
    pauseTimer();
    
    if (isGameEnd && isWin) {
        setWin();
        setPageNameTrack('win');
        setCurrentTrackEl();
    }
}