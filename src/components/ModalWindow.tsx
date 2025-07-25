import cl from './styles/ModalWindow.module.scss';
import clsx from 'clsx';
import BlickButton from './UI/BlickButton/BlickButton';
import { useModalWindowStore } from '../store/modalWindowStore';
import { useGameOver } from '../hooks/useGameOver';
import { AnimatePresence, motion } from 'framer-motion';


const ModalWindow = () => {
    const { isOpen, isWin, resetModal } = useModalWindowStore();
    const gameOver = useGameOver();
    if (!isOpen) return;


    const gameEnd = () => {
        gameOver();
        resetModal();
    }

    const modalMessage = isWin
        ? {
            modalTitle: 'Congratulations!',
            modalText: 'You did a great job!',
            classPrefix: 'win'
        }
        : {
            modalTitle: 'Try again',
            modalText: 'Better luck next time!',
            classPrefix: 'loss'
        };

    const maskVariants = {
        visible: { opacity: 1, },
        hidden: { opacity: 0 },
        transition: { duration: 0.5 }
    }

    const containersVriants = {
        visible: { scale: 1 },
        hidden: { scale: 0.1 },
        transition: { duration: 0.8 }
    }

    return (
        <AnimatePresence>
            <motion.div
                className={cl.modal__window__mask}
                variants={maskVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className={cl.modal__window__container}
                    variants={containersVriants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className={clsx(cl.modal__window__title, cl[`title__${modalMessage.classPrefix}`])}>{modalMessage.modalTitle}</div>
                    <div className={cl.modal__window__text}>{modalMessage.modalText}</div>
                    <BlickButton
                        onClick={gameEnd}
                    >
                        Let`s play again
                    </BlickButton>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
export default ModalWindow;