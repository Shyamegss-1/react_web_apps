import { Box, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";

export default function ImageBox({ setImage, setBlob }) {
  const fileInputRef = useRef(null);
  let y = import.meta.env.MODE;
  const T = y === "development" ? "" : "/ad-min";

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const imageHandler = (event) => {
    const image = event.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const Blob = URL.createObjectURL(image);

    setBlob(Blob);
    setImage(formData);
  };

  return (
    <Box onClick={handleClick}>
      <input
        type="file"
        onChange={(e) => imageHandler(e)}
        ref={fileInputRef}
        hidden
        accept="image/*"
      />

      <Stack gap={5} justifyContent="center" alignItems="center">
        <Box
          sx={{ width: "100%", height: "100%", maxWidth: "200px" }}
          style={{ cursor: "pointer" }}
        >
          <img src={T + "/image-up.svg"} alt="upload" />
        </Box>

        <Stack gap={1} justifyContent="center" alignItems="center">
          <Typography variant="h5">Select File</Typography>
          <Typography variant="body2" color="GrayText">
            Click here to select file from your machine
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
