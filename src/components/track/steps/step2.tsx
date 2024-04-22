import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FileWithPath, useDropzone } from "react-dropzone";
import "./theme.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Grid, MenuItem, TextField } from "@mui/material";

interface IProps {
  trackUpload: {
    fileName: string;
    percent: number;
  };
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel(props: IProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={props.trackUpload.percent} />
    </Box>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload() {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

const Step2 = (props: IProps) => {
  const { trackUpload } = props;
  console.log(">>>check props", trackUpload);
  const category = [
    { value: "CHILL", label: "CHILL" },
    { value: "WORKOUT", label: "WORKOUT" },
    { value: "PARTY", label: "PARTY" },
  ];

  return (
    <div>
      <div>
        <h2>{trackUpload.fileName}</h2>
        <LinearWithValueLabel trackUpload={trackUpload} />
      </div>
      <Grid container spacing={2} mt={5}>
        <Grid
          item
          xs={6}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ height: 250, width: 250, background: "#ccc" }}>
            <p>Image preview</p>
          </div>
          <div>
            <InputFileUpload />
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            margin="dense"
          />
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            margin="dense"
          />
          <TextField
            sx={{ mt: 3 }}
            id="standard-basic"
            label="Category"
            variant="standard"
            margin="dense"
            select
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" sx={{ mt: 5, width: "25px" }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step2;
