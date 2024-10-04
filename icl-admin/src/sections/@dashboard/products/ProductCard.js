import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { PRODUCTEDIT } from "../../../constants/route-path";
import { IMG_PATH } from "../../../constants/path-constant";
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
  const Navigate = useNavigate();

  const { name, is_Sale, price, image, saleprice, img1 } = product;

  const navigationHandler = (va) => {
    Navigate({
      pathname: PRODUCTEDIT,
      search: `?edit=${va}&id=6261d5528b8faa759c446e6294e0e48c`,
    });
  };

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {is_Sale && (
          <Label
            variant="filled"
            color={(is_Sale == 1 && "error") || "info"}
            sx={{
              display: is_Sale == 1 ? "" : "none",
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {is_Sale == 1 ? "Sale" : " "}
          </Label>
        )}
        <StyledProductImg
          alt={name}
          src={"https://ikshitachoudhary.com/" + image}
        />
      </Box>

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
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {is_Sale == 1 && fCurrency(saleprice)}
            </Typography>
            &nbsp; ₹ {fCurrency(price)}
          </Typography>

          {/* <Typography
            onClick={() => navigationHandler(id)}
            sx={{ cursor: "pointer" }}
            variant="subtitle2"
            color="text.secondary"
          >
            Edit
          </Typography> */}
        </Stack>
      </Stack>
    </Card>
  );
}
