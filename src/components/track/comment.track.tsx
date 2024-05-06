import * as React from "react";
import { TextField, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { fetchDefaultImages, sendRequest } from "@/utils/api";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useHasMounted, useWavesurfer } from "@/utils/customHook";
import { useRouter } from "next/navigation";

interface IProps {
  track: ITrackTop | null;
  comments: ITrackComment[];
  wavesurfer: any;
}

const CommentTrack = (props: IProps) => {
  const { track, comments, wavesurfer } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasMounted = useHasMounted();

  const [yourComments, setYourComments] = React.useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);

    return `${minutes} : ${paddedSeconds}`;
  };

  const handleSubmit = async () => {
    const res = await sendRequest<IBackendRes<ITrackComment>>({
      url: `http://localhost:8000/api/v1/comments`,
      method: "POST",
      body: {
        content: yourComments,
        moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
        track: track?._id,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res.data) {
      setYourComments("");
    }
    router.refresh();

  };

  const handleJumpTrack = (moment: number) => {
    if (wavesurfer) {
      const duration = wavesurfer.getDuration();
      wavesurfer.seekTo(moment / duration);
      wavesurfer.play();
    }
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
                    marginTop: "15px",
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
                        {comments?.user?.name ?? comments?.user?.email} and
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleJumpTrack(comments.moment)}
                        >
                          &nbsp; {formatTime(comments.moment)}
                        </span>
                      </div>
                      <div>{comments.content}</div>
                    </div>
                  </Box>
                  <div style={{ fontSize: "12px", color: "#999" }}>
                    {hasMounted && dayjs(comments.createdAt).year()}
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
