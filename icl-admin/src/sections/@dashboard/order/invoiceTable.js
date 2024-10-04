import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

export default function InvoiceTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}

          <TableRow
            sx={{
              "& td": { border: 0 },
            }}
          >
            <TableCell scope="row" colSpan={4}></TableCell>
          </TableRow>

          <TableRow
            sx={{
              "& td": { border: 0, padding: "5px 10px" },
            }}
          >
            <TableCell scope="row" colSpan={4}></TableCell>
            <TableCell scope="row" align="right">
              Subtotal
            </TableCell>

            <TableCell scope="row" align="right">
              $89.09
            </TableCell>
          </TableRow>

          <TableRow sx={{ "& td": { border: 0, padding: "5px 10px" } }}>
            <TableCell scope="row" colSpan={4}></TableCell>
            <TableCell scope="row" align="right">
              Discount
            </TableCell>
            <TableCell scope="row" align="right">
              <Typography color="red">-$10</Typography>
            </TableCell>
          </TableRow>

          <TableRow sx={{ "& td": { border: 0, padding: "5px 10px" } }}>
            <TableCell scope="row" colSpan={4}></TableCell>
            <TableCell scope="row" align="right">
              Taxes
            </TableCell>
            <TableCell scope="row" align="right">
              $10.09
            </TableCell>
          </TableRow>

          <TableRow sx={{ "& td": { border: 0, padding: "5px 10px" } }}>
            <TableCell scope="row" colSpan={4}></TableCell>
            <TableCell scope="row" align="right">
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>

            <TableCell scope="row" align="right">
              <Typography variant="subtitle1"> $89.09</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
