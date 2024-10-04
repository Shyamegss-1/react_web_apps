import {
  Box,
  Card,
  Container,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  CouponAddHandler,
  CouponDataHandler,
  CouponDeleteHandler,
  CouponUpdateHandler,
} from "../../../services/apiServices/apiService";

import CouponTable from "../../sections/@coupon/couponTable";
import EditCoupon from "../../sections/@coupon/edit-coupon";
import Iconify from "../../../components/iconify/Iconify";

import useSnackbar from "../../../components/custom-snackBar/use-snackbar";
import { CustomSnackbar } from "../../../components/custom-snackBar/customSnackbar";

export default function Index() {
  const [first, setfirst] = useState([]);

  const [open, setOpen] = useState(false);

  const [hasUpated, setHasUpated] = useState(true);

  const [id, setId] = useState("");

  const snackbar = useSnackbar();

  const [message, setMessage] = useState("");

  const [state, setState] = useState({
    couponname: "",
    coupontype: "percent",
    couponvalue: "",
    active: "active",
  });

  const addhandler = useCallback(() => {
    CouponAddHandler({ ...state })
      .then((e) => {
        setOpen(false);
        setHasUpated(!hasUpated);
        setMessage("coupon added successfully");
        snackbar.onOpen();
      })
      .catch(() => {
        setOpen(false);
        setMessage("something went wrong! try agin ");
        snackbar.onOpen();
      });
  }, [hasUpated, id, state]);

  const updateHandler = useCallback(
    (status = "active") => {
      const obj = { ...state };
      obj.active = status;

      CouponUpdateHandler({ ...obj, id })
        .then(() => {
          setOpen(false);
          setHasUpated(!hasUpated);
          setMessage("coupon updated successfully");
          snackbar.onOpen();
        })
        .catch(() => {
          setOpen(false);
          setMessage("something went wrong! try agin ");
          snackbar.onOpen();
        });
    },
    [hasUpated, id, state]
  );

  const deleteHandler = useCallback(() => {
    CouponDeleteHandler(id)
      .then((e) => {
        setOpen(false);
        setHasUpated(!hasUpated);
        setMessage("coupon deleted successfully");
        snackbar.onOpen();
      })
      .catch(() => {
        setOpen(false);
        setMessage("something went wrong! try agin ");
        snackbar.onOpen();
      });
  }, [hasUpated, id]);

  useEffect(() => {
    CouponDataHandler().then((e) => setfirst(e.data.data));
  }, [deleteHandler, addhandler, updateHandler]);

  return (
    <>
      <CustomSnackbar
        open={snackbar.open}
        onClose={snackbar.onClose}
        message={message}
      />

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Coupons
          </Typography>

          <Button
            onClick={() => {
              setOpen((state) => !state);
              setState({
                couponname: "",
                coupontype: "percent",
                couponvalue: "",
                active: "active",
              });
              setId("");
            }}
            startIcon={<Iconify icon="material-symbols:add" />}
            variant="contained"
            color="inherit"
          >
            Add Coupon
          </Button>
        </Stack>
        <Card>
          {first.length > 0 ? (
            <CouponTable
              user={
                first //[].concat(first).reverse()
              }
              state={state}
              setOpen={setOpen}
              setState={setState}
              setId={setId}
              updateHandler={updateHandler}
            />
          ) : (
            <Box
              sx={{
                p: 5,
                width: "100%",
                display: "flex",
                height: "400px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" paragraph>
                  Not found
                </Typography>

                <Typography variant="body2">
                  The list of coupons is empty ,
                  <br /> Click&nbsp;
                  <span
                    onClick={() => {
                      setOpen((state) => !state);
                      setState({
                        couponname: "",
                        coupontype: "percent",
                        couponvalue: "",
                        active: "active",
                      });
                      setId("");
                    }}
                    style={{
                      fontWeight: 800,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    here&nbsp;
                  </span>
                  to a add new coupon .
                </Typography>
              </Paper>
            </Box>
          )}
        </Card>
      </Container>

      <EditCoupon
        open={open}
        setOpen={setOpen}
        setState={setState}
        id={id}
        state={state}
        addhandler={addhandler}
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
      />
    </>
  );
}
