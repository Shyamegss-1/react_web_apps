import { Helmet } from "react-helmet-async";
import React from "react";

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
// components
import Iconify from "../components/iconify/Iconify";
import AddCategory from "../sections/@dashboard/Category/addCategory";
import { CATEGORYSERVICE } from "../services/apiServices/apiService";
import AlertDialog from "../components/dialogBox";

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [editPanel, setEditPanel] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  const [id, setId] = React.useState();

  const handleOpenMenu = () => {
    let enData = data.filter((e, i) => {
      if (e.id !== id) {
        return data;
      }
      return true;
    });
    setData(enData);

    CATEGORYSERVICE({ method: "DELETE", bId: id });

    setModal(false);
  };

  const modalHandlers = (ssid) => {
    setModal(true);
    setId(ssid);
  };

  const CategoryHandler = (id) => {
    let item = data?.map((e) =>
      e.id === id ? { ...e, edit: true } : { ...e, edit: false }
    );

    setData(item);
  };

  const saveHandler = (id) => {
    let item = data?.map((e) =>
      e.id === id ? { ...e, edit: false } : { ...e, edit: false }
    );

    setData(item);

    data.filter((e) => {
      if (e.id === id) {
        CATEGORYSERVICE({ method: "UPDATE", bId: e.id, title: e.title });
      }
    });
  };

  const updateHandler = function (el) {
    let item = data?.map((e) =>
      e.id === Number(el.target.id)
        ? { ...e, title: el.target.value }
        : { ...e }
    );
    setData(item);
  };

  React.useEffect(() => {
    CATEGORYSERVICE({ method: "GET" }).then((e) => {
      const array = [];
      e.data.forEach((element) => {
        array.push({ edit: false, id: element.id, title: element.title });
      });
      setData(array);
    });
  }, []);

  const modalHandler = () => {
    setEditPanel(true);

    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Category | sessun </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Product Category
          </Typography>

          <Button
            onClick={() => modalHandler()}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
          </Button>
        </Stack>

        {data.map((e) => (
          <Card
            key={e.id}
            sx={{
              width: "50%",
              m: "auto",
              p: 2,
              mb: 3,
              border: "2px solid #955cfd",
            }}
          >
            <Stack direction="row">
              <StyledBox>
                {!e.edit ? (
                  <Typography variant="subtitle1">{e.title}</Typography>
                ) : (
                  <TextField
                    sx={{ width: "100%" }}
                    id={e.id}
                    type="text"
                    defaultValue={e.title}
                    size="small"
                    onChange={(e) => updateHandler(e)}
                    variant="standard"
                  />
                )}
              </StyledBox>

              <StyledBox>
                <Stack direction="row" justifyContent="flex-end">
                  {e.edit && (
                    <IconButton onClick={() => saveHandler(e.id)} size="small">
                      <Iconify icon={"material-symbols:save"} />
                    </IconButton>
                  )}

                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => CategoryHandler(e.id)}
                  >
                    <Iconify icon={"material-symbols:edit"} />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => modalHandlers(e.id)}
                  >
                    <Iconify icon={"material-symbols:delete-outline-rounded"} />
                  </IconButton>
                </Stack>
              </StyledBox>
            </Stack>
          </Card>
        ))}

        {editPanel && (
          <AddCategory
            data={data}
            setData={setData}
            setEditPanel={setEditPanel}
          />
        )}

        <AlertDialog
          open={modal}
          close={setModal}
          head={"Category"}
          confirm={handleOpenMenu}
        />
      </Container>
    </>
  );
}

const StyledBox = styled("div")({
  width: "50%",
  textAlign: "start",
});
