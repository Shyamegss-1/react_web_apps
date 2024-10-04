import React, { useEffect, useState } from "react";

import {
  Drawer,
  Typography,
  Box,
  Stack,
  IconButton,
  styled,
  Divider,
  Card,
  CardActionArea,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import Label from "../../../components/label/Label";
import {
  userBillingAddress,
  userDetailService,
  userShippingAddress,
} from "../../../services/apiServices/apiService";
import SectionLoader from "../../../components/sectionLoader/sectionLoader";

function OrderDetails({ open, onClose, orderPreview }) {
  const [userData, setUserData] = useState({});
  const [BillAddress, setBillAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});

  useEffect(() => {
    userDetailService(orderPreview.user_id).then((e) =>
      setUserData(e.data.data[0])
    );

    userBillingAddress(orderPreview.user_id).then((e) =>
      setBillAddress(e.data.data[0])
    );
    userShippingAddress(orderPreview.user_id).then((e) =>
      setShippingAddress(e.data.data[0])
    );
  }, [orderPreview]);

  return (
    <div>
      <Drawer
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation": {
            width: "60%",
          },
        }}
        anchor="right"
        open={open}
        onClose={onClose}
      >
        {userData?.fname ? (
          <Box p={4}>
            <Stack direction="row" justifyContent="space-between">
              <IconButton onClick={onClose} size="small">
                <Iconify icon={"teenyicons:double-caret-right-outline"} />
              </IconButton>

              <Typography
                sx={{
                  position: "relative",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    bottom: "0",
                    right: "3px",
                    width: "80px",
                    height: "1.7px",
                    background: "#7700AA",
                  },
                }}
                variant="h5"
              >
                ORDER DETAILS
              </Typography>
            </Stack>

            <Box my={8}>
              <Stack direction="row" spacing={8} alignItems="center" mb={6}>
                <Card
                  sx={{
                    width: "180px !important",
                    overflow: "hidden",
                  }}
                >
                  <CardActionArea>
                    <img
                      src={`https://thetestingserver.com/themenskompany/product/${orderPreview.image}`}
                      alt=""
                    />
                  </CardActionArea>
                </Card>

                <Box>
                  <StyledTextBox>
                    <StyledSpan>
                      <StyledKey
                        variant="button"
                        color="rgba(55, 53, 47, 0.65)"
                      >
                        PRODUCT INFO
                      </StyledKey>
                    </StyledSpan>
                    <StyledKey variant="button" color="rgb(55, 53, 47)">
                      {orderPreview.product_name}
                    </StyledKey>
                  </StyledTextBox>

                  <StyledTextBox>
                    <StyledSpan>
                      <StyledKey
                        variant="button"
                        color="rgba(55, 53, 47, 0.65)"
                      >
                        Qty
                      </StyledKey>
                    </StyledSpan>

                    <StyledKey variant="button" color="rgb(55, 53, 47)">
                      {orderPreview.product_quantity}
                    </StyledKey>
                  </StyledTextBox>

                  <StyledTextBox>
                    <StyledSpan>
                      <StyledKey
                        variant="button"
                        color="rgba(55, 53, 47, 0.65)"
                      >
                        size
                      </StyledKey>
                    </StyledSpan>

                    <StyledKey variant="button" color="rgb(55, 53, 47)">
                      {orderPreview.size}
                    </StyledKey>
                  </StyledTextBox>

                  <StyledTextBox>
                    <StyledSpan>
                      <StyledKey
                        variant="button"
                        color="rgba(55, 53, 47, 0.65)"
                      >
                        Price
                      </StyledKey>
                    </StyledSpan>
                    <StyledKey variant="button" color="rgb(55, 53, 47)">
                      {orderPreview.price}
                    </StyledKey>
                  </StyledTextBox>
                </Box>

                <Box>
                  <StyledTextBox>
                    <StyledSpan>
                      <StyledKey
                        variant="button"
                        color="rgba(55, 53, 47, 0.65)"
                      >
                        Payment Status
                      </StyledKey>
                    </StyledSpan>
                    <Label
                      color={
                        orderPreview.payment_status === "Pending"
                          ? "primary"
                          : "success"
                      }
                    >
                      {orderPreview.payment_status}
                    </Label>
                  </StyledTextBox>

                  <StyledTextBox>
                    <StyledSpan>
                      <StyledKey
                        variant="button"
                        color="rgba(55, 53, 47, 0.65)"
                      >
                        Delivery Status
                      </StyledKey>
                    </StyledSpan>
                    <Label
                      color={
                        orderPreview.status === "pending"
                          ? "primary"
                          : "success"
                      }
                    >
                      {orderPreview.status}
                    </Label>
                  </StyledTextBox>
                </Box>
              </Stack>

              <Divider />

              <StyledTextBox>
                <StyledSpan>
                  <StyledKey variant="button" color="rgba(55, 53, 47, 0.65)">
                    Order id
                  </StyledKey>
                </StyledSpan>

                <StyledKey variant="button" color="rgb(55, 53, 47)">
                  {orderPreview.order_id}
                </StyledKey>
              </StyledTextBox>

              <StyledTextBox>
                <StyledSpan>
                  <StyledKey variant="button" color="rgba(55, 53, 47, 0.65)">
                    Name
                  </StyledKey>
                </StyledSpan>

                <StyledKey variant="button" color="rgb(55, 53, 47)">
                  {userData?.fname} {userData?.lname}
                </StyledKey>
              </StyledTextBox>

              <StyledTextBox>
                <StyledSpan>
                  <StyledKey variant="button" color="rgba(55, 53, 47, 0.65)">
                    Email
                  </StyledKey>
                </StyledSpan>

                <StyledKey variant="button" color="rgb(55, 53, 47)">
                  {userData?.email}
                </StyledKey>
              </StyledTextBox>

              <Divider />

              <StyledTextBox>
                <StyledSpan>
                  <StyledKey variant="button" color="rgba(55, 53, 47, 0.65)">
                    Billing address
                  </StyledKey>
                </StyledSpan>

                <StyledKey variant="button" color="rgb(55, 53, 47)">
                  {`${BillAddress?.fname} ${BillAddress?.lname} `} <br />
                  {`${BillAddress?.streetaddress1} , ${BillAddress?.streetaddress2} ,${BillAddress?.town} ,${BillAddress?.state} , ${BillAddress?.country} - ${BillAddress?.postcode}`}
                </StyledKey>
              </StyledTextBox>

              <StyledTextBox>
                <StyledSpan>
                  <StyledKey variant="button" color="rgba(55, 53, 47, 0.65)">
                    shipping address
                  </StyledKey>
                </StyledSpan>

                <StyledKey variant="button" color="rgb(55, 53, 47)">
                  {`${shippingAddress?.fname} ${shippingAddress?.lname} `}{" "}
                  <br />
                  {`${shippingAddress?.streetaddress1} , ${shippingAddress?.streetaddress2} ,${shippingAddress?.town} ,${shippingAddress?.state} , ${shippingAddress?.country} - ${shippingAddress?.postcode}`}
                </StyledKey>
              </StyledTextBox>
            </Box>
          </Box>
        ) : (
          <SectionLoader />
        )}
      </Drawer>
    </div>
  );
}
export default OrderDetails;

const StyledTextBox = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  columnGap: "50px",
  marginBottom: "7px",
});

const StyledKey = styled(Typography)({
  padding: "7px 12px  7px",
  maxWidth: "450px",
  transition: "background 20ms ease-in 0s",
  borderRadius: "3px",
  cursor: "pointer",
  minHeight: "34px",
  "&:hover": {
    background: "rgb(55,53,47,0.08)",
  },
});

const StyledSpan = styled(Typography)({
  maxWidth: "300px",
  width: "200px",
});
