import React from "react";

import { NavLink as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Collapse,
  List,
  ListItemText,
  Divider,
  Tooltip,
  ListSubheader,
} from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

import * as route from "../../constant/_routePath";

// ----------------------------------------------------------------------

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SvgColor from "../svg-color/svgColor";

// ----------------------------------------------------------------------

interface dataType {
  title: string;
  icon: any;
  types: any;
}

interface navSec {
  data: dataType[];
}

interface navitems {
  data: dataType;
}

const icon = (name: string) => (
  <SvgColor src={name} sx={{ width: 1, height: 1 }} />
);

export default function NavSection({ data, ...other }: navSec) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {Nav1.map((e) => (
          <StyledNavItem
            key={e.title}
            component={RouterLink}
            to={e.path}
            sx={{
              "&.active": {
                color: "white",
                background: (theme) => theme.colors.purpleShade.main,
              },
            }}
          >
            <StyledNavItemIcon>{e.icon}</StyledNavItemIcon>
            <ListItemText disableTypography primary={e.title} />
          </StyledNavItem>
        ))}
      </List>

      <Divider sx={{ background: "#2e367a", m: "15px 0" }} />

      <List
        disablePadding
        subheader={
          <ListSubheader
            sx={{
              lineHeight: 2,
              color: "#495aef",
              backgroundColor: "transparent",
            }}
          >
            Components
          </ListSubheader>
        }
      >
        {data.map((el, i) => (
          <CollapsebleNavSection key={i} data={el} />
        ))}
      </List>
    </Box>
  );
}

export const CollapsebleNavSection: React.FC<navitems> = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { title, icon, types } = data;

  return (
    <>
      <StyledNavItem component={RouterLink} to={"#"} onClick={handleClick}>
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
        <StyledNavItemIcon>
          {open ? <ExpandLess /> : <ExpandMore />}
        </StyledNavItemIcon>
      </StyledNavItem>

      <Collapse in={open}>
        <List disablePadding sx={{ p: 1 }}>
          {types.map((e: { title: string; properties: string }) => (
            <div
              id="hjk"
              onDragStart={(ell) => {
                ell.dataTransfer.setData("ele", e.properties);
              }}
              draggable
            >
              <StyledNavItem key={e.title} component={RouterLink} to={"#"}>
                <StyledNavItemIcon>&#x25cf;</StyledNavItemIcon>
                <ListItemText disableTypography primary={e.title} />
              </StyledNavItem>
            </div>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const BottomNavSection: React.FC = () => {
  return (
    <>
      <StyledNavItem
        sx={{ justifyContent: "center" }}
        component={RouterLink}
        to={"#"}
      >
        <Tooltip title="setting">
          <StyledNavItemIcon>{icon(`/svg/settings.svg`)}</StyledNavItemIcon>
        </Tooltip>
      </StyledNavItem>

      <StyledNavItem
        sx={{ justifyContent: "center" }}
        component={RouterLink}
        to={"#"}
      >
        <Tooltip title="preview">
          <StyledNavItemIcon>{icon(`/svg/preview.svg`)}</StyledNavItemIcon>
        </Tooltip>
      </StyledNavItem>

      <StyledNavItem
        sx={{ justifyContent: "center" }}
        component={RouterLink}
        to={"#"}
      >
        <Tooltip title="setting">
          <StyledNavItemIcon>{icon(`/svg/settings.svg`)}</StyledNavItemIcon>
        </Tooltip>
      </StyledNavItem>

      <StyledNavItem
        sx={{ justifyContent: "center" }}
        component={RouterLink}
        to={"#"}
      >
        <Tooltip title="preview">
          <StyledNavItemIcon>{icon(`/svg/preview.svg`)}</StyledNavItemIcon>
        </Tooltip>
      </StyledNavItem>
    </>
  );
};

// // ----------------------------------------------------------------------
const Nav1 = [
  {
    title: "Dashboard",
    path: "/",
    icon: icon(`/svg/dashboard.svg`),
  },
  {
    title: "Customise Page",
    path: route.DASHBOARD + "/customise",
    icon: icon(`/svg/customise.svg`),
  },
];
