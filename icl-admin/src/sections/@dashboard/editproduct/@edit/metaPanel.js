import React from "react";
import {
  Card,
  MenuItem,
  Select,
  Stack,
  FormControl,
  TextField,
  InputLabel,
} from "@mui/material";
import { CATEGORYSERVICE } from "../../../../services/apiServices/apiService";

const MetaPanel = ({ state, setState, validate }) => {
  const [data, setData] = React.useState([]);

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    CATEGORYSERVICE({ method: "GET" }).then((e) => {
      setData(e.data);
    });
  }, []);

  return (
    <Card
      sx={{
        marginBottom: "20px",
        padding: 3,
        boxShadow: (theme) => theme.shadows[9],
      }}
    >
      <Stack spacing={3}>
        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">
            Categorie
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            name="category"
            label="categorie"
            error={validate && state.category === "" ? true : false}
            helper={
              validate && state.category === ""
                ? "This field is  required *"
                : false
            }
            value={state.category != null ? state.category : ""}
            onChange={(e) => changeHandler(e)}
          >
            {data.map((e) => (
              <MenuItem key={e.id} value={e.title}>
                {e.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="metatitle"
          onChange={(e) => changeHandler(e)}
          label="Meta Title"
          InputLabelProps={{ shrink: true }}
          value={state.metatitle}
          error={validate && state.metatitle === "" ? true : false}
          helper={
            validate && state.metatitle === ""
              ? "This field is  required *"
              : false
          }
        />

        <TextField
          name="metakeyword"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => changeHandler(e)}
          label="Meta Keyword"
          value={state.metakeyword}
          error={validate && state.metakeyword === "" ? true : false}
          helper={
            validate && state.metakeyword === ""
              ? "This field is  required *"
              : false
          }
        />

        <TextField
          name="metadiscription"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => changeHandler(e)}
          label="Meta Description"
          value={state.metadiscription}
          error={validate && state.metadiscription === "" ? true : false}
          helper={
            validate && state.metadiscription === ""
              ? "This field is  required *"
              : false
          }
        />
      </Stack>
    </Card>
  );
};

export default MetaPanel;
