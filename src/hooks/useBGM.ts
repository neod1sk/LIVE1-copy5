import { useEffect, useRef } from "react";

export const useBGM = (src: string, volume = 1) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    audio.play().catch(() => {
      console.log("Auto-play blocked, user interaction needed");
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, volume]);

  return audioRef;
};

