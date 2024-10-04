import {
  Box,
  Typography,
  Card,
  Grid,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Switch,
  Tooltip,
  Skeleton,
} from "@mui/material";

import { useForm } from "react-hook-form";

import Pagination from "@mui/material/Pagination";

import Modal from "@mui/material/Modal";

import React, { useEffect, useState } from "react";
import Iconify from "../../components/iconify/Iconify";
import {
  GetCategory,
  updateCategory,
  deleteCategory,
  updateCategoryonTop,
} from "../../../services/operations/listing";
import { useSearchParams } from "react-router-dom";
import CustomTextField from "../../components/custom-textfield/customtextfield";

export default function BusinessCategory() {
  const [state, setState] = useState([]);
  const [length, setLength] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);

  const [peta, setPeta] = useState({});

  useEffect(() => {
    setLoading(true);
    (async () => {
      const page = searchParams.get("page")
        ? `?page=${searchParams.get("page")}`
        : "";

      const data = await GetCategory(page);
      setState(data.data);
      setLength(data.length);
      setLoading(false);
    })();
  }, [searchParams]);

  const PageHandler = (page) => {
    setSearchParams({ page });
  };

  const deleteHandler = async (i) => {
    const u = [...state];
    await deleteCategory(i);
    u.filter((o) => o.id !== id);
    setState(u);
  };

  const handleOpen = (d) => {
    setPeta({ ...d });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const updateTopStatus = async (id) => {
    setLoading(true);
    const u = [...state];

    const obb = u.find((o) => o.id === id);
    await updateCategoryonTop({
      id,
      status: !obb.onTop,
    });

    obb.onTop = !obb.onTop;

    setState(u);
    setLoading(false);
  };

  return (
    <>
      <Box>
        <Typography variant="h3" fontWeight="700">
          Business Category
        </Typography>

        <Grid container gap={5} mt={10}>
          {!loading ? (
            <>
              {state?.map((category) => (
                <Grid item md={3} key={category.id}>
                  <CaCard
                    id={category}
                    handleOpen={handleOpen}
                    category={category}
                    deleteHandler={deleteHandler}
                    updateTopStatus={updateTopStatus}
                  />
                </Grid>
              ))}
            </>
          ) : (
            [...Array(18)].map((e) => (
              <Skeleton variant="rectangular" width={400} height={118} />
            ))
          )}
        </Grid>

        <Box my={10}>
          <Pagination
            count={Math.ceil(length / 18) ?? 18}
            page={+searchParams.get("page") || 1}
            onChange={(_, page) => PageHandler(page)}
            variant="outlined"
            color="primary"
          />
        </Box>
      </Box>

      <EditModal open={open} data={peta} handleClose={handleClose} />
    </>
  );
}

const CaCard = ({ category, handleOpen, deleteHandler, updateTopStatus }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle1" color="text.secondary">
        {category.title}
      </Typography>
    </CardContent>

    <CardActions disableSpacing>
      <Tooltip title="edit">
        <IconButton
          onClick={() => handleOpen(category)}
          color="primary"
          size="small"
        >
          <Iconify icon="material-symbols:edit" />
        </IconButton>
      </Tooltip>

      <Tooltip title="delete">
        <IconButton
          onClick={() => deleteHandler(category.id)}
          color="error"
          size="small"
        >
          <Iconify icon="material-symbols:delete" />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={
          !category.onTop ? "set to top category" : "remove from top category"
        }
      >
        <Switch
          onChange={() => updateTopStatus(category.id)}
          checked={category.onTop}
          size="small"
          inputProps={{ "aria-label": "controlled" }}
        />
      </Tooltip>
    </CardActions>
  </Card>
);

function EditModal({ handleClose, open, data }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const { handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    setValue("title", data.title);
  }, [data]);

  const updateHandler = async (event) => {
    const d = { ...event, id: data.id };
    handleClose();
    await updateCategory(d);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Category
          </Typography>

          <Box onSubmit={handleSubmit(updateHandler)} component="form" mt={10}>
            <CustomTextField control={control} name="title" label="Title" />

            <div style={{ display: "flex", columnGap: 8, marginTop: "18px" }}>
              <Button type="submit" variant="contained" size="small">
                Save
              </Button>

              <Button variant="contained" color="error" size="small">
                cancel
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
