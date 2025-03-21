import { FC } from 'react';
import cl from './Difficult.module.scss';

interface DifficultProps{
    cardCount: number,
    children: string,
    onClick: (level: string) => void;
    isActive: boolean;
}

const Difficult: FC<DifficultProps> = ({cardCount, children, onClick, isActive}) => {
    const handleClick = () => {
        onClick(children); 
      };
    return (
        <div
            onClick={handleClick}
            className={`${cl.level} ${isActive ? cl.active : ''}`}
            data-cardCount={cardCount}
        >
            {children}
        </div>
    );
};
export default Difficult;