"use client";
import { useWavesurfer } from "@/utils/customHook";
import { Button, Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WaveSurferOptions } from "wavesurfer.js";

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null);

  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      barWidth: 2,
      url: `/api?audio=${fileName}`,
    };
  }, []);

  const wavesurfer = useWavesurfer(containerRef, optionsMemo);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!wavesurfer) return;
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
      // setIsPlaying(wavesurfer.isPlaying());
    }
  }, [wavesurfer]);

  return (
    <Container>
      <div ref={containerRef}>WaveTrack</div>
      <Button onClick={onPlayClick}>
        {wavesurfer?.isPlaying() === true ? "Pause" : "Play"}
      </Button>
    </Container>
  );
};

export default WaveTrack;
