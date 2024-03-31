"use client";
import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveTrack = () => {
  useEffect(() => {
    const element = document.getElementById("waveTrack");
    if (element) {
      const wavesurfer = WaveSurfer.create({
        container: element,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        url: "/audio/PARTY.mp3",
      });
    }
  }, []);

  return (
    <>
      <div id="waveTrack">WaveTrack</div>
    </>
  );
};

export default WaveTrack;
