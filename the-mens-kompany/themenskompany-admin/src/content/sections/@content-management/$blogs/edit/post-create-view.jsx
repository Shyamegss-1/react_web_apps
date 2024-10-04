// @mui
import Container from "@mui/material/Container";

//
import PostNewEditForm from "./post-new-edit-form";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function PostCreateView() {
  return (
    <Container>
      <Typography variant="h3">Create a new post</Typography>
      <PostNewEditForm />
    </Container>
  );
}
