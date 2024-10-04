import PropTypes from "prop-types";
// @mui
import { Box, Card, Grid, Skeleton } from "@mui/material";
import ShopProductCard from "./ProductCard";

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      <>
        {products.length > 0 ? (
          <>
            {products?.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={3}>
                <ShopProductCard product={product} />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {[...Array(12)].map((_, e) => (
              <Grid item key={e} xs={12} sm={6} md={3}>
                <Box>
                  <Skeleton
                    sx={{
                      transform: "none",
                      transformOrigin: "0",
                    }}
                    animation="wave"
                    height={300}
                  />
                </Box>
              </Grid>
            ))}
          </>
        )}
      </>
    </Grid>
  );
}
