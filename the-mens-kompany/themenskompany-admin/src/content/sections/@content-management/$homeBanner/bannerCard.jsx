import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import Iconify from "../../../../components/iconify/Iconify";

import MenuItem from "@mui/material/MenuItem";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { STATIC_DATA } from "../../../../constants/path-constant";
import StyledPopover from "../../../../components/popover/popover";

export default function BannerCard({
  openhandler,
  post,
  handleOpenLightbox,
  setCurrentImage,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;

  const { path, id } = post;

  return (
    <Card sx={{ position: "relative" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={STATIC_DATA + path}
          alt="Paella dish"
        />
      </CardActionArea>

      <Box sx={{ position: "absolute", top: 5, right: 5 }}>
        <IconButton onClick={(e) => handleClick(e)} size="small">
          <Iconify icon="solar:menu-dots-bold" color="black" />
        </IconButton>

        <StyledPopover
          id={ids}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleOpenLightbox(STATIC_DATA + path)}>
            <ListItemIcon>
              <Iconify width={18} color="black" icon="mdi:eye" />
            </ListItemIcon>

            <ListItemText>
              <Typography fontWeight="300" variant="button">
                View
              </Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              openhandler();
              handleClose();
              setCurrentImage({ id: id, image: path });
            }}
          >
            <ListItemIcon>
              <Iconify width={18} color="black" icon="material-symbols:edit" />
            </ListItemIcon>

            <ListItemText>
              <Typography fontWeight="300" variant="button">
                Edit
              </Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <Iconify width={18} color="red" icon="fluent:delete-12-filled" />
            </ListItemIcon>

            <ListItemText>
              <Typography fontWeight="300" variant="button">
                Delete
              </Typography>
            </ListItemText>
          </MenuItem>
        </StyledPopover>
      </Box>
    </Card>
  );
}
