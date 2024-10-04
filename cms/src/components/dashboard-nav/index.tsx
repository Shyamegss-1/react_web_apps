import { Component } from "react";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { Box, ListItemText, List, Divider, ListSubheader } from "@mui/material";
import SvgColor from "../svg-color/svgColor";

import { NavLink as RouterLink } from "react-router-dom";

interface dataType {
  title: string;
  icon: any;
  path: string;
  types: any;
}

interface navSec {
  data: dataType[];
}

const icon = (name: string) => (
  <SvgColor src={name} sx={{ width: 1, height: 1 }} />
);

export default class index extends Component<navSec> {
  constructor({ data, ...other }: navSec) {
    super({ data, ...other });
  }

  render() {
    return (
      <Box>
        <List disablePadding>
          {Nav1.map((e, i) => (
            <StyledNavItem
              key={i}
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
              PLUGINS
            </ListSubheader>
          }
        >
          {Nav2.map((e, i) => (
            <StyledNavItem
              key={i}
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
              GENERAL
            </ListSubheader>
          }
        >
          {Nav3.map((e, i) => (
            <StyledNavItem
              key={i}
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
      </Box>
    );
  }
}

const Nav1: { title: string; path: string; icon: any }[] = [
  {
    title: "mangae",
    icon: icon("/svg/manage.svg"),
    path: "/cms",
  },
  {
    title: "customise",
    icon: icon("/svg/customise.svg"),
    path: "/cms/dashboard",
  },
];

const Nav2: { title: string; path: string; icon: any }[] = [
  {
    title: "Content type builder",
    icon: icon("/svg/manage.svg"),
    path: "/cms/dashboard",
  },
  {
    title: "media library",
    icon: icon("/svg/customise.svg"),
    path: "/cms/dashboard",
  },
];

const Nav3: { title: string; path: string; icon: any }[] = [
  {
    title: "plugins",
    icon: icon("/svg/manage.svg"),
    path: "/cms/dashboard",
  },
  {
    title: "marketplace",
    icon: icon("/svg/customise.svg"),
    path: "/cms/dashboard",
  },
  {
    title: "setting",
    icon: icon("/svg/settings.svg"),
    path: "/dashboard",
  },
];
