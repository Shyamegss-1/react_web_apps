import React, { useState } from "react";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// * icons

import AddIcon from "@mui/icons-material/Add";

// *

import CustomBreadcrumbs from "../../core/components/custom-breadcrumbs/custom-breadcrumbs";
import JobTable from "../../core/sections/jobs/jobTable";
import { Link, useNavigate } from "react-router-dom";
import useOnceEffect from "../../core/hooks/useOnce";
import {
  deleteJobposttData,
  getJobpostData,
} from "../../services/operations/jobsApi";
import { useSelector } from "react-redux";
import CarrerTable from "../../core/sections/carrer/carrerTable";
import {
  deleteVisitData,
  getVisitorData,
} from "../../services/operations/visitApi";

export default function Index() {
  const { token } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([]);

  useOnceEffect(async () => {
    const result = await getVisitorData(token, navigate, true, "careers");
    setState(result);
  }, []);

  const deleteHadler = async (id) => {
    const result = await deleteVisitData(token, id, navigate, "careers");
    setState(result);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" mt={10}>
          <CustomBreadcrumbs
            heading="Carrer"
            links={[
              {
                name: "Dashboard",
                href: "/admin/",
              },
              {
                name: "carrer",
                href: "#",
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <Box>
            <Button
              LinkComponent={Link}
              to="/admin/jobs/edit"
              startIcon={<AddIcon />}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Stack>

        {state.length > 0 ? (
          <CarrerTable data={state} deleteHadler={deleteHadler} />
        ) : (
          <Box my={30}>
            <Typography variant="inherit" textAlign="center">
              We couldn't find any information to show.
            </Typography>
            <Typography variant="inherit" textAlign="center">
              Click <span className="stle-dir">here</span> to add new department
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
