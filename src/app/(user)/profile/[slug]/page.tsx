import { sendRequest } from "@/utils/api";
import React from "react";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const tracks = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10",
    method: "POST",
    body: { id: params.slug },
  });

  return (
    <>
      <div>ProfilePage {params.slug}</div>
    </>
  );
};

export default ProfilePage;
