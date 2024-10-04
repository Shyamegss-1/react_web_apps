import { Box, TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";

const SocialLinks = () => {
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <BoxIcon>
          <FacebookIcon sx={{ color: "blue" }} />
        </BoxIcon>

        <TextField
          sx={{ width: "200px" }}
          size="small"
          label="link"
          id="title"
          defaultValue="www.facebook.com"
        />
      </Box>

      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <BoxIcon>
          <ModeEditIcon sx={{ color: "#955cfd" }} />
        </BoxIcon>

        <BoxIcon>
          <DeleteIcon sx={{ color: "red" }} />
        </BoxIcon>

        <BoxIcon>
          <LinkIcon sx={{ color: "gray" }} />
        </BoxIcon>
      </Box>
    </Box>
  );
};

export default SocialLinks;

const BoxIcon = ({ children, style }) => {
  return (
    <Box
      sx={{
        border: "1px solid #9393935c",
        width: "35px",
        p: 0.7,
        height: "35px",
        borderRadius: "5px",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </Box>
  );
};
