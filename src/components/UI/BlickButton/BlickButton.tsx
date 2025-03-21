import { FC, ReactNode } from 'react';
import cl from './BlickButton.module.scss';

interface BlickButtonProps {
    disabled?: boolean;
    onClick: () => void;
    children: ReactNode;
}

const BlickButton: FC<BlickButtonProps> = ({ disabled, onClick, children }) => {
    return (
        <button
            className={cl.button}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default BlickButton;