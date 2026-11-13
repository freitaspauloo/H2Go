"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

function postToPlayer(frame: HTMLIFrameElement, payload: object) {
  frame.contentWindow?.postMessage(JSON.stringify(payload), "*");
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
};

export function VideoBackground({
  mp4,
  youtubeId,
  poster,
  posterAlt = "",
  posterClassName,
  start = 0,
  className,
}: VideoBackgroundProps) {
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

  useEffect(() => {
    if (!useYouTube || !youtubeId) return;
    const frame = document.getElementById(playerHostId) as HTMLIFrameElement | null;
    if (!frame) return;

    let current = 0;
    let duration = 0;
    let kicked = false;
    const command = (func: string, args: unknown[] = []) => postToPlayer(frame, { event: "command", func, args });
    const reveal = () => setPlaying(true);
    const handshake = () => {
      postToPlayer(frame, { event: "listening", id: playerHostId, channel: "widget" });
      command("mute");
      if (!kicked) {
        kicked = true;
        command("playVideo");
      }
    };
    const replay = () => {
      command("seekTo", [start, true]);
      command("playVideo");
    };
    const applyState = (state?: number) => {
      if (state === 1) reveal();
      if (state === 0) replay();
      if (state === 2 || state === 5 || state === -1) command("playVideo");
    };
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow) return;
      let data: { event?: string; info?: number | { playerState?: number; currentTime?: number; duration?: number } } = {};
      if (typeof event.data === "string") {
        try {
          data = JSON.parse(event.data);
        } catch {
          return;
        }
      } else if (event.data && typeof event.data === "object") {
        data = event.data;
      }
      if (data.event === "onReady" || data.event === "initialDelivery") {
        reveal();
        command("mute");
      }
      if (data.event === "infoDelivery" && data.info && typeof data.info === "object") {
        if (typeof data.info.currentTime === "number") current = data.info.currentTime;
        if (typeof data.info.duration === "number") duration = data.info.duration;
        if (duration > 1 && current >= duration - 0.4) replay();
        if (typeof data.info.playerState === "number") applyState(data.info.playerState);
      }
      if (data.event !== "onStateChange") return;
      applyState(typeof data.info === "number" ? data.info : data.info?.playerState);
    };

    const tick = window.setInterval(() => {
      handshake();
      command("getCurrentTime");
      command("getDuration");
    }, 1000);
    const revealTimer = window.setTimeout(reveal, 700);

    frame.addEventListener("load", handshake);
    window.addEventListener("message", onMessage);
    handshake();
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(revealTimer);
      frame.removeEventListener("load", handshake);
      window.removeEventListener("message", onMessage);
    };
  }, [useYouTube, youtubeId, playerHostId, start]);

  return (
    <div className={clsx("pointer-events-none absolute inset-0 overflow-hidden [container-type:size]", className)} aria-hidden>
      {useMp4 && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
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

      {useYouTube && (
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "max(100cqw, calc(100cqh * 16 / 9))",
            height: "max(100cqh, calc(100cqw * 9 / 16))",
            transform: "translate(-50%, -50%)",
          }}
        >
          <iframe
            id={playerHostId}
            className="h-full w-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&start=${start}&enablejsapi=1`}
            title=""
            tabIndex={-1}
            allow="autoplay; encrypted-media"
          />
        </div>
      )}

      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: useYouTube || playing ? 0 : 1 }}>
        <Image src={poster} alt={posterAlt} fill priority sizes="100vw" className={clsx("object-cover", posterClassName)} />
      </div>
    </div>
  );
}
