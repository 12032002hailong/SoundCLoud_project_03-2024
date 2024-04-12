import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  //get session
  const session = await getServerSession(authOptions);

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "CHILL", limit: "10" },
  });
  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "WORKOUT", limit: "10" },
  });
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "PARTY", limit: "10" },
  });

  return (
    <Container>
      <MainSlider data={chills?.data ?? []} title={"Top Chill"} />
      <MainSlider data={workouts?.data ?? []} title={"Top Workout"} />
      <MainSlider data={party?.data ?? []} title={"Top Party"} />
    </Container>
  );
}
