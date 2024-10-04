import { Card, Stack, styled, TextField, Typography } from "@mui/material";
import React from "react";

// component -------------------------------

import ReactQuill from "react-quill";

// styling-------------------------------------

const StyledContainer = styled("div")(({ theme }) => ({
  width: "100%",
}));

const ProductDetail = ({ state, setState, validate }) => {
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const DiscriptionHandler = (e) => {
    setState({ ...state, description: e });
  };

  const SizingHandler = (e) => {
    setState({ ...state, sizing: e });
  };

  const CareandcompoHandler = (e) => {
    setState({ ...state, careandcare: e });
  };

  return (
    <Card sx={{ padding: 4, boxShadow: (theme) => theme.shadows[9] }}>
      <Stack spacing={4}>
        <TextField
          onChange={(e) => changeHandler(e)}
          name="post_name"
          label="title"
          id="title"
          error={validate && state.title === "" ? true : false}
          helper={
            validate && state.title === "" ? "This field is  required *" : false
          }
          value={state.title}
          InputLabelProps={{ shrink: true }}
        />

        <StyledContainer>
          <Typography variant="button" color="gray">
            Description
          </Typography>

          <ReactQuill
            onChange={(e) => DiscriptionHandler(e)}
            theme="snow"
            value={state.description}
            style={{ marginTop: "10px" }}
          />
        </StyledContainer>

        <StyledContainer>
          <Typography variant="button" color="gray">
            Sizing
          </Typography>

          <ReactQuill
            id="sizing"
            theme="snow"
            onChange={(e) => SizingHandler(e)}
            value={state.sizing}
            style={{ marginTop: "10px" }}
          />
        </StyledContainer>

        <StyledContainer>
          <Typography variant="button" color="gray">
            Composition And Care
          </Typography>

          <ReactQuill
            onChange={(e) => CareandcompoHandler(e)}
            theme="snow"
            value={state.careandcare}
            style={{ marginTop: "10px" }}
          />
        </StyledContainer>
      </Stack>
    </Card>
  );
};

export default ProductDetail;
