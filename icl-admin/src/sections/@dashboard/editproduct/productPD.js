import {
  Card,
  Stack,
  Switch,
  FormControlLabel,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import React from "react";

import MetaPanel from "./@edit/metaPanel";
import ImageConatiner from "./ImageConatiner";

const ProductPD = ({
  state,
  setState,
  pImages,
  setpImages,
  validate,
  Edit,
}) => {
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <MetaPanel state={state} setState={setState} validate={validate} />

      <Card
        sx={{ padding: 3, boxShadow: (theme) => theme.shadows[9] }}
        id="withhjk"
      >
        <Typography variant="button" color="gray">
          Images
        </Typography>

        <ImageConatiner pImages={pImages} Edit={Edit} setpImages={setpImages} />
      </Card>

      <Card sx={{ padding: 3, mt: 3, boxShadow: (theme) => theme.shadows[9] }}>
        <Stack spacing={3}>
          <FormControlLabel
            onChange={() =>
              setState({ ...state, isSale: state.isSale == 1 ? 0 : 1 })
            }
            control={<Switch />}
            label="In sale"
            checked={state.isSale == 1 ? true : false}
          />

          <TextField
            name="regularprice"
            label="Regular Price"
            error={validate && state.regularprice === "" ? true : false}
            helper={
              validate && state.regularprice === ""
                ? "This field is  required *"
                : false
            }
            value={state.regularprice}
            onChange={(e) => changeHandler(e)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          {state.isSale == 0
            ? false
            : true && (
                <TextField
                  name="saleprice"
                  label="Sale Price"
                  value={state.saleprice}
                  onChange={(e) => changeHandler(e)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              )}
        </Stack>
      </Card>
    </>
  );
};

export default ProductPD;
