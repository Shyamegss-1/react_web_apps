/* eslint-disable react-hooks/exhaustive-deps */

import { filter } from "lodash";
import { useState, useEffect } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
// sections
import UserListHead from "./UserListHead";
import UserListToolbar from "./UserListToolbar";
// mock

import { PDC_IMAGE } from "../../../constants/path-constant";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "Product Name", label: "Product Name", alignRight: false },
  { id: "Order Id", label: "Order Id", alignRight: false },
  { id: "customer", label: "Customer", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "Payment Method", label: "Payment Method", alignRight: false },
  { id: "Price", label: "Price", alignRight: false },
  { id: "Product Quantity", label: "Product Quantity", alignRight: false },
  { id: "Created At", label: "Created At", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_user) =>
        _user.product_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage({ orders, onOpenHandler }) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const modalHandler = (ssid) => {
    setModal(true);
    setId(ssid);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const filteredUsers = applySortFilter(
    orders,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container maxWidth={"xl"}>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orders.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        image,
                        price,
                        created_at,
                        order_id,
                        payment_method,
                        product_quantity,
                        product_name,
                        id,
                        fname,
                        lname,
                        email,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell component="th" scope="row">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={image}
                                src={`${PDC_IMAGE}${image}`}
                              />
                              <Typography
                                variant="subtitle2"
                                noWrap
                              ></Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{product_name}</TableCell>

                          <TableCell align="left">{order_id}</TableCell>

                          <TableCell align="left">
                            {fname + " " + lname}
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="center">{payment_method}</TableCell>

                          <TableCell align="left">{price}</TableCell>

                          <TableCell align="center">
                            {product_quantity}
                          </TableCell>

                          <TableCell align="left">{created_at}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              color="error"
                              onClick={() =>
                                navigate(`/ad-min/order/invoice?o=${order_id}`)
                              }
                            >
                              <Iconify icon={"fa:file-pdf-o"} width={20} />
                            </IconButton>

                            <IconButton
                              onClick={() => onOpenHandler(id)}
                              color="primary"
                            >
                              <Iconify icon={"ph:eye"} width={20} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
