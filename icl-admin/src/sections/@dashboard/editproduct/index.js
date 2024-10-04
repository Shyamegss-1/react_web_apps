import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Card,
  Typography,
  styled,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import ProductDetail from "./productDetail";
import ProductPD from "./productPD";

import {
  PRODUCTSERVICE,
  PRODUCTEDITSERVICE,
  PRODUCTVARIANT,
} from "../../../services/apiServices/apiService";

import ProductVariant from "./productVariant";
import { NavLink, useSearchParams } from "react-router-dom";
import { PRODUCTPAGE } from "../../../constants/route-path";

// components

// ----------------------------------------------------------------------

export default function EditProduct() {
  const [modal, setModal] = React.useState(false);

  const [pid, setpId] = React.useState(null);

  const [popup, setPopup] = React.useState(false);

  const [popup2, setPopup2] = React.useState(false);

  const [errorOne, SetErrorOne] = React.useState({
    open: false,
    message: "Each Field is Required",
    variant: "error",
  });

  const [validate, setValidate] = React.useState(false);

  const [params] = useSearchParams();

  const [Edit] = React.useState(params.get("edit"));

  const [varientData, setVariantData] = React.useState([]);

  const [pImages, setpImages] = React.useState([]);

  const [state, setState] = React.useState({
    title: "",
    description: "",
    sizing: "",
    careandcare: "",
    isSale: 0,
    category: 10,
    metatitle: "",
    metakeyword: "",
    metadiscription: "",
    regularprice: "",
    saleprice: "",
  });

  const addProductHandler = () => {
    if (
      state.title === "" ||
      state.description === "" ||
      state.sizing === "" ||
      state.careandcare === "" ||
      state.category === "" ||
      state.metakeyword === "" ||
      state.metadiscription === "" ||
      state.regularprice === ""
    ) {
      setValidate(true);

      SetErrorOne({
        ...errorOne,
        open: true,
      });
    } else if (pImages.length === 0) {
      setValidate(false);

      document.getElementById("withhjk").style.border = "2px solid red";

      SetErrorOne({
        ...errorOne,
        open: true,
        message: "Minimum 1 Image Is Required",
      });
    } else {
      PRODUCTSERVICE({ method: "INSERT", images: pImages, ...state }).then(
        (e) => {
          if (e.data.status == 200) {
            setpId(e.data.product_id);

            setPopup(true);
          } else {
            setPopup2(true);
          }
        }
      );
    }
  };

  React.useEffect(() => {
    PRODUCTVARIANT({ method: "GET", product_id: params.get("edit") }).then(
      (e) => {
        setVariantData(e.data);
      }
    );

    if (Edit != null) {
      PRODUCTEDITSERVICE({ method: "PRODUCT", bId: Edit }).then((e) => {
        setState({
          ...state,
          title: e.data[0].title,
          description: e.data[0].description,
          sizing: e.data[0].sizing,
          careandcare: e.data[0].careandcare,
          isSale: e.data[0].isSale,
          category: e.data[0].category,
          metatitle: e.data[0].metatitle,
          metakeyword: e.data[0].metakeyword,
          metadiscription: e.data[0].metadiscription,
          regularprice: e.data[0].regularprice,
          saleprice: e.data[0].saleprice,
        });
      });
    }
  }, []);

  const updateHandler = () => {
    PRODUCTSERVICE({
      method: "UPDATE",
      bId: Edit,
      images: pImages,
      ...state,
    }).then((e) => {
      if (e.status == 200) {
        SetErrorOne({
          variant: "success",
          open: true,
          message: "Product Upated Successfully",
        });
      } else {
        SetErrorOne({
          variant: "error",
          open: true,
          message: "Something Went Wrong",
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Edit Product </title>
      </Helmet>

      <Snackbar
        open={popup2}
        autoHideDuration={6000}
        onClose={() => setPopup2(false)}
        message={"product already exist"}
        action={
          <Button onClick={() => setPopup2(false)} color="secondary">
            close
          </Button>
        }
      />

      <Snackbar
        open={popup}
        autoHideDuration={6000}
        onClose={() => setPopup(false)}
        message={"product Added Sucessfully"}
        action={
          <Button onClick={() => setPopup(false)} color="secondary">
            close
          </Button>
        }
      />

      <Snackbar
        open={errorOne.open}
        autoHideDuration={4000}
        onClose={() => SetErrorOne({ ...errorOne, open: false })}
        action={
          <Button onClick={() => setPopup(false)} color={errorOne.variant}>
            close
          </Button>
        }
      >
        <Alert
          onClose={() => SetErrorOne({ ...errorOne, open: false })}
          severity={errorOne.variant}
          sx={{ width: "100%" }}
        >
          {errorOne.message}
        </Alert>
      </Snackbar>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>
        </Stack>

        {!modal ? (
          <Grid container spacing={3}>
            <Grid item xl={8} lg={8} md={8}>
              <ProductDetail
                state={state}
                setState={setState}
                validate={validate}
              />
            </Grid>

            <Grid item xl={4} lg={4} md={4}>
              <ProductPD
                pImages={pImages}
                setpImages={setpImages}
                state={state}
                setState={setState}
                Edit={Edit}
                validate={validate}
              />

              <Stack mt={3} spacing={2}>
                {Edit != null ? (
                  <Button
                    onClick={() => updateHandler()}
                    variant="contained"
                    size="large"
                  >
                    Update
                  </Button>
                ) : (
                  ""
                )}

                {Edit != null ? (
                  " "
                ) : (
                  <Button
                    variant="contained"
                    onClick={
                      Edit != null
                        ? () => setModal(true)
                        : () => addProductHandler()
                    }
                    size="large"
                  >
                    {Edit != null ? " Edit Variants" : " Add Product"}
                  </Button>
                )}

                <Button
                  to={PRODUCTPAGE}
                  LinkComponent={NavLink}
                  variant="contained"
                  size="large"
                >
                  Cancel
                </Button>

                {pid && (
                  <Button variant="contained" color="error" size="large">
                    Delete
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Stack spacing={1}>
            {varientData?.map((e) => (
              <Card
                id={e.size}
                key={e.id}
                sx={{
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: (theme) => theme.shadows[9],
                }}
              >
                <div style={{ width: "75%" }}>
                  <Stack
                    spacing={4}
                    direction="row"
                    justifyContent={"space-between"}
                  >
                    <StyledHolder>
                      <StyledCard sx={{ background: e.color }} />

                      {JSON.parse(e.size)["size"].map((e) => (
                        <StyledCard key={e.id}> {e.name}</StyledCard>
                      ))}
                    </StyledHolder>
                  </Stack>
                </div>

                <div style={{ width: "20%" }}>
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button variant="contained" size="small">
                      Edit
                    </Button>

                    <Button color="error" variant="contained" size="small">
                      Delete
                    </Button>
                  </Stack>
                </div>
              </Card>
            ))}

            <Divider
              sx={{ borderStyle: "dashed", margin: "60px 0 !important" }}
            />

            <ProductVariant productId={pid} Edit={Edit} />
          </Stack>
        )}
      </Container>
    </>
  );
}

const StyledCard = styled("div")(({ theme }) => ({
  width: "40px",
  height: "40px",
  border: "2px solid",
  textAlign: "center",
  paddingTop: "7px",
  borderRadius: "5px",
  marginLeft: "5px",
}));

const StyledHolder = styled("div")(({ theme }) => ({
  width: "45%",
  display: "flex",
  justifyContent: "start",
}));
