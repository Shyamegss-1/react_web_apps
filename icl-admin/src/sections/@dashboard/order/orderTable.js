import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Iconify from "../../../components/iconify/Iconify";
import { Avatar, Button, TablePagination, Stack } from "@mui/material";
import { AddressDialog, DeliveryDialog } from "./Dialogs";
import OrderToolbar from "./orderToolbar";
import { ORDERSERVICE } from "../../../services/apiServices/apiService";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const { paymentMethod, paymentId } = JSON.parse(row.payment_status)[
    "payment"
  ];

  return (
    <React.Fragment>
      <TableRow
        sx={
          ({ "& > *": { borderBottom: "unset" } },
          row.delivery == "cancel"
            ? {
                position: "relative",
                "&::after": {
                  content: "''",
                  width: "100%",
                  height: "100%",
                  background: "#00000070",
                  position: "absolute",
                  left: 0,
                  textAlign: "center",
                  color: "white",
                  zIndex: 1,
                  fontSize: 20,
                  letterSpacing: 2,
                  pt: 2,
                },
              }
            : row.delivery == "complete"
            ? {
                position: "relative",
                "&::after": {
                  content: "''",
                  width: "100%",
                  height: "100%",
                  background: "#5fff004f",
                  position: "absolute",
                  left: 0,
                  textAlign: "center",
                  color: "white",
                  zIndex: 1,
                  fontSize: 20,
                  letterSpacing: 2,
                  pt: 2,
                },
              }
            : "")
        }
      >
        <TableCell>
          <IconButton
            sx={{ zIndex: 1111111 }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Iconify icon={"material-symbols:keyboard-arrow-up-rounded"} />
            ) : (
              <Iconify icon={"material-symbols:keyboard-arrow-down-rounded"} />
            )}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={row.name}
              src={`${process.env.PUBLIC_URL}/assets/images/avatars/baggesss.png`}
            />
            <Typography variant="subtitle2" noWrap>
              {row.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{row.delivery}</TableCell>

        <TableCell align="right">{row.orderId}</TableCell>

        <TableCell align="right">{row.amount}</TableCell>

        <TableCell align="right">
          <Button
            onClick={props.handleClickOpen}
            variant="outlined"
            size="small"
          >
            View
          </Button>
        </TableCell>

        <TableCell align="right">{row.order_date}</TableCell>

        <TableCell align="right">
          {row.delivery == "cancel" ? (
            <Button
              color="error"
              sx={{ width: "80%" }}
              variant="contained"
              size="medium"
            >
              Cancelled
            </Button>
          ) : row.delivery == "complete" ? (
            <Button
              sx={{ width: "80%" }}
              color="info"
              variant="contained"
              size="medium"
            >
              recived
            </Button>
          ) : (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button color="error" variant="contained" size="small">
                Cancel
              </Button>

              <Button
                onClick={() => props.SetAdDiaglog(true)}
                variant="contained"
                size="small"
              >
                Delivered
              </Button>
            </Stack>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{ mb: 4, boxShadow: (theme) => theme.shadows[1] }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>

                    <TableCell>Quantity</TableCell>

                    <TableCell>Color</TableCell>

                    <TableCell>Size</TableCell>

                    <TableCell align="right">Amount</TableCell>

                    <TableCell align="right">Total price (₹)</TableCell>

                    <TableCell align="right">Payment Mode</TableCell>

                    <TableCell align="center">Payment Id</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {JSON.parse(row.product)["product"].map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>

                      <TableCell>{historyRow.quantity}</TableCell>

                      <TableCell>{historyRow.color}</TableCell>

                      <TableCell>{historyRow.size}</TableCell>

                      <TableCell align="right">{historyRow.price}</TableCell>

                      <TableCell align="right">
                        {historyRow.totalPrice}
                      </TableCell>

                      <TableCell align="right">{paymentMethod}</TableCell>

                      <TableCell align="right">{paymentId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrderTable() {
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [adDiaglog, SetAdDiaglog] = React.useState(false);

  const [value, setValue] = React.useState("");

  const [data, setData] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  React.useEffect(() => {
    ORDERSERVICE({ method: "GETALL" }).then((e) => setData(e.data));
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: (theme) => theme.shadows[6] }}
      >
        <OrderToolbar setValue={setValue} value={value} />
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />

              <TableCell> User</TableCell>

              <TableCell> Email</TableCell>

              <TableCell align="center">Order Id</TableCell>

              <TableCell align="right">Amount (₹)</TableCell>

              <TableCell align="right">Address</TableCell>

              <TableCell align="right">Date</TableCell>

              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .filter(
                (_user) =>
                  _user.id.toLowerCase().indexOf(value.toLowerCase()) !== -1
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Row
                  key={index}
                  SetAdDiaglog={SetAdDiaglog}
                  handleClickOpen={handleClickOpen}
                  row={row}
                />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <AddressDialog open={open} setOpen={setOpen} />

      <DeliveryDialog SetAdDiaglog={SetAdDiaglog} adDiaglog={adDiaglog} />
    </>
  );
}
