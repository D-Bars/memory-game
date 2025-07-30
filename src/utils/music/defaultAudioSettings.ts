export const applyDefaultAudioSettings = (audio: HTMLAudioElement): void => {
    audio.loop = true;
    audio.volume = 0;
    audio.play();
}