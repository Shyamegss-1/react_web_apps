import {
  Card,
  styled,
  Stack,
  TextField,
  Typography,
  Grid,
  IconButton,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import React from "react";
import Iconify from "../../../components/iconify/Iconify";
import { PRODUCTVARIANT } from "../../../services/apiServices/apiService";

const ProductVariant = ({ productId, Edit }) => {
  const [data, seData] = React.useState({
    id: null,
    color: null,
    productId: Edit != null ? Edit : productId,
    colorName: null,
    size: [],
    images: [],
  });

  const [state, setstate] = React.useState({
    id: 1 + data.size.length,
    name: "",
    inStock: true,
  });

  const stockhandler = (val) => {
    let arr = data?.size.map((e) =>
      e.id == val ? { ...e, inStock: !e.inStock } : { ...e, inStock: e.inStock }
    );
    seData({ ...data, size: arr });
  };

  const deleteHandler = (val) => {
    let arr = data?.size.filter((e) => e.id !== val);

    seData({ ...data, size: arr });
  };

  const updateHandler = (e) => {
    seData({ ...data, [e.target.name]: e.target.value });
  };

  const addSizeHandler = () => {
    let size = data?.size;

    size.push(state);

    seData({ ...data, size: size });
    setstate({
      ...state,
      name: "",
    });
    document.getElementById("joker").value = "";
  };

  const variantHandler = () => {
    PRODUCTVARIANT({
      method: "INSERT",
      color: data.color,
      productId: data.productId || productId,
      colorName: data.colorName,
      size: JSON.stringify({
        size: data.size,
      }),
      images: data.images,
    }).then((e) => {
      if (e.data.status == 200) {
        alert("varient added successfully");
      }
    });
  };

  return (
    <Card
      sx={{ padding: 4, width: "70%", boxShadow: (theme) => theme.shadows[9] }}
    >
      <Stack spacing={2} direction="row">
        <StyledContainer>
          <Typography gutterBottom variant="button" color="gray">
            color
          </Typography>

          <TextField
            type="color"
            name="color"
            onChange={(e) => updateHandler(e)}
            fullWidth
            size="medium"
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            onChange={(e) => updateHandler(e)}
            name="colorName"
            label="color name"
            size="medium"
          />

          <Stack mt={3} spacing={2} direction="row">
            <Button
              onClick={() => variantHandler()}
              variant="contained"
              size="large"
            >
              Add
            </Button>

            <Button variant="contained" size="large">
              Cancel
            </Button>

            <Button variant="contained" color="error" size="large">
              Delete
            </Button>
          </Stack>
        </StyledContainer>

        <StyledContainer>
          <Typography variant="button" color="gray">
            size
          </Typography>

          <Stack spacing={2} mt={1} direction="column">
            {data?.size.map((e) => (
              <StyledCard key={e.id}>
                <Grid item width={90}>
                  {e.name}
                </Grid>

                <Grid item container justifyContent="space-between" width={130}>
                  <IconButton
                    size="small"
                    onClick={() => deleteHandler(e.id)}
                    color="error"
                  >
                    <Iconify icon={"material-symbols:delete-outline"} />
                  </IconButton>

                  <FormControlLabel
                    sx={{ m: 0 }}
                    control={
                      <Switch
                        defaultChecked={e.inStock}
                        onChange={() => stockhandler(e.id)}
                        size="small"
                      />
                    }
                    label="In stock"
                  />
                </Grid>
              </StyledCard>
            ))}

            <StyledCard>
              <Grid item width={250}>
                <TextField
                  onChange={(e) => setstate({ ...state, name: e.target.value })}
                  id="joker"
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item container justifyContent="space-between" width={40}>
                <IconButton onClick={addSizeHandler} size="medium">
                  <Iconify icon={"mdi:content-save-all-outline"} />
                </IconButton>
              </Grid>
            </StyledCard>
          </Stack>
        </StyledContainer>
      </Stack>
    </Card>
  );
};

export default ProductVariant;

const StyledContainer = styled("div")(({ theme }) => ({
  width: "100%",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  border: "2px solid ",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
}));
