import * as React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Slide,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AddressDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delivery Address"}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <DialogContentText id="alert-dialog-slide-description">
          <Box component="div">
            <Typography mb={2} variant="subtitle1">
              Billing Address
            </Typography>

            <Typography fontWeight={500} variant="inherit">
              Eclairs
            </Typography>
            <Typography variant="inherit">+91 98213621120</Typography>
            <Typography variant="inherit" gutterBottom>
              Eclairs213@gmail.com
            </Typography>

            <Typography variant="inherit">
              1984/4, Railway Road, Rajiv Colony, Narela
            </Typography>

            <Typography variant="inherit">New Delhi - 110007 </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box component="div">
            <Typography mb={2} variant="subtitle1">
              Shipping Address
            </Typography>

            <Typography fontWeight={500} variant="inherit">
              Eclairs
            </Typography>
            <Typography variant="inherit">+91 98213621120</Typography>
            <Typography variant="inherit" gutterBottom>
              Eclairs213@gmail.com
            </Typography>

            <Typography variant="inherit">
              1984/4, Railway Road, Rajiv Colony, Narela
            </Typography>

            <Typography variant="inherit">New Delhi - 110007 </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export function DeliveryDialog({ adDiaglog, SetAdDiaglog }) {
  const handleClose = () => {
    SetAdDiaglog(false);
  };

  return (
    <Dialog
      open={adDiaglog}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose()}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Confirm Dilivery"}</DialogTitle>

      <DialogContent sx={{ width: 600 }}>
        <DialogContentText id="alert-dialog-slide-description">
          Do You Want to confirm this Order ??
        </DialogContentText>

        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Confirm
          </Button>

          <Button onClick={handleClose} variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
