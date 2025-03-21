import React, { FC } from 'react';
import cl from './Difficult.module.scss';

interface DifficultProps{
    cardCount: number,
    children: string
}

const Difficult: FC<DifficultProps> = ({cardCount, children}) => {
    return (
        <div
            className={cl.level}
            data-cardCount={cardCount}
        >
            {children}
        </div>
    );
};
export default Difficult;