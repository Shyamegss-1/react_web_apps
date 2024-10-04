import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { dateFormater } from "../../utils/dateFormatter";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", "12 Aug 2023", "12 Aug 2023", "Stripe", "Active"),
  createData("2", "12 Aug 2023", "12 Aug 2023", "Stripe", "Active"),
  createData("3", "12 Aug 2023", "12 Aug 2023", "Stripe", "Active"),
  createData("4", "12 Aug 2023", "12 Aug 2023", "Stripe", "Active"),
  createData("5", "12 Aug 2023", "12 Aug 2023", "Stripe", "Active"),
  createData("6", "12 Aug 2023", "12 Aug 2023", "Stripe", "Active"),
];

export default function SubDetailPage({ data }) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>S. No.</TableCell>
            <TableCell align="right">Plan Starting Date</TableCell>
            <TableCell align="right">Plan Ending Date</TableCell>
            <TableCell align="right">Payment Mode</TableCell>
            <TableCell align="right">Plan Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}.
              </TableCell>
              <TableCell align="right">
                {dateFormater(row.currentPlanStart)}
              </TableCell>
              <TableCell align="right">
                {dateFormater(row.currentPlanEnd)}
              </TableCell>
              <TableCell align="right">card</TableCell>
              <TableCell align="right">
                <Chip
                  label={row.planActive ? "Active" : "Expire"}
                  color={row.planActive ? "success" : "error"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
