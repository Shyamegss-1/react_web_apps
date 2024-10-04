import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { dateFormater } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";

const IMAGE_URL = "https://thetestingserver.com/review-web-s/image/";

export default function BlogCard({ data }) {
  const { title, image, description, date, id } = data;

  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        sx={{ height: 240 }}
        image={IMAGE_URL + image}
        title="green iguana"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <div
            dangerouslySetInnerHTML={{
              __html: description.slice(0, 150) + " ......",
            }}
          />
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/admin/blog/edit/${id}`)}
          >
            Edit
          </Button>

          <Button
            sx={{ marginLeft: 2 }}
            variant="contained"
            size="small"
            color="info"
            onClick={() => navigate(`/admin/blog/comments/${id}`)}
          >
            comments
          </Button>
        </Box>
        <Typography variant="body2">{dateFormater(date)}</Typography>
      </CardActions>
    </Card>
  );
}
