import { useState } from "react";
import ReactQuill from "react-quill";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import { useEffect } from "react";
import {
  deleteFooterSettingData,
  getFooterSettingData,
  postFooterSettingData,
  updateFooterSettingData,
} from "../../services/operations/blog";
import {
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";

import Iconify from "../../../src/core/components/iconify/Iconify";

import CustomBreadcrumbs from "../../core/components/custom-breadcrumbs/custom-breadcrumbs";

import AddIcon from "@mui/icons-material/Add";

import { GetCategory } from "../../services/operations/listing";

export default function Index() {
  const [state, setState] = useState("");
  const [textState, setTextState] = useState("");

  const [open, setOpen] = useState(false);

  const [id, setId] = useState(null);

  const [aa, setAa] = useState([]);

  const [category, setCategory] = useState([]);

  const [update, setUpdate] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getFooterSettingData();
      setAa(data);
    })();
  }, [update]);

  useEffect(() => {
    (async () => {
      const data = await GetCategory("?puchi=1");
      setCategory(data.data);
    })();
  }, []);

  const updateHandler = async () => {
    setOpen(false);
    await updateFooterSettingData({
      id: id,
      content: textState,
      topsearches: state,
    });
    setUpdate((state) => state + 1);
  };

  const postFooterData = async () => {
    setOpen(false);

    await postFooterSettingData({
      content: textState,
      topsearches: state,
    });

    setUpdate((state) => state + 1);
  };

  const openForUpdate = (cocnc) => {
    setOpen(true);
    setId(cocnc.id);
    setTextState(cocnc.content);
    setState(cocnc.topsearches);
  };

  const deleteHandler = async (cc) => {
    await deleteFooterSettingData(cc);
    setUpdate((state) => state + 1);
  };

  return (
    <div>
      <Container>
        <Stack direction="row" justifyContent="space-between" mt={10}>
          <CustomBreadcrumbs
            heading="Footer list"
            links={[
              {
                name: "Dashboard",
                href: "/admin",
              },
              {
                name: "Footer",
                href: "#",
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <Box>
            <Button
              onClick={() => {
                setOpen(true);
                setId(null);
                setTextState();
                setState();
              }}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Stack>

        {aa?.map((ee, e) => (
          <FooterCard
            deleteHandler={deleteHandler}
            openForUpdate={openForUpdate}
            key={e}
            content={ee}
          />
        ))}
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Box mb={5}>
            <Typography variant="subtitle1" mb={2}>
              Category
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {category.map((e) => (
                  <MenuItem value={e.title} key={e.id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography variant="subtitle1" mb={2}>
            Content
          </Typography>

          <ReactQuill onChange={(e) => setTextState(e)} value={textState} />

          <Box mt={6}>
            <Button
              variant="contained"
              onClick={() => (id ? updateHandler() : postFooterData())}
            >
              Save
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
              sx={{ marginLeft: "10px" }}
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const FooterCard = ({ content, openForUpdate, deleteHandler }) => {
  return (
    <Box mb={3}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item md={2}>
              <Box direction="row" alignItems="center" gap={20}>
                <Typography
                  display="flex"
                  color="black"
                  alignItems="center"
                  variant="h3"
                >
                  <Iconify
                    icon="bxs:category"
                    width={30}
                    color="#7053C1"
                    style={{ display: "inline-block", marginRight: "20px" }}
                  />
                  <span>Category</span>
                </Typography>

                <Typography
                  display="flex"
                  color="black"
                  alignItems="center"
                  variant="h3"
                  mt={3}
                >
                  <Iconify
                    icon="majesticons:text"
                    width={30}
                    color="#7053C1"
                    style={{ display: "inline-block", marginRight: "20px" }}
                  />
                  <span>Content</span>
                </Typography>
              </Box>
            </Grid>

            <Grid item md={7}>
              <Box>
                <Typography
                  display="flex"
                  bgcolor={"#F3F5F9"}
                  alignItems="center"
                  variant="subtitle1"
                  borderRadius={1}
                  p={2}
                  mb={2}
                >
                  <span>{content.topsearches}</span>
                </Typography>

                <Typography
                  display="flex"
                  bgcolor={"#F3F5F9"}
                  alignItems="center"
                  variant="subtitle1"
                  borderRadius={1}
                  noWrap
                  p={2}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: content.content.slice(0, 70).trim() + "....",
                    }}
                  />
                </Typography>
              </Box>
            </Grid>

            <Grid md={2.7}>
              <Box>
                <Button
                  onClick={() => openForUpdate(content)}
                  fullWidth
                  startIcon={<Iconify icon="material-symbols:edit" />}
                  aria-label="delete"
                  variant="contained"
                >
                  Edit
                </Button>
              </Box>

              <Box sx={{ marginTop: "10px" }}>
                <Button
                  onClick={() => deleteHandler(content.id)}
                  fullWidth
                  startIcon={<Iconify icon="material-symbols:delete" />}
                  aria-label="delete"
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 7,
};

{
  /* <Stack direction="row">
  <Box mr={7} sx={{ textAlign: "center" }}>
    <Typography variant="h3">Category</Typography>
    <Typography variant="subtitle2">{content.topsearches}</Typography>
  </Box>

  <Box mr={7} sx={{ textAlign: "center" }}>
    <Box>
      <Typography textAlign="start" variant="h6">
        content
      </Typography>
    </Box>
    
  </Box>
</Stack>; */
}
