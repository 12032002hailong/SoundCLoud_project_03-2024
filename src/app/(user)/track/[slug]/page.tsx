"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
const DetailTrackPage = (props: any) => {
  const { params } = props;
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  return (
    <Container>
      <WaveTrack />
    </Container>
  );
};

export default DetailTrackPage;
