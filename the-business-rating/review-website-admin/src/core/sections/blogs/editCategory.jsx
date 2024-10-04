import React, { useEffect } from "react";

// @mui
import {
  Card,
  Container,
  Stack,
  styled,
  IconButton,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

import { Controller, useForm } from "react-hook-form";
import {
  PostBlogCategory,
  UpdateBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
} from "../../../services/operations/blog";

import DeleteIcon from "@mui/icons-material/Delete";

export default function EditCategory() {
  const [editPanel, setEditPanel] = React.useState("Asdsa");
  const [data, setData] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  const [id, setId] = React.useState("sda");

  const { control, reset } = useForm();

  useEffect(() => {
    (async () => {
      const data = await getBlogCategory();
      setData(data);
    })();
  }, []);

  const categoryAddHandler = () => {
    setModal(!modal);
  };

  const modalHandlers = (ssid) => {};

  const updateHandler = async (id) => {
    await UpdateBlogCategory({
      id,
      name: editPanel,
    });
    let sta = [...data];
    const y = sta.filter((x) => x.id === id)[0];

    y.name = editPanel;

    setData(sta);

    setId("sda");
  };

  const deleteHandler = async (id) => {
    await deleteBlogCategory(id);
    let sta = [...data];
    const y = sta.filter((x) => x.id !== id);
    setData(y);
  };

  const uploadHandler = async function (el) {
    const r = await PostBlogCategory(el);
    let sta = [...data, r];
    setData(sta);
    setModal(false);
  };

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Post Category
          </Typography>

          <Button
            onClick={() => categoryAddHandler()}
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Category
          </Button>
        </Stack>

        {data.length ? (
          <>
            {" "}
            {data?.map((e) => (
              <Card
                key={e?.id}
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
                    {id !== e?.id ? (
                      <Typography variant="subtitle1">{e.name}</Typography>
                    ) : (
                      <TextField
                        sx={{ width: "100%" }}
                        id={e?.id}
                        type="text"
                        defaultValue={e.name}
                        size="small"
                        onChange={(e) => setEditPanel(e.target.value)}
                        variant="standard"
                      />
                    )}
                  </StyledBox>

                  <StyledBox>
                    <Stack direction="row" justifyContent="flex-end">
                      {id === e.id && (
                        <IconButton
                          onClick={() => updateHandler(e.id)}
                          size="small"
                        >
                          <SaveIcon />
                        </IconButton>
                      )}

                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => setId(e.id)}
                      >
                        <EditIcon icon={"material-symbols:edit"} />
                      </IconButton>

                      {id === e.id && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setId("SADsa")}
                        >
                          <CancelIcon />
                        </IconButton>
                      )}

                      {id !== e.id && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteHandler(e.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </StyledBox>
                </Stack>
              </Card>
            ))}
          </>
        ) : (
          <Typography variant="h6" textAlign="center">
            No Categories
          </Typography>
        )}
        {modal && (
          <AddCategoryHandler
            uploadHandler={uploadHandler}
            categoryAddHandler={categoryAddHandler}
          />
        )}
      </Container>
    </>
  );
}

const StyledBox = styled("div")({
  width: "50%",
  textAlign: "start",
});

function AddCategoryHandler({ categoryAddHandler, uploadHandler }) {
  const { control, handleSubmit } = useForm();

  const submitHandler = (event) => {
    uploadHandler(event.ssss);
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
      <Stack
        direction="row"
        component="form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <StyledBox>
          <Controller
            control={control}
            rules={{ required: "This field is required" }}
            name="ssss"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ width: "100%" }}
                type="text"
                focused
                onChange={onChange}
                value={value}
                size="small"
                error={!!error}
                variant="standard"
              />
            )}
          />
        </StyledBox>
        <StyledBox>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton type="submit" size="small">
              <SaveIcon />
            </IconButton>

            <IconButton
              onClick={() => categoryAddHandler()}
              size="small"
              color="error"
            >
              <CancelIcon />
            </IconButton>
          </Stack>
        </StyledBox>
      </Stack>
    </Card>
  );
}
