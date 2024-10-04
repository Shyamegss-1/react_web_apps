import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

//* Icon
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { dateFormater } from "../../utils/dateFormatter";

import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { Backdrop, Button, CircularProgress, Tooltip } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import { claimAdminListing } from "../../../services/operations/listing";
import toast from "react-hot-toast";

export const IMAGE_URL = "https://thetestingserver.com/review-web-s/image/";

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
    id: "name",
    label: "Website link",
  },
  {
    id: "Companyname",
    label: "Company name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "createdat",
    label: "Created At",
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
        <TableCell>
          <Box></Box>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
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
        <TableCell>
          <Box></Box>
        </TableCell>
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

export default function JobTable({
  data,
  deleteHandler,
  setSelectedOption,
  setOpen,
  updateHandler,
  listingVerifyHandler,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [claimId, setClaimId] = React.useState(0);

  const [openp, setOpenp] = React.useState(false);

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  const MODE = import.meta.env.MODE;
  let uri = MODE === "development" ? "" : "/admin";

  const popupHandler = async (i) => {
    setClaimId(i);
    setOpenp(true);

    let res = await claimAdminListing({ id: i, status: true });

    if (res === "success") {
      toast.success("Listing Claimed Successfully");
    } else {
      toast.success("Something went wrong!! try again");
    }

    setOpenp(false);
    updateHandler(i);
  };

  const editNavigateHandler = (id) => {
    navigate(`/admin/listing/add?e=${id}`);
  };

  console.log(visibleRows);

  return (
    <>
      <Box sx={{ width: "100%" }} component={Card}>
        <Box
          sx={{
            p: { sm: 4 },
          }}
        ></Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                // console.log(row);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="left">
                      <div
                        className="div-jcl"
                        style={
                          row.icon
                            ? { background: `url(${IMAGE_URL + row.icon}` }
                            : {
                                background: `url(${uri}/images/avatars/cddd.avif)`,
                              }
                        }
                      ></div>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {row.website}
                    </TableCell>
                    <TableCell align="center">
                      {row.companyname || "---"}
                    </TableCell>

                    <TableCell align="center"> {row.email || "---"}</TableCell>

                    <TableCell align="center">
                      <Chip
                        label={row.taken ? "Claimed" : " Unclaimed"}
                        color={row.taken ? "success" : "primary"}
                      />
                    </TableCell>

                    <TableCell align="center">
                      {dateFormater(row.createdAt)}
                    </TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Tooltip title="Preview" placement="top">
                          <IconButton
                            disabled={!row.userid}
                            size="small"
                            onClick={() =>
                              navigate(
                                `/admin/businessuser/details?search=${row.userid}`
                              )
                            }
                            color="primary"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Claim" placement="top">
                          <IconButton
                            onClick={() => popupHandler(row.id)}
                            disabled
                            size="small"
                            color="success"
                          >
                            <FileDownloadDoneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="edit" placement="top">
                          <IconButton
                            onClick={() => editNavigateHandler(row.id)}
                            size="small"
                            color="primary"
                          >
                            <ModeEditOutlineOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip
                          title={row.hasadmin ? "Reject" : "Approve"}
                          placement="top"
                        >
                          <IconButton
                            onClick={() => listingVerifyHandler(row.id)}
                            size="small"
                            color="success"
                          >
                            {row.hasadmin ? (
                              <CancelIcon fontSize="small" color="error" />
                            ) : (
                              <CheckCircleIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" placement="top">
                          <IconButton
                            onClick={() => deleteHandler(row.id)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openp}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
