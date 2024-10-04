import React, { useState, useEffect } from "react";
import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";

import CodeHighlighter from "../codeHighlighter";

export default function CodeBox() {
  const [state, setState] = useState(false);

  const [value, setValue] = useState(0);

  const [html, setHtml] = useState<string | undefined>("");

  const [css, setCss] = useState("");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  const d = document.getElementById("templeye")?.innerHTML;

  useEffect(() => {
    setHtml(d);

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

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      <Button onClick={() => setState(true)} variant="outlined" size="small">
        Code
      </Button>

      <SwipeableDrawer
        anchor={"right"}
        open={state}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
      >
        <Box width="700px">
          <Box sx={{ p: 1, width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon tabs example"
            >
              <Tab icon={<HtmlIcon />} aria-label="phone" />
              <Tab icon={<CssIcon />} aria-label="favorite" />
            </Tabs>

            <TabPanel value={value} index={0}>
              {html?.length > 10 && (
                <CodeHighlighter
                  code={html
                    ?.replaceAll(`contenteditable="true"`, "")
                    .replaceAll(`contenteditable=""`, "")}
                  language="html"
                />
              )}
            </TabPanel>

            <TabPanel value={value} index={1}>
              {css !== "" && <CodeHighlighter code={css} language="css" />}
            </TabPanel>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
