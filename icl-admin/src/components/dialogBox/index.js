import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, close, head, confirm }) {
  const handleClose = () => {
    close(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{" Confirm Delete ?"}</DialogTitle>

        <DialogContent sx={{ width: 600 }}>
          <DialogContentText id="alert-dialog-description">
            Are Sure You Want To Delete This {head}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={confirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
