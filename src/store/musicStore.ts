import { create } from "zustand";
import { getMusicBackgroundArray } from "../utils/music/getMusicBakgroundArray";
import { applyDefaultAudioSettings } from "../utils/music/defaultAudioSettings";
import { volumeTransition } from "../utils/music/volumeTransition";

interface musicPlayerStore{
    isMusicOn: boolean,
    currentTrackEl: HTMLAudioElement | null,
    pageName: string | null,
    musicArray: Record<string, string>,
    volumeMax: number,
    volumeMin: number,

    setIsMusicOn: (choice: boolean) => void;
    setPageNameTrack: (name: string) => void;
    setCurrentTrackEl: () => void;
    removeTrack: (track: HTMLAudioElement) => void;
}

export const useMusicPlayerStore = create<musicPlayerStore>((set, get) => ({
    isMusicOn: false,
    currentTrackEl: null,
    pageName: null,
    musicArray: getMusicBackgroundArray(),
    volumeMax: 0.3,
    volumeMin: 0,

    setIsMusicOn: (choice) => {
        set({isMusicOn: choice})
    },

    setPageNameTrack: (name) => {
        set({pageName: name})
    },

    removeTrack: (track) => {
        track.pause();
        track.src = '';
    },

    setCurrentTrackEl: () => {
        const {pageName, musicArray, isMusicOn, volumeMax, volumeMin, currentTrackEl, removeTrack} = get();
        if(!isMusicOn || !pageName) return;

        if(currentTrackEl){
            volumeTransition({ from: volumeMax, to: volumeMin, audioObj: currentTrackEl, onFinish: removeTrack });
        }

        const currentTrackSrc = musicArray[pageName];
        const audio = new Audio(currentTrackSrc);
        applyDefaultAudioSettings(audio);
        volumeTransition({ from: volumeMin , to: volumeMax, audioObj: audio});
        set({currentTrackEl: audio})
    } 
}))