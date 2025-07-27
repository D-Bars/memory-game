import { create } from "zustand";
import { getMusicBackgroundArray } from "../utils/music/getMusicBakgroundArray";
import { applyDefaultAudioSettings } from "../utils/music/defaultAudioSettings";

interface musicPlayerStore{
    currentTrackEl: HTMLAudioElement | null,
    pageNameTrack: string | null,
    musicArray: Record<string, string>,
    isPlaying: boolean,
    volume: number,

    setPageNameTrack: (name: string) => void;
    setCurrentTrackEl: () => void;
}

export const useMusicPlayerStore = create<musicPlayerStore>((set, get) => ({
    currentTrackEl: null,
    pageNameTrack: null,
    musicArray: getMusicBackgroundArray(),
    isPlaying: false,
    volume: 0.5,

    setPageNameTrack: (name) => {
        set({pageNameTrack: name})
    },

    setCurrentTrackEl: () => {
        const {pageNameTrack, musicArray} = get();
        if (!pageNameTrack) return;
        console.log(1);

        const currentTrackSrc = musicArray[pageNameTrack];
        const audio = new Audio(currentTrackSrc);
        applyDefaultAudioSettings(audio);
        set({currentTrackEl: audio})
    }
}))