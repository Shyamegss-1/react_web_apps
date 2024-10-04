// @mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
// utils

import Scrollbar from "../../../components/scrollbar";
import { Button, Container, IconButton, Tooltip } from "@mui/material";
import Logo from "../../../components/logo/Logo";
import Label from "../../../components/label/Label";
import Iconify from "../../../components/iconify/Iconify";
import html2pdf from "html2pdf.js";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ORDER } from "../../../constants/route-path";
import {
  OrderByIDService,
  userBillingAddress,
  userShippingAddress,
} from "../../../services/apiServices/apiService";

// ----------------------------------------------------------------------

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& td": {
    textAlign: "right",
    borderBottom: "none",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function convertHtmlToPdf() {
  const htmlContent = document.getElementById("pppasd");
  const resolution = 300;

  const scaleFactor = resolution / 96;

  html2pdf()
    .set({
      jsPDF: {
        format: "a3",
      },
      html2canvas: {
        scale: scaleFactor,
      },
      margin: 1,
    })
    .from(htmlContent)
    .toPdf()
    .save("myfile.pdf");
}

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const [state, setState] = useState([]);

  const [ad, setad] = useState({});

  const reqId = new URLSearchParams(window.location.search).get("o");

  useEffect(() => {
    OrderByIDService(reqId).then((e) => {
      const g = e.data.data;
      setState(g);
      if (Boolean(g[0]?.different === "true")) {
        userShippingAddress(g[0]?.user_id).then((e) => setad(e.data.data[0]));
      } else {
        userBillingAddress(g[0]?.user_id).then((e) => setad(e.data.data[0]));
      }
    });
  }, []);

  const handleGeneratePdf = () => {
    convertHtmlToPdf();
  };

  const renderTotal = (
    <>
      <StyledTableRow>
        <TableCell
          colSpan={ad?.state?.toLocaleLowerCase()?.includes("delhi") ? 5 : 4}
        />
        <TableCell sx={{ color: "text.secondary" }}>
          <Box sx={{ mt: 2 }} />
          Subtotal
        </TableCell>
        <TableCell width={120} sx={{ typography: "subtitle2" }}>
          <Box sx={{ mt: 2 }} />
          {Number(state[0]?.total_amount) + Number(state[0]?.discount_charge)}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell
          colSpan={ad?.state?.toLocaleLowerCase()?.includes("delhi") ? 5 : 4}
        />
        <TableCell sx={{ color: "text.secondary" }}>Discount</TableCell>
        <TableCell
          width={120}
          sx={{ color: "error.main", typography: "body2" }}
        >
          {state[0]?.discount_charge}
        </TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell
          colSpan={ad?.state?.toLocaleLowerCase()?.includes("delhi") ? 5 : 4}
        />
        <TableCell sx={{ color: "text.secondary" }}>Shipping</TableCell>
        <TableCell width={120}> {0}</TableCell>
      </StyledTableRow>

      <StyledTableRow>
        <TableCell
          colSpan={ad?.state?.toLocaleLowerCase()?.includes("delhi") ? 5 : 4}
        />
        <TableCell sx={{ typography: "subtitle1" }}>Total</TableCell>
        <TableCell width={140} sx={{ typography: "subtitle1" }}>
          {state[0]?.total_amount}
        </TableCell>
      </StyledTableRow>
    </>
  );

  const renderFooter = (
    <Grid container>
      <Grid xs={12} md={9} sx={{ py: 3 }}></Grid>

      <Grid xs={12} md={3} sx={{ py: 3, textAlign: "right" }}>
        <Typography variant="subtitle2">Have a Question?</Typography>

        <Typography variant="body2">support@themenskompany.com</Typography>
      </Grid>
    </Grid>
  );

  const renderList = (
    <TableContainer sx={{ overflow: "unset", mt: 5 }}>
      <Scrollbar>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>

              <TableCell sx={{ typography: "subtitle2" }}>Product</TableCell>

              <TableCell align="right">Qty</TableCell>

              <TableCell align="right">Net Price</TableCell>

              {ad?.state?.toLocaleLowerCase()?.includes("delhi") ? (
                <>
                  <TableCell align="right">SGST</TableCell>
                  <TableCell align="right">CGST</TableCell>
                </>
              ) : (
                <TableCell align="right">IGST</TableCell>
              )}

              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {state.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  <Box sx={{ maxWidth: 560 }}>
                    <Typography variant="subtitle2">
                      {row.product_name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      noWrap
                    ></Typography>
                  </Box>
                </TableCell>

                <TableCell align="right">{row.product_quantity}</TableCell>

                <TableCell align="right">
                  {Number(row.total_price) -
                    (Number(row.total_price) / 100) * 12}
                </TableCell>
                {ad?.state?.toLocaleLowerCase()?.includes("delhi") ? (
                  <>
                    <TableCell align="right">
                      {(Number(row.total_price) / 100) * 6}
                    </TableCell>

                    <TableCell align="right">
                      {(Number(row.total_price) / 100) * 6}
                    </TableCell>
                  </>
                ) : (
                  <TableCell align="right">
                    {(Number(row.total_price) / 100) * 12}
                  </TableCell>
                )}

                <TableCell align="right">{row.total_price}</TableCell>
              </TableRow>
            ))}

            {renderTotal}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );

  return (
    <Container>
      <Stack mb={2} direction="row" justifyContent="space-between">
        <Button
          LinkComponent={Link}
          to={ORDER}
          size="small"
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Back
        </Button>

        <Tooltip title="print">
          <IconButton
            onClick={handleGeneratePdf}
            color="inherit"
            size="medium"
            variant="contained"
          >
            <Iconify width={23} icon="bi:printer-fill" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Card sx={{ pt: 5, px: 5 }} id="pppasd">
        <Box
          rowGap={5}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
        >
          <Logo disabledLink />

          <Stack spacing={1} alignItems={{ xs: "flex-start", md: "flex-end" }}>
            <Label
              variant="soft"
              color={
                state[0]?.payment_status === "Pending" ? "error" : "success"
              }
            >
              {state[0]?.payment_status === "Pending" ? "unpaid" : "paid"}
            </Label>

            <Typography variant="h6">INV-1991</Typography>
          </Stack>

          <Stack sx={{ typography: "body2" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Invoice From
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Abhinav Gambhir
            </Typography>
            251/1,Third Floor,Shahpur Jat- Siri Fort, New Delhi,
            <br />
            Delhi 110049
            <br />
            Email: support@themenskompany.com
            <br />
            Phone: 011 40586187
            <br />
          </Stack>

          <Stack sx={{ typography: "body2" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Invoice To
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {ad.fname + " " + ad.lname}
            </Typography>
            {`${ad.streetaddress1} / ${ad.streetaddress2}`}
            <br />
            {`${ad.town},${ad.state} - ${ad.postcode}`}
            <br />
            Phone: +91 {ad.phone}
            <br />
          </Stack>

          <Stack sx={{ typography: "body2" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Date Create
            </Typography>
            {state[0]?.created_at}
          </Stack>

          <Stack sx={{ typography: "body2" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Order Id
            </Typography>
            {state[0]?.order_id}
          </Stack>
        </Box>

        {renderList}

        <Divider sx={{ mt: 5, borderStyle: "dashed" }} />

        {renderFooter}
      </Card>
    </Container>
  );
}
