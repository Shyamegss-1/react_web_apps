import React, { useState } from "react";

import crypto from "crypto-js";

import {
  Box,
  Button,
  Card,
  CardMedia,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";
import { STATIC_DATA } from "../../../../constants/path-constant";
import { BannerUpdateService } from "../../../../services/apiServices/apiService";

const getHash = () => {
  const currentDate = new Date();

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = currentDate.toLocaleString("en-GB", options);

  console.log(formattedDate);

  return crypto.MD5(formattedDate).toString();
};

export default function Drawerc({
  open,
  setOpen,
  currentImage,
  type,
  opensnack,
}) {
  const [imageBlob, setImageBlob] = useState("");

  const [image, setImage] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);

  const imageChangeHandler = (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    const file = event.target.files[0];
    const localImageUrl = URL.createObjectURL(file);

    setImageBlob(localImageUrl);
    setImage(formData);
  };

  const uplaodHandler = () => {
    const hash = getHash();
    setIsSubmit(true);
    ImageUploadService(hash, image).then((e) => {
      if (e.status === 200) {
        BannerUpdateService({ ...currentImage, value: e.image }).then((e) => {
          if (e.status === 200) {
            setOpen(false);
            setImageBlob("");
            opensnack.onOpen();
            setIsSubmit(false);
          }
        });
      }
    });
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={() => {
        setOpen(false);
        setImageBlob("");
      }}
    >
      <Box sx={BoxCss}>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Edit {`slider(${type})`}
          </Typography>

          <Box my={4}>
            <Typography variant="subtitle1">Desktop Size</Typography>

            <Card sx={{ my: 2, position: "relative" }}>
              <CardMedia
                component="img"
                height="270"
                image={
                  imageBlob === ""
                    ? STATIC_DATA + currentImage.image
                    : imageBlob
                }
                alt="Paella dish"
              />

              <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                {imageBlob === "" && (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      type="file"
                      hidden
                      onChange={imageChangeHandler}
                      accept="image/*"
                    />
                    <Iconify icon="ic:outline-change-circle" color="white" />
                  </IconButton>
                )}

                {imageBlob !== "" && (
                  <IconButton
                    onClick={() => setImageBlob("")}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <Iconify icon="akar-icons:cross" color="white" />
                  </IconButton>
                )}
              </Box>
            </Card>
          </Box>
        </Box>

        <Stack sx={{ width: "100%" }} direction="row" spacing={1}>
          <Button
            onClick={() => uplaodHandler()}
            variant="contained"
            color="inherit"
            disabled={isSubmit || imageBlob === ""}
          >
            {isSubmit ? "updating" : "save"}
          </Button>

          <Button
            onClick={() => console.log(2)}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

const BoxCss = {
  px: 4,
  py: 3,
  width: "700px",
  height: "100vh",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const ImageUploadService = async (key, object) => {
  const e = await fetch(`https://themenskompany.com/api.php?api_key=${key}`, {
    method: "POST",
    body: object,
  });
  const e_1 = e.json();
  return e_1;
};
