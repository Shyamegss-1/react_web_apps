import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CustomTextField from "../../components/custom-textfield/customtextfield";
import { useSelector } from "react-redux";
import {
  getDepartmentData,
  setDepartmentData,
  updateDepartmentData,
} from "../../../services/operations/departmentApi";
import { useNavigate } from "react-router-dom";

export default function EditCategories({ open, setOpen, setData }) {
  const { handleSubmit, control, reset, setValue } = useForm();

  const navigate = useNavigate();

  const { token } = useSelector((e) => e.auth);

  let i = Number(new URLSearchParams(window.location.search).get("i"));
  let type = new URLSearchParams(window.location.search).get("t");

  const onSubmit = async (data) => {
    setOpen((open) => !open);

    const result = await setDepartmentData(token, data, navigate);
    reset();

    setData(result);
  };

  const onUpdateHandler = async (data) => {
    setOpen(false);
    const result = await updateDepartmentData(
      token,
      { id: i, ...data },
      navigate
    );
    setData(result);
    reset();
  };

  useEffect(() => {
    if (i) {
      (async () => {
        const data = await getDepartmentData(token, navigate);
        const filtered = data.filter((e) => e.id === i)[0];

        setValue("title", filtered.name);
        setValue("description", filtered.description);
      })();
    }
  }, [i, type]);

  const closeHandler = () => {
    reset();
    setOpen(false);
  };

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
