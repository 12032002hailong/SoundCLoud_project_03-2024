import React from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
const DetailTrackPage = async (props: any) => {
  const { params } = props;

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
  });

  return (
    <Container>
      <WaveTrack track={res?.data ?? null} />
    </Container>
  );
};

export default DetailTrackPage;
