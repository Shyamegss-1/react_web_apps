import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Pagination from "@mui/material/Pagination";

import { useNavigate } from "react-router-dom";

// icons

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getBusinessUserReports } from "../../../services/operations/userAPI";
import { dateFormater } from "../../utils/dateFormatter";

export default function ReportByListing() {
  const navigate = useNavigate();

  const [state, setState] = React.useState([]);

  const id = new URLSearchParams(window.location.search).get("search");

  React.useEffect(() => {
    (async () => {
      const data = await getBusinessUserReports(id);
      // console.log(data);
      setState(data);
    })();
  }, []);

  console.log(state);

  return (
    <div>
      <Stack direction="row" alignItems="flex-end" gap={4}>
        <IconButton size="small" onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize={"large"} />
        </IconButton>

        <Typography sx={{ textDecoration: "underline" }} mt={4} variant="h2">
          Reports
        </Typography>
      </Stack>

      {state.length ? (
        <Box sx={{ width: "70%" }} mt={10}>
          {state?.map((data, index) => (
            <ReviewCard index={index + 1} data={data} key={index} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            p: "148px 10px",
            background: "white",
            display: "flex",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "3px 5px 10px 1px #a1a1a140",
            marginTop: "20px",
          }}
        >
          <Typography variant="h4">No Report Yet...</Typography>
        </Box>
      )}
    </div>
  );
}
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ReviewCard = ({ index, data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">
            {index}. Review From: {data.review_email}
          </Typography>
          <Typography variant="subtitle1">report: {data.report} </Typography>

          <span>
            <IconButton size="small" color="error">
              <DeleteIcon />
            </IconButton>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </span>
        </Stack>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Review: </Typography>
          <Typography paragraph>{data.review}</Typography>
          <Typography variant="subtitle1">
            On: {dateFormater(data.date)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
