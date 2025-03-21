import { useState } from 'react';
import cl from './styles/PlayerSetupPanel.module.scss';
import { Difficulty } from '../types/Difficulty';
import Difficult from './UI/Difficult/Difficult';

const PlayerSetupPanel = () => {
    const [userNickname, setUserNickname] = useState<string>('');
    const [level, setLevel] = useState<string>('');

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
                    <div className={cl.user_name_box}>
                        <input id='userName' type="text" placeholder='' />
                        <label htmlFor="userName">Nickname</label>
                    </div>
                    <h3>select difficulty level</h3>
                    <div className={cl.levels_box}>
                        {difficulty.map((difficult) => (
                            <Difficult
                                key={difficult.level}
                                cardCount={difficult.cardCount}
                            >
                                {difficult.level}
                            </Difficult>
                        ))}
                    </div>
                </div>
                <button disabled={isStartDisabled} onClick={startGame}>Start Game</button>
            </div>
        </div>
    );
};
export default PlayerSetupPanel;