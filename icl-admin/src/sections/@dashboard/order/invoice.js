import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";

import { Helmet } from "react-helmet-async";
import Iconify from "../../../components/iconify/Iconify";

import InvoiceTable from "./invoiceTable";
import Divider from "@mui/material/Divider";

import html2pdf from "html2pdf.js";

const Invoice = () => {
  function downloadImage() {
    const htmlFormat = document.getElementById("divID");

    const opt = {
      margin: 0,
      filename: "invoice-5738.pdf",
      html2canvas: {
        width: 1400,
        scale: 10,
        dpi: 1000,
      },
      jsPDF: { unit: "px", format: "a4" },
    };

    html2pdf()
      .from(htmlFormat)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then(() => {})
      .save();
  }

  function previewInvoice() {
    const htmlFormat = document.getElementById("divID");

    const opt = {
      margin: 0,
      filename: "invoice-5738.pdf",
      html2canvas: {
        width: 1400,
        scale: 7,
        dpi: 800,
      },
      jsPDF: { unit: "px", format: "a4" },
    };

    html2pdf()
      .from(htmlFormat)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        window.open(pdf.output("bloburl"), "_blank");
      });
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: about | ikshita Choudhary </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h4" gutterBottom>
            Invoice
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          mb={3}
        >
          <Grid>
            <IconButton onClick={() => previewInvoice()}>
              <Iconify icon="ic:baseline-remove-red-eye" />
            </IconButton>
          </Grid>

          <Grid>
            <IconButton onClick={() => downloadImage()}>
              <Iconify icon="material-symbols:download" />
            </IconButton>
          </Grid>
        </Stack>

        <PaperStyle elevation={4} id="divID">
          <Grid direction="row" container>
            <Grid item xl={6}>
              <div style={{ width: "30%" }}>
                <img
                  src={`${process.env.PUBLIC_URL}/logo_dark.png`}
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </Grid>

            <Grid item xl={6}>
              <Typography mt={2} mb={5} variant="h6" textAlign="end">
                INV-17052
              </Typography>
            </Grid>

            <Grid item xl={6}>
              <Typography mt={2} mb={5} variant="overline" color="#B0B9C2">
                INVOICE FROM
              </Typography>

              <Typography variant="body2" pt={3}>
                Reece Chung
              </Typography>
              <Typography variant="body2">
                36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836
              </Typography>
              <Typography variant="body2">Phone: 990-588-5716</Typography>
            </Grid>

            <Grid item xl={6}>
              <Typography mt={2} variant="overline" color="#B0B9C2">
                INVOICE TO
              </Typography>

              <Typography variant="body2" pt={3}>
                Lainey Davidson
              </Typography>
              <Typography variant="body2">
                2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827
              </Typography>
              <Typography variant="body2" mb={6}>
                Phone: 955-439-2578
              </Typography>
            </Grid>

            <Grid item xl={6}>
              <Typography variant="overline" color="#B0B9C2">
                DATE CREATE
              </Typography>

              <Typography variant="body2" mt={3} mb={5}>
                25 Mar 2023
              </Typography>
            </Grid>
          </Grid>

          <InvoiceTable />

          <Divider sx={{ margin: "30px 0" }} />

          <Grid container justifyContent="space-between" direction="row">
            <Grid item xl={6}>
              <Typography variant="subtitle2" pb={0.2}>
                NOTES
              </Typography>
            </Grid>

            <Grid item xl={6} textAlign="end">
              <Typography variant="subtitle2">Have a Question?</Typography>
            </Grid>

            <Grid item xl={6}>
              <Typography variant="body2">
                We appreciate your business. Should you need us to add VAT or
                extra notes let us know!
              </Typography>
            </Grid>

            <Grid item xl={6} textAlign="end">
              <Typography variant="body2">support@demos.cc</Typography>
            </Grid>
          </Grid>
        </PaperStyle>
      </Container>
    </>
  );
};

export default Invoice;

const PaperStyle = styled(Paper)({
  padding: "23px 40px",
  borderRadius: "14px",
});
