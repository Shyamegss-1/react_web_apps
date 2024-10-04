// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
// routes
// components
import Iconify from "../../../../../components/iconify/Iconify";
import usePopover from "../../../../../components/custom-popover/use-popover";
import CustomPopover from "../../../../../components/custom-popover/custom-popover";
import { BLOG } from "../../../../../constants/route-path";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function PostDetailsToolbar({
  publish,
  backLink,
  editLink,
  liveLink,
  publishOptions,
  onChangePublish,
  sx,
  ...other
}) {
  const popover = usePopover();

  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
          ...sx,
        }}
        {...other}
      >
        <Button
          LinkComponent={Link}
          to={BLOG}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Back
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {true && (
          <Tooltip title="Go Live">
            <IconButton href={liveLink}>
              <Iconify icon="eva:external-link-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Edit">
          <IconButton href={editLink}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <LoadingButton
          variant="contained"
          color="inherit"
          loading={false}
          loadingIndicator="Loading…"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          onClick={popover.onOpen}
          sx={{ textTransform: "capitalize" }}
        >
          {"published"}
        </LoadingButton>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {POST_PUBLISH_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === publish}
            onClick={() => {
              popover.onClose();
              onChangePublish(option.value);
            }}
          >
            {option.value === "published" && (
              <Iconify icon="eva:cloud-upload-fill" />
            )}
            {option.value === "draft" && (
              <Iconify icon="solar:file-text-bold" />
            )}
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

const POST_PUBLISH_OPTIONS = [
  {
    value: "published",
    label: "Published",
  },
  {
    value: "draft",
    label: "Draft",
  },
];
