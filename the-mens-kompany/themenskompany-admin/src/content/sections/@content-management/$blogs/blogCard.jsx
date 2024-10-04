/* eslint-disable react/prop-types */
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Label from "../../../../components/label";
import { IconButton, MenuItem } from "@mui/material";

import Iconify from "../../../../components/iconify/Iconify";
import CustomPopover from "../../../../components/custom-popover/custom-popover";
import usePopover from "../../../../components/custom-popover/use-popover";
import Image from "../../../../components/image/Image";
import { useNavigate } from "react-router-dom";

import { STATIC_DATA } from "../../../../constants/path-constant";

// ----------------------------------------------------------------------

export default function PostCard({ post }) {
  const popover = usePopover();
  const naviage = useNavigate();

  const { image, post_title, post_description, publish, id } = post;

  return (
    <>
      <Stack component={Card} direction="row">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Label
              color={publish === "Published" ? "secondary" : "default"}
              variant={"soft"}
            >
              {publish}
            </Label>

            <Box
              component="span"
              sx={{ typography: "caption", color: "text.disabled" }}
            >
              26 jan 2023
            </Box>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link color="inherit">
              <Typography variant="subtitle2" line={2}>
                {post_title}
              </Typography>
            </Link>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {post_description}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton
              color={popover.open ? "inherit" : "default"}
              onClick={popover.onOpen}
            >
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Stack>
        </Stack>

        <Box
          sx={{
            width: 180,
            height: 240,
            position: "relative",
            flexShrink: 0,
            p: 1,
          }}
        >
          <Avatar
            alt={"kamles"}
            src={
              "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg"
            }
            sx={{ position: "absolute", top: 16, right: 16, zIndex: 9 }}
          />

          <Image src={STATIC_DATA + image} alt={"app}"} />
        </Box>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-left"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            naviage(`/ad-min/content/blog/preview?c=${id}`);
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => naviage(`/ad-min/content/blog/edit?y=true&c=${id}`)}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
