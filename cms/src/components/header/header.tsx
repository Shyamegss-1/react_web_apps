import {
  AppBar,
  Box,
  Button,
  ListItemButton,
  ListItemIcon,
  Stack,
  Tooltip,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";

//----------------------------------------------------------

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

//----------------------------------------------------------

import DescriptionIcon from "@mui/icons-material/Description";
import CodeBox from "./codeBox";
import { WINDOWSIZE } from "../../constant/static/static-data";
import { useDispatch } from "react-redux";
import { WINDOW_SIZE } from "../../reducer/layout-reducer";

import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const NAV_WIDTH = 280;

const options = ["Home Page", "About Page", "Service Page", "Contact Page"];

const StyledRootHeader = styled(AppBar)(({ theme }) => ({
  background: "#6b7aff2b!important",
  backdropFilter: "blur(6px)",
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH}px)`,
  },
}));

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [css, setCss] = useState("");

  const [winState, setWinState] = useState<string>("xl");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    setSearchParams({
      editp: options[index].split(" ")[0].toLocaleLowerCase(),
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const WindowSizeHandler = (key: string) => {
    dispatch(WINDOW_SIZE(key));
    setWinState(key);
  };

  const array = useSelector((e: any) => e.layout);

  const d = document.getElementById("templeye")?.innerHTML;

  useEffect(() => {
    let text = "";

    for (const styleSheet of document.styleSheets) {
      try {
        if (styleSheet.cssRules) {
          for (const rule of styleSheet.cssRules) {
            if (!rule?.selectorText?.includes("root")) {
              text += rule.cssText;
            }
          }
        }
      } catch (error) {
        console.error("Error while accessing CSS rules:", error);
      }
    }

    setCss(text);
  }, [d]);

  const exportFileHandler = function () {
    Object.entries(array).map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value[0]) {
          const htmlCode = `<html><head><link rel="stylesheet" href="./style.css" /></head><body> ${value[0]} </body></html>`;
          const blob = new Blob([htmlCode], { type: "text/html" });
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `${key}.html`;
          link.click();

          URL.revokeObjectURL(url);
        }
      }
    });

    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `style.css`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <StyledRootHeader>
      <Box sx={{ p: 1 }} display={"flex"} justifyContent="space-between">
        <Box display="flex">
          <Box>
            <List disablePadding component="nav" aria-label="Device settings">
              <ListItem
                id="lock-button"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickListItem}
                sx={{ p: 0 }}
              >
                <ListItemButton
                  sx={{
                    border: "1px solid #99a3ff",
                    p: "5px 10px",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="button" color="primary">
                        {options[selectedIndex]}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>

            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ marginLeft: "30px" }}>
            <Stack direction="row">
              {WINDOWSIZE.map((er) => (
                <Tooltip arrow key={er.id} title={er.title}>
                  <IconButton
                    color={
                      (winState ?? "window") === er.size
                        ? "secondary"
                        : "primary"
                    }
                    onClick={() => WindowSizeHandler(er.size)}
                    size="small"
                    sx={{ mx: 1 }}
                  >
                    {er.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        </Box>

        <Stack direction="row">
          <CodeBox />

          <Button
            onClick={() => exportFileHandler()}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          >
            Export
          </Button>
        </Stack>
      </Box>
    </StyledRootHeader>
  );
}

// function compressString(str) {
//   let compressed = "";
//   let count = 1;

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === str[i + 1]) {
//       count++;
//     } else {
//       compressed += str[i] + count;
//       count = 1;

//       console.log(compressed);
//     }
//   }

//   return compressed.length < str.length ? compressed : str;
// }

// Example usage

// console.log(compressString("abc")); // Output: "abc" (unchanged)

// const StringCompression = (string: string) => {
//   let w = string;
//   let x = {};
//   let f = [];

//   for (let cx = 0; cx < w.length; cx++) {
//     if (x.hasOwnProperty(w[cx])) {
//       x[w[cx]] = x[w[cx]] + 1;
//     } else {
//       x[w[cx]] = 1;
//     }
//   }

//   for (let u in x) {
//     f.push(u + x[u]);
//   }

//   return f.join("");
// };
