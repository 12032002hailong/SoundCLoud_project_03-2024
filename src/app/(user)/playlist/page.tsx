import AppHeader from "@/components/header/app.header";
import React from "react";

const PlaylistPage = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))

  return <>PlayList Page</>;
};

export default PlaylistPage;
