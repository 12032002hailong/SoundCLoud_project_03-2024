"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTrackContext } from "@/lib/track.wrapper";
import PauseIcon from "@mui/icons-material/Pause";

const ProfileTracks = (props: any) => {
  const { data } = props;
  const theme = useTheme();
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ xs: 3, sm: 2, md: 3 }}
      sx={{
        display: "flex",
      }}
    >
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {data.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {data.description}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>

              {(data._id !== currentTrack._id ||
                data._id === currentTrack._id &&
                currentTrack.isPlaying === false) && (
                  <IconButton
                    aria-label="play/pause"
                    onClick={(e) =>
                      setCurrentTrack({ ...data, isPlaying: true })
                    }
                  >
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                )}

              {data._id === currentTrack._id &&
                currentTrack.isPlaying === true && (
                  <IconButton
                    aria-label="play/pause"
                    onClick={(e) =>
                      setCurrentTrack({ ...data, isPlaying: false })
                    }
                  >
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                )}

              <IconButton aria-label="next">
                {theme.direction === "rtl" ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
            alt="Live from space album cover"
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileTracks;
