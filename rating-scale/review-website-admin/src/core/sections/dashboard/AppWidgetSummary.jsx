// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

// components
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "0",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  // width: theme.spacing(aut),
  // height: theme.spacing(15),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

const MODE = import.meta.env.MODE;
let uri = MODE === "development" ? "" : "/admin";

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        padding: "40px 30px",
        borderRadius: "20px",
        textAlign: "center",
        color: "black",
        display: "flex",
        boxShadow:
          "0px 6px 10px -6px rgba(0, 0, 0, 0.05), 0px 20px 25px -5px rgba(0, 0, 0, 0.05);",
        alignItems: "center",
        gap: "20px",
        flex: "1 0 0",
        alignSelf: "stretch",
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: "#7053C1",
        }}
      >
        <img src={uri + icon} alt="" />
      </StyledIcon>

      <div>
        <Typography
          variant="h2"
          fontWeight={600}
          color="rgba(58, 53, 65, 0.87)"
          textAlign="start"
        >
          {total}
        </Typography>
        <Typography variant="h6" color="black">
          {title}
        </Typography>
      </div>
    </Card>
  );
}
