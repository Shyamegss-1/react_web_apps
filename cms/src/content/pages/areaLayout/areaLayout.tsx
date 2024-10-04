import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import * as styleHelper from "../../../utils/helpers/stylesFunction";

import * as _static from "../../_mock/_static";
import { useDispatch } from "react-redux";

import $ from "jquery";

//------------------------------------------

import { LAYOUT_HEADER } from "../../../reducer/layout-reducer";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { TransitionProps } from "@mui/material/transitions";
import { useSearchParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AreaLayout() {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<{ [key: string]: string }>({
    width: "",
    height: "",
  });

  const [imageModal, setImageModal] = useState<{
    [key: string]: any;
  }>({
    elId: "",
    open: false,
  });

  const [marginState, setMarginState] = useState<{ [key: string]: string }>({
    marginTop: "",
    marginRight: "",
    marginButtom: "",
    marginLeft: "",
  });

  const [PaddingState, setPaddingState] = useState<{ [key: string]: string }>({
    PaddingTop: "",
    PaddingRight: "",
    PaddingButtom: "",
    PaddingLeft: "",
  });

  const idRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let elmet: any = e.dataTransfer.getData("ele");

    dispatch(LAYOUT_HEADER([elmet]));
  };

  const size = useSelector((e: any) => e.layout);
  const layout = useSelector((e: any) => e.layout);

  const editorOpenHandler = () => {
    var home = document.getElementsByClassName("fi-h")[0];
    home.classList.add("fi");
    home.classList.remove("fi-h");
  };

  const editorCloseHandler = () => {
    var home = document.getElementsByClassName("fi")[0];
    home.classList.add("fi-h");
    home.classList.remove("fi");
  };

  const updateFunction = (): void => {
    styleHelper.WIDTHOPR("container-type-demo-sa34pv", state.width);
    styleHelper.HEIGHTOPR("container-type-demo-sa34pv", state.height);

    Object.entries(marginState).map(([key, value]) => {
      styleHelper.MARGINOPR("container-type-demo-sa34pv", value, key);
    });

    Object.entries(PaddingState).map(([key, value]) => {
      styleHelper.MARGINOPR("container-type-demo-sa34pv", value, key);
    });

    styleHelper.IMGEDIT("container-type-demo-sa34pv", "hgc");
  };

  const inputStyleHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const inputMarginHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMarginState({
      ...marginState,
      [event.target.id]: event.target.value,
    });
  };

  const inputPaddingHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPaddingState({
      ...PaddingState,
      [event.target.id]: event.target.value,
    });
  };

  const createRandomId = () => {
    let hex = "1234567890abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomKey: string = "";

    for (let x = 0; x < 20; x++) {
      var randomNumber = Math.floor(Math.random() * hex.length);
      randomKey += hex[randomNumber];
    }
    return randomKey;
  };

  const xx = useCallback(() => {
    $("img").on("click", function (event) {
      event.stopPropagation();

      let id = createRandomId();
      $(this).attr("id", id);

      setImageModal({
        elId: id,
        open: true,
      });
      if (searchParams.get("editp") === "home") {
        setTimeout(() => {
          console.log("asdsad");
          dispatch(LAYOUT_HEADER([$("#templeye").html()]));
        }, 1);
      }
    });
  }, [imageModal, layout]);

  const page = searchParams.get("editp");

  useEffect(() => {
    $("li,p,h1,h2,h3,h4,h5,h6,span").attr("contentEditable", "true");

    $("img").attr("draggable", "false");

    $("*").on("focusout", function (event) {
      event.stopPropagation();

      // if (page === "home") {
      //   dispatch(LAYOUT_HEADER([$("#eidting-dssa").html()]));
      // }
    });

    xx();
  }, [layout, page]);

  const imagUpdateHandler = () => {
    if (idRef?.current?.value !== "") {
      document
        .getElementById(imageModal.elId)
        ?.setAttribute("src", idRef?.current?.value ?? "");
      setImageModal({
        ...imageModal,
        open: false,
      });
    }
  };

  return (
    <Box sx={{ p: 1, border: "1px dashed gray" }}>
      <Container
        id="templeye"
        placeholder="sdas"
        onDrop={(e) => dropHandler(e)}
        onDragOver={(e) => e.preventDefault()}
        maxWidth={size.screen}
        className="c-main-79s67g"
        sx={{ position: "relative" }}
      >
        {page ? (
          <div dangerouslySetInnerHTML={{ __html: layout[page] }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: layout["home"] }} />
        )}
      </Container>

      <Dialog
        TransitionComponent={Transition}
        open={imageModal.open}
        onClose={() =>
          setImageModal({
            ...imageModal,
            open: false,
          })
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter the <b>url</b> to change the selected image
          </DialogContentText>

          <TextField
            inputRef={idRef}
            type="text"
            size="small"
            sx={{ mt: 1 }}
            fullWidth
            label="url"
          />
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            onClick={() =>
              setImageModal({
                ...imageModal,
                open: false,
              })
            }
          >
            cancel
          </Button>
          <Button autoFocus size="small" onClick={imagUpdateHandler}>
            change
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={1} sx={{ borderRadius: 0 }} className="fi-h">
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Edit Header</Typography>
          <span>
            <IconButton onClick={() => editorCloseHandler()} size="small">
              <CloseIcon />
            </IconButton>
          </span>
        </Stack>

        <hr style={{ margin: "14px 0" }} />

        <Box className="conteinrs">
          <Box>
            <Stack spacing={2} justifyContent="space-between">
              <TextField
                id="width"
                label="Width"
                variant="outlined"
                size="small"
                onChange={(e) => inputStyleHandler(e)}
                type="text"
              />

              <TextField
                id="height"
                label="Height"
                onChange={(e) => inputStyleHandler(e)}
                variant="outlined"
                size="small"
                type="text"
              />

              <div className="marginBorder">Margin</div>

              <Stack direction="row" spacing={1}>
                {_static.MARGINIPUTS.map((input) => (
                  <TextField
                    id={input.id}
                    label={input.placeHolder}
                    onChange={(e) => inputMarginHandler(e)}
                    variant="outlined"
                    size="small"
                    type="text"
                  />
                ))}
              </Stack>

              <div className="marginBorder">Padding</div>

              <Stack direction="row" spacing={1}>
                {_static.PADDINGIPUTS.map((input) => (
                  <TextField
                    id={input.id}
                    label={input.placeHolder}
                    onChange={(e) => inputPaddingHandler(e)}
                    variant="outlined"
                    size="small"
                    type="text"
                  />
                ))}
              </Stack>

              <hr />

              <Box>
                <Typography variant="caption" gutterBottom>
                  Edit Logo
                </Typography>

                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="logo"
                  variant="outlined"
                  size="small"
                  type="text"
                  defaultValue={"http://localhost:5173/dashboard/customise#"}
                />
              </Box>

              <Box>
                <Typography variant="caption" gutterBottom>
                  Add Class
                </Typography>

                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-basic"
                  label="Class"
                  variant="outlined"
                  size="small"
                  type="text"
                />
              </Box>

              <Box
                sx={{
                  margin: "18px 8px!important",
                  background: "#0C134F",
                  height: "250px",
                  borderRadius: "10px",
                }}
              >
                {/* <CodeHighLIghter code={".abs{color:pink}"} language="css" />
              <CodeEditor /> */}
              </Box>
            </Stack>
          </Box>

          <Box className="iner-btm">
            <Button variant="contained" onClick={updateFunction}>
              Save
            </Button>
            <Button variant="contained">Cancel</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
