import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, IconButton, Pagination, Tooltip } from "@mui/material";

import {
  deleteBlogCommentDataById,
  getBlogCommentDataById,
  updateBlogCommentDataById,
} from "../../../services/operations/blog";
import { dateFormater } from "../../utils/dateFormatter";
import { useParams, useSearchParams } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// icons

import DoneIcon from "@mui/icons-material/Done";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function BlogComments() {
  const [expanded, setExpanded] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [length, setLength] = React.useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteHandler = React.useCallback(
    async (mid) => {
      const status = await deleteBlogCommentDataById(mid);
      if (status === "success") {
        setLength((state) => state - 1);
        toast.success("comment deleted successfully");
      } else {
        toast.error("request Failed!! try agin");
      }
    },
    [length]
  );

  useEffect(() => {
    let pa = searchParams.get("page");
    pa = pa ? `?page=${pa}` : "";

    (async () => {
      const data = await getBlogCommentDataById(id, true, pa);
      setState(data.data);
      setLength(data?.sasa);
    })();
  }, [searchParams, deleteHandler]);

  const pageChangeHandler = (page) => {
    setSearchParams({ page });
  };

  const verifyHandler = async (mid) => {
    const shallowState = [...state];
    const mod = shallowState.find((e) => e.id === mid);

    const status = await updateBlogCommentDataById(mid, !mod.active);
    if (status === "success") {
      toast.success("status updated");

      mod.active = !mod.active;
      setState([...shallowState]);
    } else {
      toast.error("request Failed!! try agin");
    }
  };

  return (
    <Container maxWidth="md">
      <Stack direction="row" mb={10} justifyContent="space-between">
        <Typography variant="h5">Post Comments</Typography>

        {Math.ceil(length / 10) >= 2 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              onChange={(event, page) => pageChangeHandler(page)}
              count={Math.ceil(length / 10)}
              variant="outlined"
            />
          </Box>
        )}
      </Stack>

      {state.length ? (
        <Box>
          {state.map((el, index) => (
            <Accordion
              key={index}
              expanded={expanded === "panel" + index}
              onChange={handleChange("panel" + index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Stack
                  sx={{ width: "100%" }}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Stack
                    sx={{ width: "65%" }}
                    direction="row"
                    justifyContent="space-between"
                  >
                    {el.active ? (
                      <VerifiedIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                    <Typography sx={{ flexShrink: 0 }}>{el.name}</Typography>
                    <Typography sx={{ flexShrink: 0 }}>{el.email}</Typography>
                    <Typography variant="body2" color="Highlight">
                      {dateFormater(el.date)}
                    </Typography>
                  </Stack>

                  <Stack
                    sx={{ width: "10%" }}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Tooltip
                      title={el.active ? "unverify" : "verify"}
                      placement="top"
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          verifyHandler(el.id);
                        }}
                        variant="contained"
                        size="small"
                        color={el.active ? "error" : "success"}
                      >
                        {!el.active ? <DoneIcon /> : <CloseIcon />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="delete" placement="top">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(el.id);
                        }}
                        variant="contained"
                        size="small"
                        color="error"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{el.message}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Box maxWidth="xl">
          <Typography variant="h5" align="center">
            No comments for this Blog 🗒️ yet !!{" "}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
