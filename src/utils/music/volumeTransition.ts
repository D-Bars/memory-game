interface volumeTransitionArgs {
    from: number,
    to: number,
    audioObj: HTMLAudioElement,
    onFinish?: (audio: HTMLAudioElement) => void
}

export const volumeTransition = ({from, to, audioObj, onFinish}: volumeTransitionArgs): void => {
    const step = 0.05;
    const interval = 100;

    const intervalId = window.setInterval(() => {
        if (from < to) {
            from = Math.min(from + step, to);
        } else {
            from = Math.max(from - step, to);
        }

        audioObj.volume = from;

        if (from === to) {
            clearInterval(intervalId);
            onFinish?.(audioObj);
        }
    }, interval);
};