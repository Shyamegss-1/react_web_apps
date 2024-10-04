import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import { IconButton, Typography } from "@mui/material";
import Iconify from "../../../components/iconify/Iconify";
import { CONTACTSERVICE } from "../../../services/apiServices/apiService";

import AlertDialog from "../../../components/dialogBox";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ContactTable() {
  const [state, setstate] = React.useState([]);

  const [count, setCount] = React.useState(0);

  const [modal, setModal] = React.useState(false);

  const [id, setId] = React.useState([]);

  const handleOpenMenu = () => {
    CONTACTSERVICE({ method: "DELETE", bId: id }).then((e) => e);
    setCount(count + 1);

    setModal(false);
  };

  const modalHandler = (ssid) => {
    setModal(true);
    setId(ssid);
  };

  React.useEffect(() => {
    CONTACTSERVICE({ method: "GET" }).then((e) => setstate(e.data));
  }, [modal, id]);

  return (
    <>
      <TableContainer
        component={Card}
        sx={{ boxShadow: (theme) => theme.shadows[9] }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((row) => (
              <TableRow
                key={row.contact_id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },

                  "&:hover": { background: "rgba(145, 158, 171, 0.08)" },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>

                <TableCell align="right">
                  <Typography fontSize={13} noWrap variant="caption">
                    {row.message}
                  </Typography>
                </TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => modalHandler(row.contact_id)}
                    color="error"
                  >
                    <Iconify icon="ic:baseline-delete-outline" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AlertDialog
        open={modal}
        close={setModal}
        head={"Messgae"}
        confirm={handleOpenMenu}
      />
    </>
  );
}
