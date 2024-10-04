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
import {
  deleteListingData,
  getListingData,
  updateListingData,
  uploadInBulk,
} from "../../services/operations/listing";
import PreviewListing from "../../core/sections/jobs/previewListings";
import toast from "react-hot-toast";
import { Drawer } from "@mui/material";
import BulkUploader from "../../core/sections/jobs/bulkUploader";
import { Padding } from "@mui/icons-material";

export default function Index() {
  const { token } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([]);

  const [open, setOpen] = useState(false);

  const [csvUploader, setCsvUploader] = useState(false);

  const [selectedOption, setSelectedOption] = useState({});

  useOnceEffect(async () => {
    const result = await getListingData(token, navigate, true);
    setState(result);
  }, []);

  const openHandler = () => {
    setOpen(true);
  };

  const deleteHandler = async (ui) => {
    const res = await deleteListingData(ui, token, navigate, true);

    res === "success"
      ? toast.success("Listing deleted successfully")
      : toast.success("something went wrong ! try again");

    if (res === "success") {
      const d = state.filter((e) => e.id !== ui);
      setState(d);
    }
  };

  const updateHandler = (id) => {
    let i = [...state];
    let x = i.filter((e) => e.id === id)[0];
    x.status = true;
    setState(i);
  };

  const listingVerifyHandler = async (id) => {
    let y = [...state];
    let x = y.find((e) => e.id === id);

    x.hasadmin = !x.hasadmin;

    await updateListingData({ id, hasadmin: x.hasadmin });

    setState(y);
  };

  const BulkUploadHandler = async (data) => {
    setCsvUploader(false);
    const d = await uploadInBulk(data);

    if (d) {
      let n = [...state];
      d.map((e) => n.unshift(e));

      setState(n);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" mt={10}>
          <CustomBreadcrumbs
            heading="Business Listing"
            links={[
              {
                name: "Dashboard",
                href: "/",
              },
              {
                name: "Listing",
                href: "#",
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <Box>
            <Button
              onClick={() => navigate("/admin/listing/add")}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginRight: "8px" }}
            >
              Add New business
            </Button>
            <Button
              onClick={() => setCsvUploader(true)}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Bulk uploader
            </Button>
          </Box>
        </Stack>

        {state.length > 0 ? (
          <JobTable
            data={state}
            deleteHandler={deleteHandler}
            setSelectedOption={setSelectedOption}
            setOpen={setOpen}
            updateHandler={updateHandler}
            listingVerifyHandler={listingVerifyHandler}
          />
        ) : (
          <Box my={30}>
            <Typography variant="inherit" textAlign="center">
              We couldn't find any information to show.
            </Typography>
          </Box>
        )}
      </Container>

      <PreviewListing
        setOpen={setOpen}
        open={open}
        openHandler={openHandler}
        selectedOption={selectedOption}
      />

      <Drawer
        open={csvUploader}
        onClose={() => setCsvUploader(false)}
        anchor="right"
      >
        <BulkUploader BulkUploadHandler={BulkUploadHandler} />
      </Drawer>
    </>
  );
}
