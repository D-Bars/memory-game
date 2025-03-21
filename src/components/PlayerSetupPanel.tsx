import { useState } from 'react';
import cl from './styles/PlayerSetupPanel.module.scss';
import { Difficulty } from '../types/Difficulty';
import Difficult from './UI/Difficult/Difficult';
import InputLabel from './UI/InputLabel/InputLabel';
import BlickButton from './UI/BlickButton/BlickButton';

const PlayerSetupPanel = () => {
    const [userNickname, setUserNickname] = useState<string>('');
    const [level, setLevel] = useState<string>('');

    const chosenLevel = (userLevel:string) => {
        setLevel(userLevel);
    }

    const startGame = () => {
        console.log('game been started');
    }
    const difficulty: Difficulty[] = [
        { level: 'easy', cardCount: 6 },
        { level: 'medium', cardCount: 12 },
        { level: 'hard', cardCount: 18 },
    ];

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
                <BlickButton disabled={isStartDisabled} onClick={startGame}>Start Game</BlickButton>
            </div>
        </div>
    );
};
export default PlayerSetupPanel;