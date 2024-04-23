"use client";
import React, { useContext, useRef } from "react";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHasMounted } from "@/utils/customHook";
import {  useTrackContext } from "@/lib/track.wrapper";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const playerRef = useRef(null);
  if (!hasMounted) return <></>;
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  if (currentTrack?.isPlaying) {
    //@ts-ignore
    playerRef?.current?.audio?.current?.play();
  } else {
    //@ts-ignore
    playerRef?.current?.audio?.current?.pause();
  }
  return (
    <div style={{ marginTop: "50px" }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: "auto",
          bottom: 0,
          background: "#f2f2f2",
        }}
      >
        <Container
          sx={{
            display: "flex",
            gap: 10,
            ".gap_main": {
              gap: "30px",
            },
          }}
        >
          <AudioPlayer
            ref={playerRef}
            layout="horizontal-reverse"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
            volume={0.5}
            style={{
              boxShadow: "unset",
              background: "#f2f2f2",
            }}
            onPlay={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: true });
            }}
            onPause={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: false });
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              minWidth: 100,
            }}
          >
            <div style={{ color: "#ccc" }}>WangJu</div>
            <div style={{ color: "black" }}>Music name</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppFooter;
