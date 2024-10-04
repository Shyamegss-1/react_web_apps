import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { PDC_IMAGE } from "../../../constants/path-constant";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, price, image } = product;

  return (
    <Card>
      <CardActionArea>
        <Box sx={{ pt: "100%", position: "relative" }}>
          <StyledProductImg lazyloading alt={name} src={PDC_IMAGE + image} />
        </Box>
      </CardActionArea>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">₹ {fCurrency(price)}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
