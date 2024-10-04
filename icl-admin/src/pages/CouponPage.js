import { Helmet } from "react-helmet-async";
import React, { useState } from "react";

// @mui
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Iconify from "../components/iconify/Iconify";

// ----------------------------------------------------------------------
const COUPONDATA = [
  { id: 1, couponId: "TJSGS786", discount: 22, condition: 3000 },
  { id: 2, couponId: "USHKUG586", discount: 11, condition: 4000 },
];

export default function CouponPage() {
  const [state, setState] = useState([...COUPONDATA]);

  const [is, setIs] = useState(false);

  const [uid, setUid] = useState(false);

  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState({
    couponId: "",
    discount: "",
    condition: "",
  });

  const inputHandler = (e) => {
    setEdit({
      ...edit,
      [e.target.id]: e.target.value,
    });
  };

  const addHandler = () => {
    setState([...state, { ...edit, id: state.length + 1 }]);

    setOpen(false);
  };

  const deleteHandler = (_id) => {
    const updated = state.filter((e) => e.id !== _id);
    setState([...updated]);
  };

  const editHandler = (_id) => {
    setIs(true);
    setOpen(true);
    setUid(_id);
    state
      .filter((e) => e.id === _id)
      .map((e) => {
        setEdit({
          couponId: e.couponId,
          discount: e.discount,
          condition: e.condition,
        });

        return true;
      });
  };

  const updateHandler = () => {
    const update = state.filter((e) => e.id === uid);

    update[0].discount = edit.discount;
    update[0].couponId = edit.couponId;
    update[0].condition = edit.condition;

    setState((state) => state);

    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Ikshita Choudhary </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            coupon
          </Typography>

          <Button
            onClick={() => {
              setOpen(true);
              setIs(false);
              setEdit({});
            }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            add Coupon
          </Button>
        </Stack>

        <Stack rowGap={2} columnGap={3} direction="row" flexWrap="wrap">
          {state.map((_el, index) => (
            <Card sx={{ width: 340 }} key={index}>
              <CardHeader
                sx={{ color: "#C5942C" }}
                title={"₹" + " " + _el.condition + " " + "^"}
                action={
                  <Stack direction="row">
                    <IconButton
                      size="small"
                      onClick={() => editHandler(_el.id)}
                    >
                      <Iconify color="#C5942C" icon={"material-symbols:edit"} />
                    </IconButton>

                    <IconButton
                      onClick={() => deleteHandler(_el.id)}
                      size="small"
                    >
                      <Iconify
                        sx={{ color: "#bf0600" }}
                        icon="ic:round-delete"
                      />
                    </IconButton>
                  </Stack>
                }
              />
              <CardContent>
                <Grid container>
                  <Grid item container>
                    <Typography variant="button">Coupon Id :</Typography> &nbsp;
                    <Typography noWrap>{_el.couponId} </Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item container>
                    <Typography variant="button">Discount :</Typography> &nbsp;
                    <Typography noWrap>{_el.discount} %</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Typography sx={{ p: 2, color: "text.secondary" }} fontSize={22}>
          {is ? "Edit" : "Add"} Coupon
        </Typography>

        <DrawerStyles>
          <Stack spacing={2}>
            <TextField
              onChange={(e) => inputHandler(e)}
              type="text"
              placeholder="coupon id"
              id="couponId"
              value={edit.couponId}
            />

            <TextField
              onChange={(e) => inputHandler(e)}
              type="text"
              placeholder="discount in %"
              id="discount"
              value={edit.discount}
            />

            <TextField
              onChange={(e) => inputHandler(e)}
              type="text"
              placeholder="condition Price ^"
              id="condition"
              value={edit.condition}
            />
          </Stack>

          <Stack
            spacing={1}
            sx={{
              position: "fixed !important",
              bottom: "40px",
            }}
            direction="row"
          >
            <Button
              onClick={is ? () => updateHandler() : () => addHandler()}
              variant="contained"
              sx={{ width: "170px" }}
            >
              {!is ? "save" : "update"}
            </Button>

            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              sx={{ width: "170px" }}
            >
              cancel
            </Button>
          </Stack>
        </DrawerStyles>
      </Drawer>
    </>
  );
}

const DrawerStyles = styled("div")(({ theme }) => ({
  width: "400px",
  padding: "10px 22px",
}));
