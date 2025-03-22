import cl from './styles/GameStatsPanel.module.scss';
import { useGameStore } from '../store/gameStore';
import { useUserStatsStore } from '../store/userStatsStore';
import { useEffect, useState } from 'react';

const GameStatsPanel = () => {
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const { attempts } = useGameStore();
    const { nickname, difficultLevel } = useUserStatsStore();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeInSeconds((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);
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
                <div className={cl.attempts}>{nickname}</div>
            </div>
            <div className={cl.stats_item}>
                <span>Level:</span>
                <div className={cl.attempts}>{difficultLevel}</div>
            </div>
            <div className={cl.stats_item}>
                <span>Attempts:</span>
                <div className={cl.attempts}>{attempts}</div>
            </div>
            <div className={cl.stats_item}>
                <span>Time:</span>
                <div className={cl.attempts}>{formatTime(timeInSeconds)}</div>
            </div>
        </div>
    );
};
export default GameStatsPanel;