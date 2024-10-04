import { Card, Grid, Typography } from "@mui/material";
import React from "react";

import { styled, alpha } from "@mui/material/styles";

import Iconify from "../../../components/iconify";
import { NavLink, useNavigate } from "react-router-dom";
import { EDITHOMEBANNER } from "../../../constants/route-path";
import { IMG_PATH } from "../../../constants/path-constant";

const BannerCard = ({ data }) => {
  const Navigate = useNavigate();

  const setBannerDetail = (id, img, heading, subHeading) => {
    sessionStorage.setItem(
      "banner",
      JSON.stringify({
        id: id,
        img: img,
        heading: heading,
        subHeading: subHeading,
      })
    );

    Navigate(EDITHOMEBANNER);
  };

  return (
    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} key={data.id}>
      <Card
        sx={{ position: "relative", boxShadow: (theme) => theme.shadows[10] }}
      >
        <StyledCardMedia
          sx={{
            "&:after": {
              top: 0,
              content: "''",
              width: "100%",
              height: "100%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.42),
            },
          }}
        >
          <StyledCover
            loading="lazy"
            alt={"postimagesi"}
            src={
              data.banner
                ? IMG_PATH + data.banner
                : `${process.env.PUBLIC_URL}/assets/images/covers/cover_1.png`
            }
          />

          <StyledEditButton>
            <Iconify
              onClick={() =>
                setBannerDetail(
                  data.id,
                  data.banner,
                  data.heading,
                  data.tagline
                )
              }
              icon="ant-design:setting-filled"
              width={25}
              color={"white"}
            />
          </StyledEditButton>

          <StyledCardContent>
            <Typography variant="h3" color="white" noWrap>
              {data.heading}
            </Typography>

            <Typography
              variant="inherit"
              color="white"
              noWrap
              sx={{ opacity: 0.72 }}
            >
              {data.tagline}
            </Typography>
          </StyledCardContent>
        </StyledCardMedia>
      </Card>
    </Grid>
  );
};

export default BannerCard;

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  objectFit: "cover",
  transition: "0.5s ease-in-out",
});

const StyledCardMedia = styled("div")(({ theme }) => ({
  position: "relative",
  "&:hover img": {
    transform: "scale(1.1)",
  },
  cursor: "pointer",
}));

const StyledCardContent = styled("div")({
  position: "absolute",
  bottom: 10,
  left: 20,
  zIndex: 111,
});

const StyledEditButton = styled("div")({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 111,
});
