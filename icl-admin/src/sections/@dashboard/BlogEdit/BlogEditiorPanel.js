import { Stack, TextField } from "@mui/material";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BlogEditiorPanel = ({ blogData, editData, valid }) => {
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

        <TextField
          InputLabelProps={{ shrink: true }}
          name="text"
          label="alterntive"
        />
      </Stack>
    </>
  );
};

export const BlogCkEditor = ({ blogData, editData }) => {
  const [state, setstate] = React.useState(null);

  React.useEffect(() => {
    editData({
      ...blogData,
      post_description: state,
    });
  }, [state]);

  return (
    <>
      <CKEditor
        name="sadasdsad"
        onChange={(change, editor) => {
          setstate(editor.getData());
        }}
        style={{ minHeigth: "400px" }}
        editor={ClassicEditor}
        data={blogData.post_description}
      />
    </>
  );
};
export default BlogEditiorPanel;
