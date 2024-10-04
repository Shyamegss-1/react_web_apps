import React, { useEffect, useState } from "react";

import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";

import Drawerc from "../../../sections/@content-management/$homeBanner/drawer";
import { contentBannerService } from "../../../../services/apiServices/apiService";
import ProductBanner from "../../../sections/@content-management/$homeBanner/productBanner";

import MobileBannerList from "../../../sections/@content-management/$homeBanner/mobileBannerList";
import DesktopBannerList from "../../../sections/@content-management/$homeBanner/desktopBannerList";
import { CustomSnackbar } from "../../../../components/custom-snackBar/customSnackbar";
import useSnackbar from "../../../../components/custom-snackBar/use-snackbar";
import { STATIC_DATA } from "../../../../constants/path-constant";
import useLightBox from "../../../../components/lightbox/use-light-box";
import Lightbox from "../../../../components/lightbox/ligthbox";

export default function Index() {
  const [open, setOpen] = useState(false);

  const [slider, setSlider] = useState([]);

  const [upper, setUpper] = useState([]);

  const [mobileSlider, setMobileSlider] = useState([]);

  const [editType, setTypeEdit] = useState("");

  const snackbar = useSnackbar();

  const [currentImage, setCurrentImage] = useState({
    image: "",
    id: "",
  });

  const openhandler = (type) => {
    setOpen(true);

    setTypeEdit(type);
  };

  useEffect(() => {
    contentBannerService().then((e) => {
      let data = e.data.data;
      let slid = data.filter((e) => e.type === "slider");
      let uppSlider = data.filter((e) => e.type === "upper");
      let uomwbole = data.filter((e) => e.type === "mobileslider");

      setUpper(uppSlider);
      setSlider(slid);
      setMobileSlider(uomwbole);
    });
  }, []);

  const product = upper.map((slide) => ({
    src: STATIC_DATA + slide.path,
  }));

  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(product);

  return (
    <Container>
      <Box>
        <Typography mb={3} variant="h4" gutterBottom>
          Slider (Desktop)
        </Typography>

        <DesktopBannerList
          setCurrentImage={setCurrentImage}
          slider={slider}
          openhandler={openhandler}
        />
      </Box>

      <Box>
        <Typography my={4} variant="h4" gutterBottom>
          Slider (Mobile)
        </Typography>

        <MobileBannerList
          setCurrentImage={setCurrentImage}
          slider={mobileSlider}
          openhandler={openhandler}
        />
      </Box>

      <Box>
        <Typography my={4} variant="h4" gutterBottom>
          Product Banner
        </Typography>

        <Grid container spacing={3}>
          {upper.length > 0 ? (
            <>
              {upper.map((e, i) => (
                <Grid key={i} item md={3.5} sm={5} xs={12}>
                  <ProductBanner
                    id={e.id}
                    path={e.path}
                    setCurrentImage={setCurrentImage}
                    slider={slider}
                    handleOpenLightbox={handleOpenLightbox}
                    openhandler={openhandler}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {[...Array(2)].map((_, e) => (
                <Grid key={e} item md={3.5} sm={5} xs={12}>
                  <Box>
                    <Skeleton
                      sx={{
                        transform: "none",
                        transformOrigin: "0",
                      }}
                      animation="wave"
                      height={500}
                    />
                  </Box>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        onClose={snackbar.onClose}
        message={"Image updated succesfully"}
      />

      <Drawerc
        opensnack={snackbar}
        open={open}
        setOpen={setOpen}
        type={editType}
        setCurrentImage={setCurrentImage}
        currentImage={currentImage}
      />

      <Lightbox
        index={selectedImage}
        slides={product}
        open={openLightbox}
        close={handleCloseLightbox}
      />
    </Container>
  );
}
