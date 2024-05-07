"use client";
import React, { useContext, useEffect, useRef } from "react";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHasMounted } from "@/utils/customHook";
import { useTrackContext } from "@/lib/track.wrapper";

const AppFooter = () => {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const hasMounted = useHasMounted();
  const playerRef = useRef(null);


  useEffect(() => {
    if (currentTrack?.isPlaying === false) {
      //@ts-ignore
      playerRef?.current?.audio?.current?.pause();
    }
    if (currentTrack?.isPlaying === true) {
      //@ts-ignore
      playerRef?.current?.audio?.current?.play();
    }
  }, [currentTrack?.isPlaying]);

  if (!hasMounted) return <></>;
  return (
    <>
      {currentTrack._id && (
        <div
          style={{
            marginTop: "50px",
          }}
        >
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
              disableGutters
              sx={{
                display: "flex",
                gap: 10,
                justifyContent: "space-between",
                width: "100%",
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
                  minWidth: "220px",
                }}
              >
                <div
                  style={{
                    color: "#ccc",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentTrack.description}
                </div>
                <div
                  style={{
                    color: "black",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentTrack.title}
                </div>
              </div>
            </Container>
          </AppBar>
        </div>
      )}
    </>
  );
};

export default AppFooter;
