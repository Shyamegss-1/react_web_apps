import { Container, Grid, IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

import ContactdetailsCard from "../../../sections/@content-management/$socialLinks/contactdetailsCard";
import SocialCards from "../../../sections/@content-management/$socialLinks/socialCards";

import {
  contentSolidService,
  contentSolidUpdateService,
} from "../../../../services/apiServices/apiService";

import Iconify from "../../../../components/iconify/Iconify";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [Links, setLinks] = useState({
    insta: "",
    face: "",
    twitter: "",
  });

  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    contentSolidService().then((e) => {
      let s = e.data.data;

      setLinks({
        insta: s[0].value.split(",")[0],
        face: s[0].value.split(",")[1],
        twitter: s[0].value.split(",")[2],
      });

      setContact({
        phone: s[1].value.split(",")[0],
        email: s[1].value.split(",")[1],
        address: s[1].value.split(",")[2],
      });
    });
  }, []);

  const saveHandler = (id, value) => {
    setIsLoading(true);
    setOpen(false);
    contentSolidUpdateService({ id, value }).then(() => {
      setIsLoading(false);
      setOpen(true);
    });
  };

  const changeHandler = (event) => {
    setLinks({
      ...Links,
      [event.target.id]: event.target.value,
    });
  };

  const changeCdetailshanlder = (event) => {
    setContact({
      ...contact,
      [event.target.id]: event.target.value,
    });
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Iconify icon="ic:baseline-close" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Details updated"
        action={action}
      />
      <Grid container justifyContent="space-between">
        <Grid item md={5.7} xs={12}>
          <SocialCards
            isLoading={isLoading}
            links={Links}
            changeHandler={changeHandler}
            saveHandler={saveHandler}
          />
        </Grid>

        <Grid item md={5.7} xs={12}>
          <ContactdetailsCard
            changeCdetailshanlder={changeCdetailshanlder}
            link={contact}
            saveHandler={saveHandler}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
