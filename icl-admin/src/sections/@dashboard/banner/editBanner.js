import { Helmet } from "react-helmet-async";
import React from "react";

// @mui

import {
  Grid,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import Iconify from "../../../components/iconify";

import { NavLink, useNavigate } from "react-router-dom";

import { HOMEBANNER } from "../../../constants/route-path";

import { IMG_PATH } from "../../../constants/path-constant";

import { HOMEBANNER as HOMEBANNERSERVICE } from "../../../services/apiServices/apiService";

export default function EditBanner() {
  const bannerItem = JSON.parse(sessionStorage.getItem("banner"));

  const Navigate = useNavigate();

  const [popup, setPopup] = React.useState(false);

  const [state, setState] = React.useState({
    id: null,
    banner: null,
    heading: null,
    tagline: null,
  });

  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    getBase64FromUrl(IMG_PATH + bannerItem.img).then((e) =>
      setState({
        id: bannerItem.id,
        heading: bannerItem.heading,
        tagline: bannerItem.subHeading,
        banner: e,
      })
    );
  }, []);

  const AddHandler = () => {
    if (
      state.heading == null ||
      state.heading == "" ||
      state.tagline == null ||
      state.tagline == ""
    ) {
      setIsValid(true);

      document.getElementById("sadasdsad").style.border = "2px solid red";
    } else {
      setIsValid(true);

      HOMEBANNERSERVICE({ method: "INSERT", ...state }).then((e) => {
        if (e.data.status == 200) {
          setPopup(true);
          setTimeout(() => {
            Navigate(HOMEBANNER);
          }, 1500);
        }
      });
    }
  };

  const bannerupdate = () => {
    HOMEBANNERSERVICE({
      method: "UPDATE",
      bId: Number(state.id),
      ...state,
    }).then((e) => {
      if (e.data.status == 200) {
        setPopup(true);
      }
    });
  };

  const updatehandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const deleteHandler = (id) => {
    HOMEBANNERSERVICE({ method: "DELETE", bId: id }).then((e) => {
      if (e.data.status == 200) {
        Navigate(HOMEBANNER);
      }
    });
  };

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
      setState({
        ...state,
        banner: response,
      });
    });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: BannerEdit | sessun </title>
      </Helmet>

      <Snackbar
        open={popup}
        autoHideDuration={6000}
        onClose={() => setPopup(false)}
        message={
          state.id ? "Banner Updated Sucessfully" : "Banner Added Sucessfully"
        }
        action={
          <Button onClick={() => setPopup(false)} color="secondary">
            close
          </Button>
        }
      />

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Edit Banner
          </Typography>
        </Stack>

        <Grid container spacing={5}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Card
              sx={{ boxShadow: (theme) => theme.shadows[15] }}
              id="sadasdsad"
            >
              <StyledCardMedia>
                <StyledCover
                  src={
                    state?.banner?.includes(".webp")
                      ? state.banner
                      : state?.banner?.includes("data:image")
                      ? state.banner
                      : state?.banner?.includes("text/html")
                      ? `${process.env.PUBLIC_URL}/assets/images/covers/add-2935429_960_720.jpg`
                      : `${process.env.PUBLIC_URL}/assets/images/covers/add-2935429_960_720.jpg`
                  }
                  alt={"pikachu"}
                />

                <StyledEditButton>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => pictureHandler(e)}
                    />

                    <Iconify
                      icon="material-symbols:flip-camera-ios"
                      width={25}
                      color={"#3c3c3c"}
                    />
                  </IconButton>
                </StyledEditButton>
              </StyledCardMedia>
            </Card>
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Card sx={{ boxShadow: (theme) => theme.shadows[15], p: 2 }}>
              <Stack spacing={2}>
                <TextField
                  name="heading"
                  label="Banner Heading"
                  onChange={(e) => updatehandler(e)}
                  value={state.heading}
                  InputLabelProps={{ shrink: true }}
                  error={
                    (isValid && state.heading == null) || state.heading == ""
                      ? true
                      : false
                  }
                  helperText={
                    isValid && state.heading == null
                      ? "This Field is Required *"
                      : ""
                  }
                />

                <TextField
                  name="tagline"
                  onChange={(e) => updatehandler(e)}
                  value={state.tagline}
                  label="Banner Tagline"
                  InputLabelProps={{ shrink: true }}
                  error={
                    (isValid && state.tagline == null) || state.tagline == ""
                      ? true
                      : false
                  }
                  helperText={
                    isValid && state.tagline == null
                      ? "This Field is Required *"
                      : ""
                  }
                />

                <Stack spacing={2} direction="row" pt={5}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={
                      state.id == null
                        ? () => AddHandler()
                        : () => bannerupdate()
                    }
                  >
                    Save
                  </Button>

                  <Button
                    size="large"
                    to={HOMEBANNER}
                    LinkComponent={NavLink}
                    variant="contained"
                  >
                    Cancel
                  </Button>

                  {state.id && (
                    <Button
                      onClick={() => deleteHandler(state.id)}
                      size="large"
                      color="error"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  objectFit: "cover",
});

const StyledCardMedia = styled("div")(({ theme }) => ({
  position: "relative",
}));

const StyledEditButton = styled("div")({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 111,
});

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
