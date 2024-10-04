import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { dateFormater } from "../../utils/dateFormatter";
import { Link } from "react-router-dom";

export default function PreviewListing({ open, setOpen, selectedOption }) {
  const closeHandler = () => {
    setOpen(false);
  };

  const data = selectedOption;

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={closeHandler}
      sx={{
        height: "100vh",
      }}
    >
      <Box p={4} minWidth={600} minHeight="100%">
        <Stack height="100%" component="form" justifyContent="space-between">
          <Box>
            <Typography variant="h6">Listing Details</Typography>

            <Grid mt={7} container justifyContent="space-between">
              <Grid item xs={4}>
                <div style={{ display: "grid", rowGap: "0.7rem" }}>
                  <StyledText variant="subtitle1">Website</StyledText>
                  <StyledText variant="subtitle1">Email</StyledText>
                  <StyledText variant="subtitle1">Phone</StyledText>
                  <StyledText variant="subtitle1">Created At</StyledText>
                  <StyledText variant="subtitle1">Company name</StyledText>
                  <StyledText variant="subtitle1">Category</StyledText>
                  <StyledText variant="subtitle1">Address</StyledText>
                  <StyledText variant="subtitle1">About</StyledText>
                </div>
              </Grid>

              <Grid item xs={7.5}>
                <div style={{ display: "grid", rowGap: "0.7rem" }}>
                  <StyledText>
                    <Link to={data?.website} target="_blank">
                      {data?.website}
                    </Link>
                  </StyledText>
                  <StyledText>{data?.email || "------"} </StyledText>
                  <StyledText>{data?.phone || "------"}</StyledText>
                  <StyledText>{dateFormater(data?.createdAt)}</StyledText>
                  <StyledText>{data?.companyname || "------"}</StyledText>
                  <StyledText>{data?.category || "------"}</StyledText>
                  <StyledText>{data?.address || "------"}</StyledText>
                  <StyledText sx={{ width: "350px" }}>
                    {data?.about || "------"}
                  </StyledText>
                </div>
              </Grid>
            </Grid>

            <Typography variant="h6" mt={9}>
              Claimed by / registered by
            </Typography>

            {data?.taken ? (
              <Grid mt={7} container justifyContent="space-between">
                <Grid item xs={4}>
                  <div style={{ display: "grid", rowGap: "0.7rem" }}>
                    <StyledText variant="subtitle1">user</StyledText>
                    <StyledText variant="subtitle1">Email</StyledText>
                  </div>
                </Grid>

                <Grid item xs={7.5}>
                  <div style={{ display: "grid", rowGap: "0.7rem" }}>
                    <StyledText>{data?.fname}</StyledText>
                    <StyledText>{data?.email}</StyledText>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <Typography mt={7} variant="subtitle1" textAlign="center">
                Not Claimed yet
              </Typography>
            )}
          </Box>

          <Box>
            <Button variant="contained" onClick={closeHandler}>
              close
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}

const StyledText = styled(Typography)(() => ({
  userSelect: "none",
  transition: " background 20ms ease-in 0s",
  cursor: " pointer",
  borderRadius: "3px",
  whiteSpace: "break-spaces",
  marginRight: "5px",
  padding: "6px 10px",
  "&:hover": {
    background: "#EFEFEF",
  },
}));
