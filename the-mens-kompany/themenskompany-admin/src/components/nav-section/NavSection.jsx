import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Collapse,
  List,
  ListItemText,
  ListSubheader,
} from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon, StyledCollpNavItem } from "./styles";

import ExpandLess from "@mui/icons-material/ExpandLess";

import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{ p: 1 }}
        subheader={<ListSubheader>Overview</ListSubheader>}
      >
        {data.map((item) => {
          return item.collapsable ? (
            <CollapsableNav key={item.title} item={item} />
          ) : (
            <NavItem key={item.title} item={item} />
          );
        })}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem component={RouterLink} to={path} sx={stylenav}>
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}

const CollapsableNav = ({ item }) => {
  const [open, setOpen] = useState(false);

  const { title, path, icon, info, collapsable } = item;

  return (
    <>
      <CollapsableNavItem
        key={item.title}
        setOpen={setOpen}
        item={item}
        open={open}
      />

      <Collapse in={open} timeout="auto" unmountOnExit>
        {collapsable?.map((list) => {
          const { title, path, icon, info } = list;
          return (
            <StyledCollpNavItem component={RouterLink} to={path} sx={styleDot}>
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

              <ListItemText disableTypography primary={title} />

              {info && info}
            </StyledCollpNavItem>
          );
        })}
      </Collapse>
    </>
  );
};

function CollapsableNavItem({ item, open, setOpen }) {
  const { title, icon, path } = item;

  const current = window.location.href;
  const isTrue = current.includes(path);

  return (
    <StyledNavItem
      className={isTrue ? "active" : ""}
      onClick={() => setOpen(!open)}
      sx={stylenav}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      <StyledNavItemIcon>
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledNavItemIcon>
    </StyledNavItem>
  );
}

let stylenav = {
  "&.active": {
    color: "rgb(118, 53, 220)",
    background: "rgba(118, 53, 220, 0.08)",
  },
};

let styleDot = {
  "&.active .svg-color": {
    color: "rgb(118, 53, 220)",
  },
};
