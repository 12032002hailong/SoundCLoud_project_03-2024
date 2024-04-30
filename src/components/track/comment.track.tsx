import * as React from "react";
import { TextField, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { fetchDefaultImages } from "@/utils/api";
import dayjs from "dayjs";

interface IProps {
  track: ITrackTop | null;
  comments: ITrackComment[];
}

const CommentTrack = (props: IProps) => {
  const { track, comments } = props;
  const [yourComments, setYourComments] = React.useState("");

  const handleSubmit = () => {
    console.log("hello");
  };

  return (
    <>
      <TextField
        value={yourComments}
        onChange={(e) => setYourComments(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        fullWidth
        id="standard-basic fullWidth"
        label="Comments"
        variant="standard"
        sx={{
          marginTop: 5,
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              alt=""
              style={{
                marginTop: "15px",
                height: 150,
                width: 150,
              }}
              src={fetchDefaultImages(track?.uploader?.type!)}
            />
            <h5
              style={{
                marginLeft: "15px",
              }}
            >
              {track?.uploader?.email}
            </h5>
          </Grid>
          <Grid item xs={8}>
            {comments.map((comments) => {
              return (
                <Box
                  key={comments._id}
                  sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "25px",
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      src={fetchDefaultImages(comments?.user?.type)}
                      alt=""
                      style={{ height: 40, width: 40 }}
                    />
                    <div>
                      <div style={{ fontSize: "13px" }}>
                        {comments?.user?.name}
                      </div>
                      <div>{comments.content}</div>
                    </div>
                  </Box>
                  <div style={{ fontSize: "12px", color: "#999" }}>
                    {dayjs(comments.createdAt).year()}
                  </div>
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CommentTrack;
