import * as React from "react";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Iconify from "../../../components/iconify/Iconify";

import Label from "../../../components/label";

export default function EditCoupon({
  open,
  setOpen,
  setState,
  state,
  id,
  addhandler,
  updateHandler,
  deleteHandler,
}) {
  const StyledBox = styled(Box)(() => ({
    width: "600px",
    height: "100vh",
  }));

  const inputHandlers = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <React.Fragment>
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <StyledBox>
            {id !== "" && (
              <>
                <Box sx={{ p: "20px 20px 0 20px" }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Label
                      color={state.active === "active" ? "success" : "error"}
                    >
                      {state.active}
                    </Label>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => deleteHandler()}>
                        <Iconify width="20" icon="fluent:delete-28-filled" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
                <Divider style={{ margin: "20px 0" }} />
              </>
            )}

            <Box sx={{ p: "10px 20px 20px 20px" }}>
              <Typography variant="h5">Add Coupon</Typography>

              <Stack spacing={2} mt={4}>
                <Stack direction="row" alignItems="center">
                  <StyledText component="span" sx={{ width: "200px" }}>
                    Coupon name
                  </StyledText>

                  <TextField
                    autoFocus="autoFocus"
                    name="couponname"
                    onChange={(e) => inputHandlers(e)}
                    size="small"
                    value={state.couponname}
                    fullWidth
                    type="text"
                  />
                </Stack>

                <Stack direction="row" alignItems="center">
                  <StyledText component="span" sx={{ width: "200px" }}>
                    Coupon type
                  </StyledText>

                  <Select
                    fullWidth
                    size="small"
                    name="coupontype"
                    value={state.coupontype}
                    onChange={(e) => inputHandlers(e)}
                  >
                    <MenuItem value="percent">Percentage</MenuItem>
                    <MenuItem value="fixed">Fixed</MenuItem>
                  </Select>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <StyledText component="span" sx={{ width: "200px" }}>
                    Coupon value
                  </StyledText>

                  <FormControl fullWidth variant="outlined" size="small">
                    <OutlinedInput
                      autoFocus="autoFocus"
                      fullWidth
                      type="number"
                      value={state.couponvalue}
                      name="couponvalue"
                      onChange={(e) => inputHandlers(e)}
                      endAdornment={
                        <InputAdornment position="end">₹</InputAdornment>
                      }
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Box>
          </StyledBox>

          <Stack direction="row" mb={2} ml={2} spacing={1}>
            <Button
              onClick={() => {
                id === "" ? addhandler() : updateHandler();
              }}
              size="small"
              color="inherit"
              variant="contained"
            >
              {id === "" ? "Create" : "Save"}
            </Button>
            <Button
              onClick={() => setOpen(false)}
              size="small"
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
          </Stack>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const StyledText = styled((props) => <Box component="span" {...props} />)(
  ({ theme }) => ({
    width: "200px",
    fontSize: "13px",
    color: "rgb(99, 115, 129)",
    lineheight: "1.5",
  })
);
