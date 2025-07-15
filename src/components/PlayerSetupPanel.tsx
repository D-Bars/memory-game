import { useState } from 'react';
import cl from './styles/PlayerSetupPanel.module.scss';
import Difficult from './UI/Difficult/Difficult';
import InputLabel from './UI/InputLabel/InputLabel';
import BlickButton from './UI/BlickButton/BlickButton';
import { useGameStore } from '../store/gameStore';
import { getDifficultyLevels } from '../utils/getDifficultyLevels';
import { useUserStatsStore } from '../store/userStatsStore';
import { useNavigate } from 'react-router-dom';

const PlayerSetupPanel = () => {
    const [userNickname, setUserNickname] = useState<string>('');
    const [level, setLevel] = useState<string>('');
    const [selectedCardCount, setSelectedCardCount] = useState<number>(0);
    const { startGame, setCardCount } = useGameStore();
    const navigate = useNavigate();

    const chosenLevel = (userLevel: string, count: number) => {
        setLevel(userLevel);
        setSelectedCardCount(count);
    }

    const handleStart = () => {
        useUserStatsStore.getState().setNickname(userNickname);
        useUserStatsStore.getState().setDifficultLevel(level);
        setCardCount(selectedCardCount);
        startGame();
        navigate('/game');
    }

    const difficulty = getDifficultyLevels();

    const isStartDisabled = userNickname === '' || level === '';

    return (
        <div className={cl.body}>
            <div className={cl.body_mask}></div>
            <div className={cl.window_container}>
                <h2>Welcome to the memory game!</h2>
                <div className={cl.window_options_box}>
                    <InputLabel
                        id='userName'
                        label='Nickname'
                        inputType='text'
                        placeholder=''
                        value={userNickname}
                        onChange={(e) => setUserNickname(e.target.value)}
                    />
                    <h3>select difficulty level</h3>
                    <div className={cl.levels_box}>
                        {difficulty.map((difficult) => (
                            <Difficult
                                key={difficult.level}
                                cardCount={difficult.cardCount}
                                onClick={chosenLevel}
                                isActive={level === difficult.level}
                            >
                                {difficult.level}
                            </Difficult>
                        ))}
                    </div>
                </div>
                <BlickButton disabled={isStartDisabled} onClick={handleStart}>Start Game</BlickButton>
                <BlickButton onClick={() => navigate('/statistics')}>STATS</BlickButton>
            </div>
        </div>
    );
};
export default PlayerSetupPanel;