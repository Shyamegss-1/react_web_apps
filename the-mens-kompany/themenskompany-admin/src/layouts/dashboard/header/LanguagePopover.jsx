import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, Stack, IconButton, Popover } from "@mui/material";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "editCont",
    label: "Edit Content",
    icon: "material-symbols:edit",
  },
  {
    value: "edit",
    label: "Edit Image",
    icon: "material-symbols:edit",
  },
  {
    value: "cancel",
    label: "Cancel",
    icon: "material-symbols:cancel-outline",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const editiorHandler = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Iconify icon="ph:dots-three-outline-vertical-fill" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              onClick={
                option.value === "edit"
                  ? ""
                  : option.value === "editCont"
                  ? editiorHandler
                  : handleClose
              }
            >
              <Box sx={{ width: 35, mr: 1 }}>
                <Iconify icon={option.icon} />
              </Box>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <input hidden accept="image/*" type="file" id="picCLickPusssy" />
      </Popover>
    </>
  );
}