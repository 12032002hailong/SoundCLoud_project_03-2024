"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const MainSlider = () => {
  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
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
          position: "absolute",
          top: "50%",
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
  return (
    <Box
      sx={{
        margin: "0 50px",
        ".abc": {
          padding: "0 10px",
        },
        h3: {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px",
        },
      }}
    >
      <h2>Multiple tracks</h2>
      <Slider {...settings}>
        <div className="abc">
          <h3>1</h3>
        </div>
        <div className="abc">
          <h3>2</h3>
        </div>
        <div className="abc">
          <h3>3</h3>
        </div>
        <div className="abc">
          <h3>4</h3>
        </div>
        <div className="abc">
          <h3>5</h3>
        </div>
        <div className="abc">
          <h3>6</h3>
        </div>
        <div className="abc">
          <h3>7</h3>
        </div>
        <div className="abc">
          <h3>8</h3>
        </div>
        <div className="abc">
          <h3>9</h3>
        </div>
        <div className="abc">
          <h3>10</h3>
        </div>
        <div className="abc">
          <h3>11</h3>
        </div>
        <div className="abc">
          <h3>12</h3>
        </div>
      </Slider>
      <Divider />
    </Box>
  );
};

export default MainSlider;
