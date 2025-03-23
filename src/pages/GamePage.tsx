import { useGameStore } from '../store/gameStore';
import GameBoard from '../components/GameBoard';
import cl from './styles/GamePage.module.scss';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
    const { isGameStart } = useGameStore();
    const navigate = useNavigate();
    const backToSetup = () => {
        navigate('/');
    }
    return (
        <div>
            {isGameStart ? (
                <GameBoard />
            ) : (
                <div className={cl.route_box}>
                    <h2>Game has not started yet. Please go to the</h2>
                    <div className={cl.route} onClick={backToSetup}>setup page.</div>
                </div>
            )}
        </div>
    );
};

export default GamePage;