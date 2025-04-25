import cl from './styles/GameStatsPanel.module.scss';
import { useGameStore } from '../store/gameStore';
import { useUserStatsStore } from '../store/userStatsStore';
import { useEffect } from 'react';
import BlickButton from './UI/BlickButton/BlickButton';
import { useNavigate } from 'react-router-dom';

const GameStatsPanel = () => {
    const { nickname, difficultLevel } = useUserStatsStore();
    const {
        attempts,
        resetGame,
        timeInSecondsStr,
        timeInSecondsNum,
        setTimeInSecondsStr,
        setTimeInSecondsNum,
        isTimerStopped
    } = useGameStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTimerStopped) {
            const timer = setInterval(() => {
                let newTime = timeInSecondsNum + 1;
                setTimeInSecondsNum(newTime);
                setTimeInSecondsStr(formatTime(newTime));
                return newTime;
            }, 1000)
            return () => clearInterval(timer);
        }
    }, [timeInSecondsStr, isTimerStopped]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={cl.game_stats_panel}>
            <div className={cl.stats_item}>
                <span>Nickname:</span>
                <div className={cl.item_data}>{nickname}</div>
            </div>
            <div className={cl.stats_item}>
                <span>Level:</span>
                <div className={cl.item_data}>{difficultLevel}</div>
            </div>
            <div className={cl.stats_item}>
                <span>Attempts:</span>
                <div className={cl.item_data}>{attempts}</div>
            </div>
            <div className={cl.stats_item}>
                <span>Time:</span>
                <div className={cl.item_data}>{timeInSecondsStr}</div>
            </div>
            <div className={cl.routes_box}>
                <BlickButton onClick={() => { resetGame(() => navigate('/')) }}>BACK TO SETUP</BlickButton>
                <BlickButton onClick={() => { navigate('/statistics') }}>STATS</BlickButton>
            </div>
        </div>
    );
};
export default GameStatsPanel;