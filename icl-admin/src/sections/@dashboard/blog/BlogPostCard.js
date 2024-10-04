import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

// @mui
import { alpha, styled } from "@mui/material/styles";
import { Link, Card, Grid, Typography, CardContent } from "@mui/material";
// utils
import { fDate } from "../../../utils/formatTime";
import { IMG_PATH } from "../../../constants/path-constant";

// ----------------------------------------------------------------------

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  // index: PropTypes.number,
};

export default function BlogPostCard({ POST }) {
  const navigate = useNavigate();

  const blogNavigate = (id) => {
    navigate({
      pathname: "/ikshitachoudhary/dashboard/edit-blog",
      search: `?edit=${id}&id=ClNpbXBseSBlbnRlciB5b3VyIGRhdGEgdGhlbiBwdXNoIHRoZSBlbmNvZGUgYnV0dG9uLg==`,
    });
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: "relative" }}>
        <StyledCardMedia>
          <StyledCover
            alt={POST.post_name}
            src={
              POST.post_img
                ? POST.post_img
                : `${process.env.PUBLIC_URL}/assets/images/covers/add-2935429_960_720.jpg`
            }
          />
        </StyledCardMedia>

        <CardContent sx={{ pt: 4 }}>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {fDate(new Date("2022-04-02T20:11:25.000Z"))}
          </Typography>

          <StyledTitle color="inherit" variant="subtitle2" underline="hover">
            {POST.post_name}
          </StyledTitle>

          <StyledInfo>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => blogNavigate(POST.post_id)}
              variant="subtitle2"
              color="text.secondary"
            >
              Edit
            </Typography>
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
