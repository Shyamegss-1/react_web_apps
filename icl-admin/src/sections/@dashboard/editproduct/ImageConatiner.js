import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import Index from "../../../components/productPictureConatiner";
import { IMG_PATH } from "../../../constants/path-constant";
import { PRODUCTEDITSERVICE } from "../../../services/apiServices/apiService";

const ImageConatiner = ({ pImages, setpImages, Edit }) => {
  const [image, setImage] = React.useState([]);

  const onDrop = async (acceptedFiles) => {
    let array = [];
    for (let i = 0; i < acceptedFiles.length; i++) {
      array.push(fileToDataUri(acceptedFiles[i]));
    }

    const newImages = await Promise.all(array);
    setImage([...image, ...newImages]);
    setpImages([...pImages, ...newImages]);
  };

  const removeImageHandler = (value) => {
    let array = pImages;
    let newArray = array.filter(function (item) {
      return item !== value;
    });
    setImage(newArray);
    setpImages(newArray);
  };

  React.useEffect(() => {
    if (Edit != null) {
      PRODUCTEDITSERVICE({ method: "IMAGES", bId: Edit }).then(async (e) => {
        let array = [];

        Object.values(e.data[0]).forEach((val) => {
          if (val?.includes("webp")) {
            array.push(getBase64FromUrl(IMG_PATH + val));
          }
        });
        let data = await Promise.all(array);

        setpImages(data);

        setImage(data);
      });
    }
  }, []);

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <Paper
            component="div"
            sx={{
              marginTop: "10px",
              border: "1px dashed rgb(87 87 87 / 32%)",
              background: "rgb(244, 246, 248)",
              p: 5,
              position: "relative",
            }}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <img
                src={`${process.env.PUBLIC_URL}/assets/share.svg`}
                alt="Drag 'n' drop  files here, or click to select files"
              />
            </div>

            <Typography
              variant="inherit"
              noWrap
              sx={{
                opacity: "0.76",
                top: "90%",
                fontWeight: 500,
                right: "4%",
                position: "absolute",
                fontSize: "13px",
              }}
            >
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </Paper>
        )}
      </Dropzone>

      <Stack mt={2} direction="row" flexWrap={"wrap"}>
        {image.map((index) => (
          <Index remove={removeImageHandler} key={index} index={index} />
        ))}
      </Stack>
    </div>
  );
};

export default ImageConatiner;

const fileToDataUri = (image) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      baseURL = reader.result;

      resolve(baseURL);
    };
  });
};

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
