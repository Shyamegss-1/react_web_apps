import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Iconify from "../iconify/Iconify";

export function CustomSnackbar({ message, open, onClose }) {
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <Iconify fontSize="small" icon="material-symbols:close" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        sx={{
          "& .MuiSnackbarContent-root": {
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "right top, left bottom",
            overFlow: "inherit",
            color: "black",
            border: "1px solid #c5c5c5",
            backgroundSize: "50%,50%",
            backgroundImage:
              "url(https://minimals.cc/assets/cyan-blur.png), url(https://minimals.cc/assets/red-blur.png)",
          },
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
        action={action}
      />
    </div>
  );
}
