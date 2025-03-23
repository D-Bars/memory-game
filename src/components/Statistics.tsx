import { useNavigate } from 'react-router-dom';
import { GameStat } from '../types/GameStat';
import cl from './styles/Statistics.module.scss';
import BlickButton from './UI/BlickButton/BlickButton';
import { useGameStore } from '../store/gameStore';

interface StatisticsProps {
    statsArray: GameStat[];
}

const Statistics = ({ statsArray }: StatisticsProps) => {
    const {isGameStart} = useGameStore();
    const navigate = useNavigate();
    return (
        <div className={cl.statistics}>
            <h1>Statistics</h1>
            {statsArray.length > 0 ? (
                <table className={cl.statistics_table}>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>Level</th>
                            <th>Attempts</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statsArray.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.nickname}</td>
                                <td>{stat.difficultLevel}</td>
                                <td>{stat.finalAttempts}</td>
                                <td>{stat.finalTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={cl.stats_not_found}>No statistics found</div>
            )}
            <div className={cl.routes_box}>
                <BlickButton onClick={() => navigate('/')}>BACK TO SETUP</BlickButton>
                {isGameStart ? (
                    <BlickButton onClick={() => navigate('/game')}>BACK TO GAME</BlickButton>
                )
                : (
                    <></>
                )
                }
            </div>
        </div>
    );
};

export default Statistics;