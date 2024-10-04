import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { dateFormater } from "../../utils/dateFormatter";

export default function EditCategories({
  open,
  setOpen,
  setData,
  selectedOption,
}) {
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
            <Typography variant="h6">
              {data && data?.user?.name?.split(" ")[0]}&prime;s review
            </Typography>

            <Grid mt={7} container justifyContent="space-between">
              <Grid item xs={4}>
                <div style={{ display: "grid", rowGap: "0.7rem" }}>
                  <StyledText variant="subtitle1">Name</StyledText>
                  <StyledText variant="subtitle1">Email</StyledText>
                  <StyledText variant="subtitle1">Rating</StyledText>
                  <StyledText variant="subtitle1">Date</StyledText>
                  <StyledText variant="subtitle1">Review title</StyledText>
                  <StyledText variant="subtitle1">Description</StyledText>
                </div>
              </Grid>

              <Grid item xs={7.5}>
                <div style={{ display: "grid", rowGap: "0.7rem" }}>
                  <StyledText>{data?.user?.name}</StyledText>
                  <StyledText>{data?.user?.email}</StyledText>
                  <StyledText>{data?.rating} out of 5</StyledText>
                  <StyledText>{dateFormater(data?.date)}</StyledText>
                  <StyledText>{data?.title}</StyledText>
                  <StyledText sx={{ width: "350px" }}>
                    {data?.review}
                  </StyledText>
                </div>
              </Grid>
            </Grid>
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
