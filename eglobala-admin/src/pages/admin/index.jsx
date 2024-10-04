import React, { useState } from "react";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// * icons

// *
import { toast } from "react-hot-toast";

import CustomBreadcrumbs from "../../core/components/custom-breadcrumbs/custom-breadcrumbs";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import CustomTextField from "../../core/components/custom-textfield/customtextfield";
import { UpdatePassword } from "../../services/operations/settingAPI";

export default function Index() {
  const { token } = useSelector((e) => e.auth);

  const { control, reset, handleSubmit, getValues } = useForm();

  const navigate = useNavigate();

  const [state, setState] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const submit = (e) => {
    const r = getValues("new");
    const confirm = getValues("confirm");

    if (r !== confirm) {
      toast.error("passwords you entered don't match");
    } else {
      UpdatePassword(token, navigate, e);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" mt={10}>
          <CustomBreadcrumbs
            heading="Setting"
            links={[
              {
                name: "Dashboard",
                href: "/",
              },
              {
                name: "Setting",
                href: "#",
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />
        </Stack>

        <Grid container my={10}>
          <Grid lg={6} mb={5}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Details
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Update your current password.
            </Typography>
          </Grid>

          <Grid item lg={6} xs={12}>
            <Box onSubmit={handleSubmit(submit)} component="form">
              <Stack spacing={5}>
                <CustomTextField
                  control={control}
                  name="current"
                  type="password"
                  label="Currrent password"
                />

                <CustomTextField
                  control={control}
                  name="new"
                  type="password"
                  label="New password"
                />

                <CustomTextField
                  control={control}
                  name="confirm"
                  type="password"
                  label="Confirm password"
                />
              </Stack>

              <Stack direction="row" mt={7}>
                <Button type="submit" variant="contained">
                  update
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
