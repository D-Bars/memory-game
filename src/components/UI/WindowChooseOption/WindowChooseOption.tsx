import { FC, useState } from "react";
import cl from "./WindowChooseOption.module.scss";
import useSound from "use-sound";
import clickSoundStone from '/sounds/click/stone.mp3';
import { AnimatePresence, motion } from 'framer-motion';

interface WindowChooseOptionArgs {
  optionTextArr: Record<string, boolean>,
  title: string,
  hasMask?: boolean,
  onClick: (val: boolean) => void;
}

const WindowChooseOption: FC<WindowChooseOptionArgs> = ({ optionTextArr, title, hasMask, onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const closeModal = () => {
    setIsOpen(false);
  }

  const [soundStone] = useSound(clickSoundStone, {
    volume: 0.1,
    playbackRate: 1.25,
    interrupt: true,
  });

  const bodyVariants = {
    visible: {
      y: 0,
      transition: { duration: .6 }
    },
    hidden: {
      y: -1000,
      transition: { duration: .6 }
    },
  }

  const optionVariants = {
    visible: {
      y: 0,
      transition: { duration: .1 }
    },
    hidden: {
      y: -600,
    },
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cl.window__body}
          variants={bodyVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {hasMask && (
            <div className={cl.window__mask}></div>
          )}
          <div className={cl.window__container}>
            <div className={cl.window__title}>{title}</div>
            <div className={cl.window__options__box}>
              {Object.entries(optionTextArr).map(([key, value], i) => (
                <motion.div
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"

                  className={cl.window__option}
                  data-val={value}
                  key={`${key}-${value}-${i}`}
                  onClick={
                    () => {
                      soundStone();
                      closeModal();
                      onClick(value);
                    }
                  }
                >
                  {key}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default WindowChooseOption;