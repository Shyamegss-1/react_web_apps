import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(4.5),
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
}));

const StyledLink = styled("a")({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  width: "100%",
  cursor: "pointer",
  overflow: "hidden",
});

const VerticalNavHeader = (props) => {
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props;

  const MODE = import.meta.env.MODE;
  let uri = MODE === "development" ? "" : "/admin";

  return (
    <MenuHeaderWrapper className="nav-header" sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <StyledLink>
          <img src="https://thepreview.pro/reviewsix/Logo.png" alt="logo" />
          {/* <Typography variant="h6" align="center">
            company logo
          </Typography> */}
        </StyledLink>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;

<div>
  <div></div>
</div>;
