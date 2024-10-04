import "../../utils/highlight";

// @mui
import { alpha } from "@mui/material/styles";
//

import { StyledEditor } from "./styles";

import { CKEditor } from "ckeditor4-react";

// ----------------------------------------------------------------------

export default function Editor({
  id = "minimal-quill",
  error,
  simple = false,
  helperText,
  sx,
  editiorHandler,
  value,
  ...other
}) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <StyledEditor
        id="editior-qill-je"
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            "& .ql-editor": {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...sx,
          overflow: "hidden",
        }}
      >
        <CKEditor
          initData={value}
          onChange={(evt) => editiorHandler(evt.editor.getData())}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
