"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface IProps {
  data: ITrackTop[];
  title: String;
}

const MainSlider = (props: IProps) => {
  const { data, title } = props;

  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: -15,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };
  const PreArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          left: -15,
          position: "absolute",
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreArrow />,
  };
  console.log(data);
  return (
    <Box
      sx={{
        margin: "0 25px",
        a: {
          textDecoration: "none",
          color: "#2F4F4F",
        },
      }}
    >
      <h2>Multiple tracks</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {data.map((track) => {
            return (
              <Card
                sx={{
                  display: "flex",
                  padding: "0 10px",
                  justifyContent: "space-between",
                  gap: "20px",
                  boxSizing: "border-box",
                  borderRadius: "5px",
                }}
              >
                <Link
                  href={`/track/${track._id}?audio=${track.trackUrl}&id={track._id}`}
                >
                  <CardMedia
                    sx={{ height: 200 }}
                    image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                    title={track.title}
                  />
                </Link>

                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      height: "40px",
                      wordWrap: "normal",
                    }}
                  >
                    {track.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      maxHeight: "100px",
                      height: "100%",
                      wordWrap: "normal",
                    }}
                  >
                    {track.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Slider>
      </div>

      <Divider />
    </Box>
  );
};

export default MainSlider;
