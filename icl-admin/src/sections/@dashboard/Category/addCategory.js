import React from "react";

import { Stack, IconButton, TextField, styled, Card } from "@mui/material";
import Iconify from "../../../components/iconify/Iconify";
import { CATEGORYSERVICE } from "../../../services/apiServices/apiService";

const AddCategory = ({ data, setData, setEditPanel }) => {
  const [state, setstate] = React.useState({
    id: data.length + 1,
    title: null,
    edit: false,
  });

  const changeHandler = (e) => {
    setstate({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const saveHandler = () => {
    setData([...data, state]);
    setEditPanel(false);

    CATEGORYSERVICE({ method: "INSERT", title: state.title });
  };

  return (
    <Card
      sx={{
        width: "50%",
        m: "auto",
        p: 2,
        mb: 3,
        border: "2px solid rgb(65 65 65)",
      }}
    >
      <Stack direction="row">
        <StyledBox>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            size="small"
            id="title"
            variant="standard"
            onChange={(e) => changeHandler(e)}
          />
        </StyledBox>

        <StyledBox>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton size="small" onClick={() => saveHandler()}>
              <Iconify icon={"material-symbols:save"} />
            </IconButton>

            <IconButton
              size="small"
              color="error"
              onClick={() => setEditPanel(false)}
            >
              <Iconify icon={"ic:baseline-cancel"} />
            </IconButton>
          </Stack>
        </StyledBox>
      </Stack>
    </Card>
  );
};

export default AddCategory;

const StyledBox = styled("div")({
  width: "50%",
  textAlign: "start",
});
