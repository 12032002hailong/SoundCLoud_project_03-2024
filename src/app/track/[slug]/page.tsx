"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
const DetailTrackPage = (props: any) => {
  const { params } = props;
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  return (
    <>
      <div>DetailTrackPage</div>
      <WaveTrack />
    </>
  );
};

export default DetailTrackPage;
