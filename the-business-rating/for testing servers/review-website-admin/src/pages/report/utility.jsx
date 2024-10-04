import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Drawer from "@mui/material/Drawer";

import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";

export function DeleteConfirmationPopup({
  open,
  setOpen,
  reviewDeleteHandler,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete review ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this review forever? Once done, you
            can't bring it back
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            color="error"
            variant="contained"
            onClick={reviewDeleteHandler}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function TemporaryDrawer({ selectedRow, state, setState }) {
  console.log(selectedRow);

  return (
    <div>
      <>
        <Drawer anchor={"right"} open={state} onClose={() => setState(false)}>
          <div className="dj32ass7">
            <Typography
              variant="h3"
              sx={{ textDecoration: "underline" }}
              mb={5}
            >
              Review Details
            </Typography>

            <Grid container>
              <Grid item sm={12}>
                <Typography mb={5} variant="h6">
                  Reported By
                </Typography>
                <ContentBox item={"Reported on"} value={selectedRow.date} />
                <ContentBox item={"Name"} value={selectedRow.user.name} />
                <ContentBox item={"Email"} value={selectedRow.user.email} />
                <ContentBox item={"Reason"} value={selectedRow.report} />

                <Typography my={5} variant="h6">
                  Review Detail
                </Typography>

                <ContentBox
                  item={"Review on"}
                  value={selectedRow.review.date}
                />
                <ContentBox
                  item={"Name"}
                  value={selectedRow.review.user.name}
                />
                <ContentBox
                  item={"Email"}
                  value={selectedRow.review.user.email}
                />
                <ContentBox
                  item={"Rating"}
                  value={`${selectedRow.review.rating} / 5`}
                />
                <ContentBox
                  item={"Review title"}
                  value={selectedRow.review.title}
                />
                <ContentBox item={"Review"} value={selectedRow.review.review} />

                <Typography my={5} variant="h6">
                  Listing Detail
                </Typography>

                <ContentBox
                  item={"Website"}
                  value={selectedRow.listing.website}
                />
              </Grid>
            </Grid>
          </div>
        </Drawer>
      </>
    </div>
  );
}

const ContentBox = ({ item, value }) => {
  const StyledSpan = styled("p")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }));

  return (
    <Grid container alignItems="center" mb={2}>
      <Grid item sm={4}>
        <StyledSpan>
          <Typography variant="subtitle1" noWrap color="black">
            {item}
          </Typography>
        </StyledSpan>
      </Grid>

      <Grid item sm={5}>
        <Typography variant="subtitle2">{value}</Typography>
      </Grid>
    </Grid>
  );
};
