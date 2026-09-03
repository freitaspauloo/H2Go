"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/* YouTube IFrame API loader (shared, loads once)                      */
/* ------------------------------------------------------------------ */

type YTPlayer = {
  playVideo: () => void;
  seekTo: (s: number, allow?: boolean) => void;
  mute: () => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
        onError?: () => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytPromise: Promise<YTNamespace> | null = null;

function loadYouTubeAPI(): Promise<YTNamespace> {
  if (typeof window === "undefined") return new Promise(() => {});
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (ytPromise) return ytPromise;
  ytPromise = new Promise<YTNamespace>((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    s.onerror = () => reject(new Error("YouTube IFrame API failed to load"));
    document.head.appendChild(s);
    setTimeout(() => reject(new Error("YouTube IFrame API timeout")), 15000);
  });
  return ytPromise;
}

/* ------------------------------------------------------------------ */
/* Cover-fit maths for a 16:9 frame inside an arbitrary box            */
/* ------------------------------------------------------------------ */

function useCoverSize(ref: React.RefObject<HTMLElement | null>, aspect = 16 / 9, overscan = 1.12) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      let w = width;
      let h = w / aspect;
      if (h < height) {
        h = height;
        w = h * aspect;
      }
      setSize({ w: Math.ceil(w * overscan), h: Math.ceil(h * overscan) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, aspect, overscan]);
  return size;
}

/* ------------------------------------------------------------------ */
/* VideoBackground                                                     */
/* ------------------------------------------------------------------ */

export type VideoBackgroundProps = {
  /** Local MP4 (e.g. /h2go/video/fleet.mp4). Preferred when present. */
  mp4?: string;
  /** YouTube video id, used when no mp4 is given. */
  youtubeId?: string;
  /** Poster shown until the video is actually playing. */
  poster: string;
  posterAlt?: string;
  posterClassName?: string;
  /** Start offset in seconds for the YouTube source. */
  start?: number;
  className?: string;
  /** Extra overscan so player chrome never peeks in. */
  overscan?: number;
};

export function VideoBackground({
  mp4,
  youtubeId,
  poster,
  posterAlt = "",
  posterClassName,
  start = 0,
  className,
  overscan = 1.12,
}: VideoBackgroundProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const { w, h } = useCoverSize(boxRef, 16 / 9, overscan);
  const [playing, setPlaying] = useState(false);
  // null = probing, true = local file available, false = fall back to embed
  const [mp4Available, setMp4Available] = useState<boolean | null>(mp4 ? null : false);
  const useMp4 = mp4Available === true && !!mp4;
  const useYouTube = mp4Available === false && !!youtubeId;

  useEffect(() => {
    if (!mp4) return;
    let cancelled = false;
    const name = mp4.split("/").pop() ?? "";
    fetch(`/api/local-video?name=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((d: { exists?: boolean }) => {
        if (!cancelled) setMp4Available(!!d.exists);
      })
      .catch(() => {
        if (!cancelled) setMp4Available(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mp4]);
  const playerHostId = useId().replace(/[:]/g, "");
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    if (!useYouTube || !youtubeId) return;
    let cancelled = false;
    loadYouTubeAPI()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player(playerHostId, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            loop: 1,
            playlist: youtubeId,
            start,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              e.target.mute();
              e.target.playVideo();
            },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
              if (e.data === YT.PlayerState.ENDED) {
                e.target.seekTo(start, true);
                e.target.playVideo();
              }
            },
          },
        });
      })
      .catch(() => {
        /* poster stays; nothing else to do */
      });
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* noop */
      }
      playerRef.current = null;
    };
  }, [useYouTube, youtubeId, playerHostId, start]);

  return (
    <div ref={boxRef} className={clsx("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* Poster */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: playing ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={poster} alt={posterAlt} fill priority sizes="100vw" className={clsx("object-cover", posterClassName)} />
      </motion.div>

      {/* Native video */}
      {useMp4 && (
        <video
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          src={mp4}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          onError={() => setMp4Available(false)}
        />
      )}

      {/* YouTube (cover-fit, chrome hidden by overscan, inert) */}
      {useYouTube && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{ width: w || "100%", height: h || "100%", x: "-50%", y: "-50%" }}
          animate={{ opacity: playing ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div id={playerHostId} className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full" />
        </motion.div>
      )}
    </div>
  );
}
