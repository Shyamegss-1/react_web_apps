import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, IconButton, Stack, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import Editor from "../../components/editior/editior";
import ImageBox from "../../components/image/imageBox";

import CloseIcon from "@mui/icons-material/Close";

import crypto from "crypto-js";
import { useEffect, useState } from "react";
import CustomTextField from "../../components/custom-textfield/customtextfield";

import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useOnceEffect from "../../hooks/useOnce";
import {
  deleteBlogData,
  getBlogCategory,
  getBlogDataById,
  insertBlogData,
  updateBlogData,
} from "../../../services/operations/blog";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { useSelector } from "react-redux";
import { ImageUploadService } from "../../utils/imageUploader";
import ReactQuill from "react-quill";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

// ----------------------------------------------------------------------

const IMAGE_URL = "https://thetestingserver.com/review-web-s/image/";

export default function EditBlog() {
  const { handleSubmit, control, watch, setValue } = useForm();

  const { id } = useParams();

  const [image, setImage] = useState("");
  const [blob, setBlob] = useState("");

  const [cate, setCate] = useState([]);

  const [selectedCate, setSelectedCate] = useState("");

  const [editiorText, setEditiorText] = useState("");

  const { token } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([
    {
      id: 1,
      question1: "",
      answer1: "",
    },
  ]);

  const appendHandler = () => {
    setState((state) => {
      let id = state.length + 1;
      let ado = {
        id,
        ["question" + id]: "",
        ["answer" + id]: "",
      };

      return [...state, ado];
    });
  };

  const onChangeHandler = (event, index) => {
    setState((prevState) => {
      const newState = [...prevState];

      const objectIndex = newState.findIndex((e) => e.id === index + 1);

      if (objectIndex !== -1) {
        newState[objectIndex] = {
          ...newState[objectIndex],
          [event.target.name]: event.target.value,
        };
      }

      return newState;
    });
  };

  const removeHandler = (sid) => {
    setState((state) => {
      return state.filter((e) => e.id !== sid);
    });
  };

  useEffect(() => {
    (async () => {
      const data = await getBlogCategory();
      setCate(data);
    })();
  }, []);

  const [newimage, setNewImage] = useState("");

  useOnceEffect(async () => {
    if (+id !== 1) {
      const data = await getBlogDataById(id, token, navigate, true);

      console.log(data);

      Object.entries(data).map(
        ([keys, values]) => keys !== "faq" && setValue(keys, values)
      );

      setValue("category", "consumer tales");

      setSelectedCate(data.category);

      data?.faq?.map((sec) => {
        Object.entries(sec).map(([keys, value]) => {
          setValue(keys, value);
        });
      });

      setState(data.faq);
      setEditiorText(data.description);
      setBlob(IMAGE_URL + data.image);
      setNewImage(IMAGE_URL + data.image);
    }
  }, []);

  const uploadhandler = async (event) => {
    let y = getTableContent(editiorText);
    let u = addIdToHeadingElements(editiorText);

    if (editiorText !== "") {
      if (blob !== "") {
        const ee = await ImageUploadService(image);

        await insertBlogData(
          {
            ...event,
            description: u,
            image: ee.image,
            table: y.join(","),
            faq: state,
          },
          token,
          navigate,
          true
        );
      } else {
        toast.error("Please add image");
      }
    } else {
      toast.error("Please add Content");
    }
  };

  const updateHandler = async (event) => {
    console.log(event);

    let y = getTableContent(editiorText);
    let u = addIdToHeadingElements(editiorText);
    if (editiorText !== "") {
      if (blob !== "") {
        if (blob === newimage) {
          await updateBlogData(
            id,
            {
              ...event,
              description: u,
              image: newimage.replace(IMAGE_URL, ""),
              table: y.join(","),
              faq: state,
            },
            token,
            navigate,
            true
          );
        } else {
          const ee = await ImageUploadService(image);

          await updateBlogData(
            id,
            {
              ...event,
              description: u,
              image: ee.image,
              table: y.join(","),
              faq: state,
            },
            token,
            navigate,
            true
          );
        }
      } else {
        toast.error("Please add image");
      }
    } else {
      toast.error("Please add Content");
    }
  };

  const deleteHandler = async () => {
    await deleteBlogData(id, token, navigate);
    navigate(-1);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(
        Boolean(+id === 1) ? uploadhandler : updateHandler
      )}
    >
      <Grid container spacing={3} mt={4}>
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Title, short description, image...
          </Typography>
        </Grid>

        <Grid xs={12} md={8}>
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <CustomTextField control={control} name="title" label="Title" />

              <CustomTextField control={control} name="alt" label="Alt" />

              <Stack spacing={1.5}>
                <Typography id="description" variant="subtitle2">
                  Content
                </Typography>

                <ReactQuill
                  value={editiorText}
                  onChange={(e) => setEditiorText(e)}
                  theme="snow"
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Cover</Typography>

                <Box className="styled-imageBox">
                  {blob === "" || blob === null ? (
                    <ImageBox setImage={setImage} setBlob={setBlob} />
                  ) : (
                    <div>
                      <img src={blob} alt="error" />

                      <IconButton
                        onClick={() => {
                          setImage("");
                          setBlob("");
                        }}
                        sx={{ position: "absolute", top: 2, right: 2 }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  )}
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Additional functions and attributes...
          </Typography>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ mb: 5 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <CustomTextField
                control={control}
                name="tags"
                label="Tags  (use ',' for new Tag)"
              />

              <FormControl fullWidth>
                <InputLabel id="category-lable">Category</InputLabel>

                <Controller
                  name={`category`}
                  rules={{ required: "This field is required" }}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <Select
                      labelId="category-label"
                      id="category"
                      label="Category"
                      name="category"
                      value={value}
                      onChange={onChange}
                    >
                      {cate.map((e) => (
                        <MenuItem value={e.name} key={e.id}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </Card>

          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <CustomTextField
                control={control}
                name="metaTitle"
                label="Meta title"
              />

              <CustomTextField
                control={control}
                name="metaKeywords"
                label="Meta keyword"
              />

              <CustomTextField
                control={control}
                label="Meta Description"
                name="metaDescription"
                row={3}
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Information
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            FAQs,Question & Answer And Tags ....
          </Typography>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ mb: 5, p: 6 }}>
            {state.map((el, e) => (
              <Card sx={{ p: 6, mb: 3 }} key={e} elevation={6}>
                <Stack
                  spacing={3}
                  mb={5}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2">Question {e + 1}</Typography>
                  {e !== 0 && (
                    <IconButton
                      color="error"
                      onClick={() => removeHandler(el.id)}
                      size="small"
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </Stack>

                <Stack spacing={3}>
                  <Controller
                    name={`question${e + 1}`}
                    rules={{ required: "This field is required" }}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        focused
                        onChange={(ec) => {
                          onChangeHandler(ec, e);
                          onChange(ec);
                        }}
                        error={error}
                        helperText={error?.message}
                        value={value}
                        name={`question${e + 1}`}
                        label={`question ${e + 1}`}
                      />
                    )}
                  />

                  <Controller
                    name={`answer${e + 1}`}
                    rules={{ required: "This field is required" }}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        focused
                        onChange={(ec) => {
                          onChangeHandler(ec, e);
                          onChange(ec);
                        }}
                        error={error}
                        helperText={error?.message}
                        value={value}
                        name={`answer${e + 1}`}
                        label={`answer ${e + 1}`}
                      />
                    )}
                  />
                </Stack>
              </Card>
            ))}

            {state.length !== 6 && (
              <Button
                onClick={() => appendHandler()}
                sx={{ marginTop: "19px" }}
                color="success"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            )}
          </Card>
        </Grid>

        <Grid md={4} />

        <Grid xs={12} md={8} sx={{ display: "flex", alignItems: "center" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            sx={{ ml: 2 }}
          >
            {Boolean(+id === 1) ? "Upload post" : "Update post"}
          </LoadingButton>

          {Boolean(+id !== 1) && (
            <LoadingButton
              onClick={() => deleteHandler()}
              variant="contained"
              size="large"
              color="error"
              sx={{ ml: 2 }}
            >
              Delete post
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

const getTableContent = (htmlString) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;

  const hElements = tempElement.querySelectorAll("h1, h2, h3, h4, h5, h6");

  const hContents = [];

  hElements.forEach((element) => {
    hContents.push(element.textContent);
  });

  return hContents;
};

function addIdToHeadingElements(htmlString) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;
  const headingElements = tempElement.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  );

  headingElements.forEach((element) => {
    const innerHTML = element.textContent.trim();
    element.setAttribute("id", innerHTML.replaceAll(" ", "-"));
  });
  return tempElement.innerHTML;
}
