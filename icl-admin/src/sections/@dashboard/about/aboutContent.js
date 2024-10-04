import { Button, CardContent, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ABOUTSERVICE } from "../../../services/apiServices/apiService";

const AboutContent = ({ Data }) => {
  return (
    <>
      <CardContent
        sx={{ width: "90%", margin: "auto " }}
        dangerouslySetInnerHTML={{ __html: Data?.content }}
      />
    </>
  );
};

export default AboutContent;

export const AboutContentEditior = ({
  Data,
  setAboutData,
  closer,
  setPopup,
}) => {
  const [data, setData] = useState(Data);

  const uploadHandler = () => {
    ABOUTSERVICE({ method: "POST", content: data }).then((e) => {
      if (e.data.status == 200) {
        setPopup(true);
      }
    });

    setAboutData({
      ...Data,
      content: data,
    });
    closer(false);
  };

  return (
    <>
      <CardContent sx={{ width: "90%", margin: "auto " }}>
        <CKEditor
          style={{ minHeigth: "400px" }}
          data={Data?.content}
          editor={ClassicEditor}
          onChange={(change, editor) => {
            setData(editor.getData());
          }}
        />

        <Stack justifyContent="end" spacing={2} direction="row" mt={5}>
          <Button size="large" variant="contained" onClick={uploadHandler}>
            Save
          </Button>

          <Button
            size="large"
            onClick={() => closer(false)}
            variant="contained"
          >
            Cancel
          </Button>
        </Stack>
      </CardContent>
    </>
  );
};
