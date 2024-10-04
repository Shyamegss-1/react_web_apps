import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { HOME } from "../../../constants/route-path";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isAuth, setIsAuth] = useState(false);

  const email = "admin@tmk.cc";
  const password = "t8op7RRMRMJCLLh";

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setIsAuth(false);

    if (email === state.email && password === state.password) {
      setIsAuth(false);
      sessionStorage.setItem("&^*", JSON.stringify({ isAuth: true }));
      navigate(HOME);
    } else {
      setIsAuth(true);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          onChange={(e) => inputHandler(e)}
          label="Email address"
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => inputHandler(e)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {isAuth && (
        <Typography
          variant="subtitle1"
          color="error"
          sx={{ mx: "auto", mt: 2, fontWeight: 300 }}
        >
          Wrong credintial, Check your email and password *
        </Typography>
      )}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{ mt: 4 }}
      >
        Login
      </LoadingButton>
    </>
  );
}
