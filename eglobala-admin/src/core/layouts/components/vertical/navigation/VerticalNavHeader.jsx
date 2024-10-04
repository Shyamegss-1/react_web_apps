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
  padding: 10,
  margin: "20px 0",
  cursor: "pointer",
});

const VerticalNavHeader = (props) => {
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props;

  return (
    <MenuHeaderWrapper className="nav-header" sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <StyledLink>
          <img
            width="100%"
            src="https://eglobalsoftsolutions.com/assets/img/logo.svg"
            alt="eglobalsoft"
          />
        </StyledLink>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
