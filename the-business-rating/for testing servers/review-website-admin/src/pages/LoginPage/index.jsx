// ** React Imports
import { useState } from "react";
import { toast } from "react-hot-toast";

// ** Next Imports

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

// ** Icons Imports

import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Configs
import themeConfig from "../../config/themeConfig";

// ** Layout Import
import BlankLayout from "../../core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV1 from "../../views/auth/FooterIllustration";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAdmin } from "../../services/operations/authApi";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      values.email !== "admin@eglobalsoft.com" &&
      values.password !== "@adminEglobl98"
    ) {
      toast.error("invalid credentials");
    } else {
      toast.success("Login successful");
      localStorage.setItem("token", JSON.stringify({}));
      navigate("/admin");
    }
  };

  return (
    <BlankLayout>
      <Box className="content-center">
        <Card sx={{ zIndex: 1 }}>
          <CardContent
            sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}
          >
            <Box
              sx={{
                mb: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="32.000000pt"
                height="32.000000pt"
                viewBox="0 0 32.000000 32.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M115 310 c-16 -7 -11 -9 23 -9 23 -1 42 -5 42 -10 0 -16 -18 -22 -23
-9 -2 7 -8 10 -12 5 -5 -4 -4 -12 2 -18 9 -9 3 -19 -20 -38 -17 -14 -37 -25
-44 -23 -7 2 -13 -3 -13 -10 1 -24 27 -48 53 -48 14 0 32 -7 41 -15 8 -8 22
-15 30 -15 26 0 19 -19 -22 -61 -39 -39 -52 -41 -52 -7 0 10 -7 30 -16 44 -9
13 -14 28 -10 31 3 4 -5 18 -18 32 -37 41 -40 63 -10 106 26 38 26 39 2 24
-12 -9 -33 -35 -46 -60 -39 -75 -11 -163 66 -207 64 -36 128 -25 181 32 33 35
38 112 6 100 -17 -7 -24 6 -29 57 -3 23 -10 46 -18 50 -10 7 -10 9 0 9 7 0 4
8 -9 21 -23 23 -74 33 -104 19z"
                  />
                </g>
              </svg>

              <Typography
                variant="h6"
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  fontSize: "1.5rem !important",
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, marginBottom: 1.5 }}
              >
                Welcome to Review webiste ! 👋🏻
              </Typography>
              <Typography variant="body2">
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>

            <form autoComplete="off" onSubmit={(e) => submitHandler(e)}>
              <TextField
                autoFocus
                onChange={handleChange("email")}
                fullWidth
                type="email"
                id="email"
                label="Email"
                sx={{ marginBottom: 4 }}
              />

              <FormControl fullWidth>
                <InputLabel htmlFor="auth-login-password">Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  value={values.password}
                  id="auth-login-password"
                  onChange={handleChange("password")}
                  type={values.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label="toggle password visibility"
                      >
                        {values.showPassword ? (
                          <EyeOutline />
                        ) : (
                          <EyeOffOutline />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box sx={{ p: 4 }}></Box>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginBottom: 7 }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </BlankLayout>
  );
};

export default LoginPage;
