import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import BlankLayout from "../core/layouts/BlankLayout";

import FooterIllustrations from "../views/auth/FooterIllustration";
import { Link } from "react-router-dom";

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down("lg")]: {
    height: 450,
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  },
}));

const TreeIllustration = styled("img")(({ theme }) => ({
  left: 0,
  bottom: "5rem",
  position: "absolute",
  [theme.breakpoints.down("lg")]: {
    bottom: 0,
  },
}));

const MODE = import.meta.env.MODE;
let uri = MODE === "development" ? "" : "/admin";

const Error500 = () => {
  return (
    <BlankLayout>
      <Box className="content-center">
        <Box
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <BoxWrapper>
            <Typography variant="h1">500</Typography>
            <Typography
              variant="h5"
              sx={{ mb: 1, fontSize: "1.5rem !important" }}
            >
              Internal server error 👨🏻‍💻
            </Typography>
            <Typography variant="body2">Oops, something went wrong!</Typography>
          </BoxWrapper>
          <Img
            height="487"
            alt="error-illustration"
            src={`${uri}/images/pages/500.png`}
          />
          <Link to="/admin">
            <Button component="a" variant="contained" sx={{ px: 5.5 }}>
              Back to Home
            </Button>
          </Link>
        </Box>
        <FooterIllustrations
          image={
            <TreeIllustration
              alt="tree"
              src={`${uri}/images/pages/tree-3.png`}
            />
          }
        />
      </Box>
    </BlankLayout>
  );
};

export default Error500;
