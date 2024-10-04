import { Card, CardMedia, styled, IconButton } from "@mui/material";
import React from "react";
import Iconify from "../../../components/iconify";
import { IMG_PATH } from "../../../constants/path-constant";

const BlogCardMedia = ({ blogData, editData }) => {
  const StyledContainer = styled("div")(({ theme }) => ({
    position: "absolute",
    top: 20,
    right: 3,
  }));

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;

        resolve(baseURL);
      };
    });
  };

  const pictureHandler = (event) => {
    getBase64(event.target.files[0]).then((response) => {
      editData({
        ...blogData,
        post_img: response,
      });
    });
  };

  return (
    <>
      <Card sx={{ width: "100%", position: "relative" }} id="isudsdui">
        <CardMedia
          component="img"
          id="post_img"
          image={
            blogData.post_img
              ? blogData.post_img
              : `${process.env.PUBLIC_URL}/assets/images/covers/add-2935429_960_720.jpg`
          }
        />

        <StyledContainer>
          <IconButton
            color="secondary"
            size="small"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              onChange={(e) => pictureHandler(e)}
              accept="image/*"
              type="file"
            />
            <Iconify
              icon={"material-symbols:flip-camera-ios-outline"}
              width={30}
            />
          </IconButton>
        </StyledContainer>
      </Card>
    </>
  );
};

export default BlogCardMedia;
