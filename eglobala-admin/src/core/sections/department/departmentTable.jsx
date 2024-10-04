import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { deleteDepartmentData } from "../../../services/operations/departmentApi";
import { useNavigate } from "react-router-dom";

const HeadRow = [
  { title: "#", width: "5%" },
  { title: "Title", width: "20%" },
  { title: "Description", width: "50%" },
  { title: "Action", width: "15%" },
];

export default function DepartmentTable({ data, setData, openHandler }) {
  const { token } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    const data = await deleteDepartmentData(token, id, navigate);
    setData(data);
  };

  return (
    <TableContainer component={Card} elevation={9}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: "#ededed" }}>
          <TableRow>
            {HeadRow.map((e) => (
              <TableCell
                key={e.id}
                align={e.title === "#" ? "" : "center"}
                sx={{ width: e.width }}
              >
                <Typography
                  color="rgb(99, 115, 129)"
                  variant="button"
                  fontWeight="700"
                >
                  {e.title}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              hover
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ fontWeight: "600" }} component="th" scope="row">
                {index + 1}
              </TableCell>

              <TableCell align="center" sx={{ fontWeight: "800" }}>
                {row.name}
              </TableCell>

              <TableCell align="center">{row.description}</TableCell>

              <TableCell align="center">
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => openHandler("e", row.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => deleteHandler(row.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
