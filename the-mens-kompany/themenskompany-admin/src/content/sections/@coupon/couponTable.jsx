import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { IconButton, MenuItem } from "@mui/material";
import Iconify from "../../../components/iconify/Iconify";

import usePopover from "../../../components/custom-popover/use-popover";
import CustomPopover from "../../../components/custom-popover/custom-popover";
import { LoadingButton } from "@mui/lab";

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "#",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "CouponName",
    numeric: false,
    disablePadding: false,
    label: "Coupon Name",
  },
  {
    id: "CouponType",
    numeric: false,
    disablePadding: false,
    label: "Coupon Type",
  },
  {
    id: "CouponValue",
    numeric: false,
    disablePadding: false,
    label: "Coupon Value",
  },
  {
    id: "Status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "Action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    ></Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function CouponTable({
  user,
  setOpen,
  setId,
  setState,
  updateHandler,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [o, setO] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = user.map((n) => n.order_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(user, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, user]
  );

  const popover = usePopover();

  const staahndler = () => {
    setO(true);
    setTimeout(() => {
      setO(false);
    }, 1000);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={user.length}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row?.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.order_id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="center" id={labelId} scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.couponname}</TableCell>
                    <TableCell align="center">{row.coupontype}</TableCell>
                    <TableCell align="center">{row.couponvalue}</TableCell>
                    <TableCell align="center">
                      <LoadingButton
                        size="small"
                        variant="contained"
                        color={
                          row.couponstatus === "active" ? "success" : "error"
                        }
                        loading={o}
                        onClick={(e) => {
                          popover.onOpen(e);

                          setState({
                            couponname: row.couponname,
                            coupontype: row.coupontype,
                            couponvalue: row.couponvalue,
                            active: row.couponstatus,
                          });

                          setId(row.id);
                        }}
                        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                        loadingIndicator="updating..."
                        sx={{ textTransform: "capitalize" }}
                      >
                        {row.couponstatus}
                      </LoadingButton>

                      <CustomPopover
                        open={popover.open}
                        onClose={popover.onClose}
                        arrow="top-right"
                        sx={{ width: 140 }}
                      >
                        {POST_PUBLISH_OPTIONS.map((option) => (
                          <MenuItem
                            key={option.value}
                            onClick={() => {
                              popover.onClose();
                              staahndler();
                              updateHandler(option.value);
                            }}
                          >
                            {option.value === "active" && (
                              <Iconify width={17} icon="basil:pause-solid" />
                            )}
                            {option.value === "inactive" && (
                              <Iconify width="16" icon="solar:play-bold" />
                            )}
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomPopover>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setOpen(true);
                          setState({
                            couponname: row.couponname,
                            coupontype: row.coupontype,
                            couponvalue: row.couponvalue,
                            active: row.couponstatus,
                          });
                          setId(row.id);
                        }}
                      >
                        <Iconify icon="solar:settings-bold" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

const POST_PUBLISH_OPTIONS = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];
