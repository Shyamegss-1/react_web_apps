import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import CustomTextField from "../../components/custom-textfield/customtextfield";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSubcategoryData,
  updateSubcategoryData,
  getSubcategoryData,
} from "../../../services/operations/subcategoryApi";
import { MenuItem } from "@mui/material";
import { getDepartmentData } from "../../../services/operations/departmentApi";

export default function EditCategories({ open, setOpen, setData }) {
  const { handleSubmit, control, reset, setValue, getValues } = useForm();

  const navigate = useNavigate();

  const { token } = useSelector((e) => e.auth);

  const [state, setState] = useState([]);

  let i = Number(new URLSearchParams(window.location.search).get("i"));

  const onSubmit = async (data) => {
    setOpen((open) => !open);

    const result = await setSubcategoryData(token, data, navigate);
    reset();

    setData(result);
  };

  const closeHandler = () => {
    reset();
    setOpen(false);
  };

  const onUpdateHandler = async (data) => {
    setOpen(false);
    const result = await updateSubcategoryData(
      token,
      { id: i, ...data },
      navigate
    );
    setData(result);
    reset();
  };

  useEffect(() => {
    (async () => {
      const result = await getDepartmentData(token, navigate);
      setState(result);
    })();

    if (i) {
      (async () => {
        const data = await getSubcategoryData(token, navigate);
        const filtered = data.filter((e) => e.id === i)[0];

        setValue("title", filtered.title);
        setValue("description", filtered.description);
        setValue("category", Number(filtered.category_id));
      })();
    }
  }, [i]);

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={closeHandler}
      sx={{
        height: "100vh",
      }}
    >
      <Box p={4} minWidth={600} minHeight="100%">
        <Stack
          onSubmit={handleSubmit(i ? onUpdateHandler : onSubmit)}
          height="100%"
          component="form"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6" mb>
              Edit Department
            </Typography>

            <Stack spacing={3} mt={7}>
              <CustomTextField control={control} name="title" label="Title" />

              <Controller
                name="category"
                control={control}
                rules={{ required: "This field is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={value}
                      onChange={onChange}
                      label="Department"
                      name="category"
                    >
                      {state.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <span>{error.message}</span>}
                  </FormControl>
                )}
              />

              <CustomTextField
                control={control}
                name="description"
                label="Description"
                row={7}
              />
            </Stack>
          </Box>

          <Box>
            <Button variant="contained" type="submit">
              {!i ? "Save" : "update"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}
