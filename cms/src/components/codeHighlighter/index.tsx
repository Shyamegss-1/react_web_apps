import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import { format } from "prettier";
import parserHtml from "prettier/parser-html";
import parserPostcss from "prettier/parser-postcss";

interface codeBoxInterface {
  code: any;
  language: string;
}

export default function index({ code, language }: codeBoxInterface) {
  const formattedCode = format(code, {
    parser: language,
    plugins: [parserHtml, parserPostcss],
  });

  const [state, setState] = useState<Boolean>(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const copyToClipBoard = async () => {
    let b = document.getElementById("codeboxi");
    await navigator.clipboard.writeText(b?.textContent);

    setState(true);

    setTimeout(() => setState(false), 3000);
  };
  return (
    <>
      <Box
        sx={{
          borderRadius: 2,
          height: "90vh",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            height: "100%",
          }}
        >
          <pre
            className="codebox"
            style={{ height: "100%", margin: 0, background: "#0C134F" }}
          >
            <code id="codeboxi" className={`language-${language}`}>
              {formattedCode}
            </code>
          </pre>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 30,
          }}
        >
          <Button
            onClick={() => copyToClipBoard()}
            color={state ? "success" : "primary"}
            size="small"
            variant="outlined"
          >
            {state ? "Copied" : "Copy"}
          </Button>
        </Box>
      </Box>
    </>
  );
}
