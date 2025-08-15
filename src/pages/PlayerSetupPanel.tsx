import { useEffect, useState } from 'react';
import cl from './styles/PlayerSetupPanel.module.scss'
import Difficult from '../components/UI/Difficult/Difficult';
import InputLabel from '../components/UI/InputLabel/InputLabel';
import BlickButton from '../components/UI/BlickButton/BlickButton';
import { useGameStore } from '../store/gameStore';
import { getDifficultyLevels } from '../utils/difficultLevels/getDifficultyLevels';
import { useUserStatsStore } from '../store/userStatsStore';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import clickSoundStone from '/sounds/click/stone.mp3';
import { useMusicPlayerStore } from '../store/musicStore';

const PlayerSetupPanel = () => {
    const [userNickname, setUserNickname] = useState<string>('');
    const [level, setLevel] = useState<string>('');
    const [selectedCardCount, setSelectedCardCount] = useState<number>(0);
    const { startGame, setCardCount, removeGameByLocalStorage } = useGameStore();
    const navigate = useNavigate();

    const { setPageNameTrack, setCurrentTrackEl, isMusicOn } = useMusicPlayerStore();

    useEffect(() => {
        setPageNameTrack('setup');
        setCurrentTrackEl();
    }, [isMusicOn]);

    const [soundStone] = useSound(clickSoundStone, {
        volume: 0.1,
        playbackRate: 1.25,
        interrupt: true,
    });

    const chosenLevel = (userLevel: string, count: number) => {
        soundStone();
        setLevel(userLevel);
        setSelectedCardCount(count);
    }

    const handleStart = () => {
        if (localStorage.getItem('game')) {
            removeGameByLocalStorage();
        }
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