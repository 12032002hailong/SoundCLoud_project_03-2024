import * as React from "react";
import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
interface IProps {
  track: ITrackTop | null;
}

const LikeTrack = (props: IProps) => {
  const { track } = props;

  const { data: session } = useSession();
  const router = useRouter();

  const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null);

  const fetchData = async () => {
    if (session?.access_token) {
      const res2 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        method: "GET",
        queryParams: {
          current: 1,
          pageSize: 100,
          sort: "-createdAt",
        },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (res2?.data?.result) {
        setTrackLikes(res2?.data?.result);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [session]);

  const handleLikeTrack = async () => {
    await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
      method: "POST",
      body: {
        track: track?._id,
        quantity: trackLikes?.some(t => t._id === track?._id) ? -1 : 1,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    fetchData();
    router.refresh();
  };

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Chip
        onClick={() => handleLikeTrack()}
        icon={<FavoriteIcon />}
        label="Like"
        variant="outlined"
        color={
          trackLikes?.some((t) => t._id === track?._id) ? "error" : "default"
        }
      />
      <div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
        <div
          className="playCount"
          style={{
            display: "flex",
            color: "#777777",
          }}
        >
          <PlayArrowIcon />
          {track?.countPlay}
        </div>
        <span
          className="likeCount"
          style={{
            display: "flex",
            color: "#777777",
          }}
        >
          <FavoriteIcon />
          {track?.countLike}
        </span>
      </div>
    </div>
  );
};

export default LikeTrack;
