/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState, useEffect } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Checkbox,
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
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock

import { USERSERVICE } from "../services/apiServices/apiService";
import { sentenceCase } from "change-case";
import AlertDialog from "../components/dialogBox";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "" },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "createdAt", label: "Created At", alignRight: false },
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
      (_user) => _user.fname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [modal, setModal] = useState(false);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState([]);

  const [id, setId] = useState([]);

  const handleOpenMenu = () => {
    USERSERVICE({ method: "DELETE", bId: id }).then((e) => {
      if (e.data.status == 200) {
        setModal(false);
      }
    });
  };

  const modalHandler = (ssid) => {
    setModal(true);
    setId(ssid);
  };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  useEffect(() => {
    USERSERVICE({ method: "GET" }).then((e) => setUsers(e.data));
  }, [id, modal]);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | ikshita Choudhary </title>
      </Helmet>
      <Container>
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
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { client_id, fname, lname, email, status, date } =
                        row;
                      const selectedUser = selected.indexOf(fname) !== -1;

                      return (
                        <TableRow
                          hover
                          key={client_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, fname)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={fname}
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/avatars/avatar_${21}.jpg`}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {fname + " " + lname}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{""}</TableCell>

                          <TableCell align="left">
                            <Label color={status == 1 ? "success" : "error"}>
                              {sentenceCase(
                                status == 1 ? "Verified" : "Refuted"
                              )}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            <Label color={status == 1 ? "success" : "error"}>
                              {sentenceCase(
                                status == 1 ? "Active" : "inactive"
                              )}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            {date.split(" ")[0]}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="error"
                              onClick={() => modalHandler(client_id)}
                            >
                              <Iconify
                                icon={"eva:trash-2-outline"}
                                width={23}
                              />
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
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <AlertDialog
        open={modal}
        close={setModal}
        head={"User"}
        confirm={handleOpenMenu}
      />
    </>
  );
}
