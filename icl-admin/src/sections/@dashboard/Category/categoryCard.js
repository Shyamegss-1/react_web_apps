import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// @mui
import { Box, Card, Link, Typography, Stack, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { PRODUCTEDIT } from "../../../constants/route-path";
import { IMG_PATH } from "../../../constants/path-constant";
import Iconify from "../../../components/iconify/Iconify";
// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  category: PropTypes.object,
};

export default function CategoryCard({ category }) {
  const Navigate = useNavigate();

  //   const navigationHandler = (va) => {
  //     Navigate({
  //       pathname: PRODUCTEDIT,
  //       search: `?edit=${va}&id=6261d5528b8faa759c446e6294e0e48c`,
  //     });
  //   };

  return (
    <Card sx={{ border: "1px solid #C5942C" }}>
      <Box sx={{ pt: "90%", position: "relative" }}>
        <StyledProductImg
          alt={"picture"}
          src={
            "https://ikshitachoudhary.com/upload/category/63411a83bfc0b_suit.png"
          }
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            Category
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2">1/2/2022</Typography>

          <Stack direction="row" justifyContent="flex-end">
            <IconButton size="small" color="primary">
              <Iconify color="#C5942C" icon={"material-symbols:edit"} />{" "}
            </IconButton>

            <IconButton size="small" color="error">
              <Iconify
                color="#C5942C"
                icon={"material-symbols:delete-outline-rounded"}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
