import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { dateFormater } from "../../core/utils/dateFormatter";

import { useNavigate } from "react-router-dom";

export default function SubTable({ data = [] }) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Listing</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Plan Ending Date</TableCell>
            <TableCell align="center">Total Purchase</TableCell>
            <TableCell align="right">Purchase History</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.website}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.website}
              </TableCell>

              <TableCell align="center">
                {row.fname} {row.lname}
              </TableCell>

              <TableCell align="center">
                {dateFormater(row.lastMatchingField)}
              </TableCell>
              <TableCell align="center">{row.subscriptionCount}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() =>
                    navigate(
                      `/admin/businessuser/subscription?search=${row.listingid}`
                    )
                  }
                  variant="contained"
                  size="small"
                >
                  Check
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
