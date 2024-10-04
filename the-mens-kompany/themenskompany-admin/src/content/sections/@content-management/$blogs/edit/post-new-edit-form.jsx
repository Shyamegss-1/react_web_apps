import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Box,
  Card,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import { LoadingButton } from "@mui/lab";
import Editor from "../../../../../components/editior/editior";
import ImageBox from "../../../../../components/image/imageBox";

import Iconify from "../../../../../components/iconify/Iconify";

import { useEffect, useState } from "react";
import {
  PostDatatHandler,
  PostInsertHandler,
  PostUpdateHandler,
} from "../../../../../services/apiServices/apiService";
import crypto from "crypto-js";
import { metaKeywords, tags } from "../../../../../_mock/blog";
import { STATIC_DATA } from "../../../../../constants/path-constant";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const getHash = () => {
  const currentDate = new Date();

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = currentDate.toLocaleString("en-GB", options);

  return crypto.MD5(formattedDate).toString();
};

export default function PostNewEditForm() {
  const navigate = useNavigate();

  const isToEdit = new URLSearchParams(window.location.search).get("y");
  const postid = new URLSearchParams(window.location.search).get("c");

  const [image, setImage] = useState("");
  const [blob, setBlob] = useState("");

  const [editiorText, setEditiorText] = useState("");
  const [tag, setTag] = useState([]);
  const [metakey, setMetakey] = useState([]);

  const [data, setData] = useState({});

  const [state, setState] = useState({
    title: "",
    description: "",
    metatitle: "",
    metadescription: "",
    publish: "Draft",
  });

  useEffect(() => {
    if (Boolean(isToEdit && isToEdit === "true")) {
      PostDatatHandler()
        .then((e) => {
          let y = e.data.data;
          let c = y.filter((e) => e.id === Number(postid))[0];

          setState({
            title: c.post_title,
            description: c.post_description,
            metatitle: c.post_meta_title,
            metadescription: c.post_meta_description,
            publish: c.publish,
          });
          setBlob(STATIC_DATA + c.image);
          setImage(c.image);
          setTag(c.tags.split(","));
          setMetakey(c.post_meta_keyword.split(","));
          setEditiorText(c.post_content);
          setData(c);
        })
        .catch(() => alert("something went wrong! refresh this page"));
    }
  }, []);

  const updateHandler = () => {
    if (blob === STATIC_DATA + data.image) {
      PostUpdateHandler({
        ...state,
        content: editiorText,
        image: image,
        id: data.id,
        tag: tag.join(","),
        metakeyword: metakey.join(","),
      })
        .then((e) => {
          console.log(e);
          if (e.status === 200) {
            navigate("/ad-min/content/blog?r=update");
          }
        })
        .catch((err) => alert("something went wrong! try again"));
    } else {
      const hash = getHash();

      ImageUploadService(hash, image).then((e) => {
        if (e.status === 200) {
          PostUpdateHandler({
            ...state,
            content: editiorText,
            image: e.image,
            id: data.id,
            tag: tag.join(","),
            metakeyword: metakey.join(","),
          })
            .then((e) => {
              if (e.status === 200) {
                navigate("/ad-min/content/blog?r=update");
              }
            })
            .catch(() => alert("something went wrong! try again"));
        }
      });
    }
  };

  const inputHandlers = (event) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const uploadHandler = () => {
    const hash = getHash();
    ImageUploadService(hash, image).then((e) => {
      if (e.status === 200) {
        PostInsertHandler({
          ...state,
          content: editiorText,
          image: e.image,
          tag: tag.join(","),
          metakeyword: metakey.join(","),
        })
          .then((e) => {
            if (e.status === 201) {
              navigate("/ad-min/content/blog?r=upload");
            }
          })
          .catch((err) => alert("something went wrong! try again"));
      }
    });
  };

  return (
    <>
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
              <TextField
                value={state.title}
                fullWidth
                label="Post Title"
                id="title"
                onChange={(e) => inputHandlers(e)}
              />

              <TextField
                value={state.description}
                fullWidth
                onChange={(e) => inputHandlers(e)}
                id="description"
                multiline
                rows={3}
                label="Description"
              />

              <Stack spacing={1.5}>
                <Typography id="description" variant="subtitle2">
                  Content
                </Typography>
                <Editor
                  value={editiorText}
                  editiorHandler={(e) => setEditiorText(e)}
                />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Cover</Typography>

                <Box className="styled-imageBox">
                  {blob === "" ? (
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
                        <Iconify icon="ion:close" />
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
          <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Autocomplete
                onChange={(event, value) => setTag(value)}
                multiple
                id="tags-standard"
                options={tags}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                value={tag}
                renderInput={(params) => (
                  <TextField {...params} label="+Tags" />
                )}
              />

              <TextField
                value={state.metatitle}
                fullWidth
                label="Meta Title"
                id="metatitle"
                onChange={(e) => inputHandlers(e)}
              />

              <TextField
                fullWidth
                multiline
                value={state.metadescription}
                rows={3}
                label="Meta Description"
                id="metadescription"
                onChange={(e) => inputHandlers(e)}
              />

              <Autocomplete
                onChange={(event, value) => setMetakey(value)}
                multiple
                id="tags-outlined"
                options={metaKeywords}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                value={metakey}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Meta keyword"
                    placeholder="+Keywords"
                  />
                )}
              />
            </Stack>
          </Card>
        </Grid>

        <Grid md={4} />
        <Grid xs={12} md={8} sx={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Switch
                value={state.publish === "Published"}
                onChange={(e) =>
                  e.target.checked
                    ? setState({ ...state, publish: "Published" })
                    : setState({ ...state, publish: "Draft" })
                }
                defaultChecked
              />
            }
            label="Publish"
            sx={{ flexGrow: 1, pl: 3 }}
          />

          <LoadingButton
            onClick={() => {
              !Boolean(isToEdit && isToEdit === "true")
                ? uploadHandler()
                : updateHandler();
            }}
            type="submit"
            variant="contained"
            size="large"
            sx={{ ml: 2 }}
          >
            {!Boolean(isToEdit && isToEdit === "true")
              ? "Create Post"
              : "Save Changes"}
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
}

const ImageUploadService = async (key, object) => {
  const e = await fetch(`https://themenskompany.com/api.php?api_key=${key}`, {
    method: "POST",
    body: object,
  });
  const e_1 = e.json();
  return e_1;
};
