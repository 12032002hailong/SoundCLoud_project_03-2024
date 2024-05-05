import * as React from "react";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
interface IProps {
  track: ITrackTop | null;
}

const LikeTrack = (props: IProps) => {
  const { track } = props;
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Chip icon={<FavoriteIcon />} label="Like" variant="outlined" />
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
          <div
            className="likeCount"
            style={{
              display: "flex",
              color: "#777777",
            }}
          >
            <FavoriteIcon />
            {track?.countLike}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikeTrack;
