import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import BannerCard from "./bannerCard";
import useLightBox from "../../../../components/lightbox/use-light-box";
import Lightbox from "../../../../components/lightbox/ligthbox";
import { STATIC_DATA } from "../../../../constants/path-constant";

export default function DesktopBannerList({
  slider,
  openhandler,
  setCurrentImage,
}) {
  const desktop = slider.map((slide) => ({
    src: STATIC_DATA + slide.path,
  }));

  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(desktop);

  return (
    <>
      <Grid container spacing={3}>
        {slider.length > 0 ? (
          <>
            {slider.map((e, i) => (
              <Grid key={i} item md={3.5} sm={5} xs={12}>
                <BannerCard
                  setCurrentImage={setCurrentImage}
                  handleOpenLightbox={handleOpenLightbox}
                  post={e}
                  openhandler={() => openhandler("desktop")}
                />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {[...Array(6)].map((_, e) => (
              <Grid key={e} item md={3.5} sm={5} xs={12}>
                <Box>
                  <Skeleton
                    sx={{
                      transform: "none",
                      transformOrigin: "0",
                    }}
                    animation="wave"
                    height={200}
                  />
                </Box>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <Lightbox
        index={selectedImage}
        slides={desktop}
        open={openLightbox}
        close={handleCloseLightbox}
      />
    </>
  );
}
