"use client";
import { useWavesurfer } from "@/utils/customHook";
import { Button, Container, Tooltip, colors } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./wave.scss";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { fetchDefaultImages, sendRequest } from "@/utils/api";
import { useTrackContext } from "@/lib/track.wrapper";
import CommentTrack from "./comment.track";
import LikeTrack from "./like.track";
import Image from "next/image";

interface IProps {
  track: ITrackTop | null;
  comments: ITrackComment[];
}
const WaveTrack = (props: IProps) => {
  const { track, comments } = props;

  const firstViewRef = useRef(true);

  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("0:00");
  const [duration, setDuration] = useState<string>("0:00");
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const router = useRouter();

  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    let gradient;
    let progressGradient;

    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#656666"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1"
      ); // Bottom color
      gradient.addColorStop(1, "#B1B1B1");

      progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient.addColorStop(0, "#EE772F"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926"
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094"
      ); // Bottom color
      progressGradient.addColorStop(1, "#F6B094");
    }
    return {
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 3,
      height: 100,
      url: `/api?audio=${fileName}`,
    };
  }, []);

  const wavesurfer = useWavesurfer(containerRef, optionsMemo);
  const [isPlaying, setIsPlaying] = useState(false);

  const [trackInfo, setTrackInfo] = useState<ITrackTop | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    if (!wavesurfer) return;
    setIsPlaying(false);

    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`)
    );

    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`)
    );

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("decode", (duration) => {
        setDuration(formatTime(duration));
      }),
      wavesurfer.on("timeupdate", (currentTime) => {
        setTime(formatTime(currentTime));
      }),
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${track?._id}`,
        method: "GET",
      });
      if (res && res.data) {
        setTrackInfo(res.data);
      }
    };
    fetchData();
  }, [track?._id]);



  const calLeft = (moment: number) => {
    const hardCodeDuration = 199;
    const percent = (moment / hardCodeDuration) * 100;
    return `${percent}%`;
  };

  useEffect(() => {
    if (wavesurfer && currentTrack.isPlaying) {
      wavesurfer.pause();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (track?._id && !currentTrack?._id) {
      setCurrentTrack({ ...track, isPlaying: false });
    }
  }, [track]);

  const handleIncreaseView = async () => {
    if (firstViewRef.current) {
      await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/increase-view`,
        method: "POST",
        body: {
          trackId: track?._id
        }
      });
      router.refresh();
      firstViewRef.current = false;
    }
  };

  console.log("current track", currentTrack)

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          gap: 15,
          padding: 20,
          height: 400,
          background:
            "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11,15,20) 100%)",
        }}
      >
        <div
          className="left"
          style={{
            width: "75%",
            height: "calc(100%-10px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            className="info"
            style={{
              display: "flex",
            }}
          >
            <div
              onClick={() => {
                handleIncreaseView()
                onPlayClick();
                if (track && wavesurfer) {
                  setCurrentTrack({ ...currentTrack, isPlaying: false });
                }
              }}
              style={{
                borderRadius: "50%",
                background: "#f50",
                height: "50px",
                width: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {isPlaying === true ? (
                <PauseIcon sx={{ fontSize: 30, color: "white" }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 30, color: "white" }} />
              )}
            </div>
            <div style={{ marginLeft: 20 }}>
              <div
                style={{
                  padding: "0 5px",
                  background: "#333",
                  fontSize: 30,
                  width: "fit-content",
                  color: "white",
                }}
              >
                {track?.title}
              </div>
              <div
                style={{
                  padding: "0 5px",
                  marginTop: 10,
                  background: "#333",
                  fontSize: 20,
                  width: "fit-content",
                  color: "white",
                }}
              >
                {track?.description}
              </div>
            </div>
          </div>

          <div ref={containerRef} className="wave-form-container">
            <div className="time">{time}</div>
            <div className="duration">{duration}</div>
            <div ref={hoverRef} className="hover-wave"></div>
            <div
              className="overlay"
              style={{
                position: "absolute",
                height: "30px",
                width: "100%",
                bottom: "0",
                backdropFilter: "brightness(0.5)",
              }}
            ></div>
            <div className="comments" style={{ position: "relative" }}>
              {comments.map((item) => {
                return (
                  <Tooltip title={item?.content} arrow key={item?._id}>
                    <Image
                      onPointerMove={(e) => {
                        const hover = hoverRef.current!;
                        hover.style.width = calLeft(item?.moment);
                      }}
                      key={item?._id}
                      alt="comment image"
                      height={20}
                      width={20}
                      style={{
                        position: "absolute",
                        top: "71px",
                        zIndex: 20,
                        left: calLeft(item.moment),
                      }}
                      src={fetchDefaultImages(item?.user?.type)}
                    />
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{
            width: "25%",
            gap: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {track?.imgUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
              alt="avatar image"
              width={250}
              height={250}
              style={{
                maxWidth: "250px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ddd",
                padding: "5px",
              }}
            />
          ) : (
            <div
              style={{
                background: "#ccc",
                height: "250px",
                maxWidth: "250px",
                width: "100%",
              }}
            ></div>
          )}
        </div>
      </div>
      <div>
        <LikeTrack track={track} />
      </div>

      <div>
        <CommentTrack
          comments={comments}
          track={track}
          wavesurfer={wavesurfer}
        />
      </div>
    </div>
  );
};

export default WaveTrack;
