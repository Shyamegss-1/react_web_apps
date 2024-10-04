import { Stack, TextField } from "@mui/material";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CatePanel = ({ blogData, editData, valid }) => {
  const blogEditHandler = (e) => {
    editData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Stack spacing={6.5}>
        <TextField
          name="post_name"
          value={blogData.post_name}
          label="Title"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => blogEditHandler(e)}
          error={
            (valid && blogData.post_name == null) || blogData.post_name == ""
              ? true
              : false
          }
          helperText={
            valid && blogData.post_name == null
              ? "This Field is Required *"
              : ""
          }
        />

        <TextField
          name="meta_title"
          value={blogData.meta_title}
          label="Meta Title"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => blogEditHandler(e)}
          error={
            (valid && blogData.meta_title == null) || blogData.meta_title == ""
              ? true
              : false
          }
          helperText={
            valid && blogData.post_name == null
              ? "This Field is Required *"
              : ""
          }
        />

        <TextField
          name="meta_description"
          value={blogData.meta_description}
          label="MetaDescription"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => blogEditHandler(e)}
          error={
            (valid && blogData.meta_description == null) ||
            blogData.meta_description == ""
              ? true
              : false
          }
          helperText={
            valid && blogData.meta_keywords == null
              ? "This Field is Required *"
              : ""
          }
        />

        <TextField
          name="meta_keywords"
          value={blogData.meta_keywords}
          label="Meta keywords"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => blogEditHandler(e)}
          error={
            (valid && blogData.meta_keywords == null) ||
            blogData.meta_keywords == ""
              ? true
              : false
          }
          helperText={
            valid && blogData.meta_keywords == null
              ? "This Field is Required *"
              : ""
          }
        />

        <TextField disabled name="text" label="disbled" />
      </Stack>
    </>
  );
};

export default CatePanel;
