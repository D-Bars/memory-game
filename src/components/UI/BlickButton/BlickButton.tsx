import { FC, ReactNode } from 'react';
import cl from './BlickButton.module.scss';
import useSound from 'use-sound';
import clickSoundStone from '/sounds/click/stone.mp3';

interface BlickButtonProps {
    disabled?: boolean;
    onClick: () => void;
    children: ReactNode;
}

const BlickButton: FC<BlickButtonProps> = ({ disabled, onClick, children }) => {
    const [soundStone] = useSound(clickSoundStone, {
        volume: 0.1,
        playbackRate: 1.25,
        interrupt: true,
    });
    return (
        <button
            className={cl.button}
            disabled={disabled}
            onClick={() => {
                soundStone();
                onClick();
            }}
        >
            {children}
        </button>
    );
};
export default BlickButton;