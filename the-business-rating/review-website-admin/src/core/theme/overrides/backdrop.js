// ** Util Import
import { hexToRGBA } from "../../utils/hex-to-rgba";

const Backdrop = (theme) => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor:
            theme.palette.mode === "light"
              ? `rgba(${theme.palette.customColors.main}, 0.7)`
              : hexToRGBA(theme.palette.background.default, 0.7),
        },
        invisible: {
          backgroundColor: "transparent",
        },
      },
    },
  };
};

export default Backdrop;
