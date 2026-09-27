import { useCallback, useEffect, useRef } from "react";

/**
 * The three sound effects this app expects. Drop your own files into
 * `public/sounds/` using these exact names — see public/sounds/README.md.
 */
const SOUND_FILES = {
  frame: "/sounds/frame-pass.mp3",
  select: "/sounds/selected.mp3",
  unbox: "/sounds/unboxing.mp3",
} as const;

type SoundName = keyof typeof SOUND_FILES;

/**
 * Preloads each sfx once and exposes play() functions. Cloning the node on
 * every play lets the same sound overlap itself (important for "frame"
 * ticks, which can fire faster than one clip's playback length).
 */
export function useSound() {
  const buffers = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});

  useEffect(() => {
    (Object.keys(SOUND_FILES) as SoundName[]).forEach((name) => {
      const audio = new Audio(SOUND_FILES[name]);
      audio.preload = "auto";
      buffers.current[name] = audio;
    });
  }, []);

  const play = useCallback((name: SoundName, volume = 1) => {
    const base = buffers.current[name];
    if (!base) return;
    const node = base.cloneNode(true) as HTMLAudioElement;
    node.volume = volume;
    // Swallow the error a browser throws when a file is missing or
    // autoplay is briefly blocked — the case opener should never crash
    // just because a sound didn't play.
    node.play().catch(() => {});
  }, []);

  return {
    playFrame: (volume = 0.5) => play("frame", volume),
    playSelect: (volume = 1) => play("select", volume),
    playUnbox: (volume = 1) => play("unbox", volume),
  };
}
