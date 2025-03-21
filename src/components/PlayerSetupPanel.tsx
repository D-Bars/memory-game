import { useState } from 'react';
import cl from './styles/PlayerSetupPanel.module.scss';
import Difficult from './UI/Difficult/Difficult';
import InputLabel from './UI/InputLabel/InputLabel';
import BlickButton from './UI/BlickButton/BlickButton';
import { useGameStore } from '../store/gameStore';
import { getDifficultyLevels } from '../utils/getDifficultyLevels';

const PlayerSetupPanel = () => {
    const [userNickname, setUserNickname] = useState<string>('');
    const [level, setLevel] = useState<string>('');
    const {startGame} = useGameStore();

    const chosenLevel = (userLevel:string) => {
        setLevel(userLevel);
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
                <BlickButton disabled={isStartDisabled} onClick={()=> startGame()}>Start Game</BlickButton>
            </div>
        </div>
    );
};
export default PlayerSetupPanel;