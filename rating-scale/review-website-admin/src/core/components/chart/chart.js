import { memo } from "react";
import ApexChart from "react-apexcharts";

import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const Chart = styled(ApexChart)(({ theme }) => ({
  "& .apexcharts-canvas": {
    // Tooltip
    "& .apexcharts-tooltip": {
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[10],
      borderRadius: theme.shape.borderRadius * 1.25,
      "&.apexcharts-theme-light": {
        borderColor: "transparent",
      },
    },
    "& .apexcharts-xaxistooltip": {
      borderColor: "transparent",
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[10],
      borderRadius: theme.shape.borderRadius * 1.25,
      "&:before": {
        borderBottomColor: alpha(theme.palette.grey[500], 0.24),
      },
      "&:after": {
        borderBottomColor: alpha(theme.palette.background.default, 0.8),
      },
    },
    "& .apexcharts-tooltip-title": {
      textAlign: "center",
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      color:
        theme.palette.text[
          theme.palette.mode === "light" ? "secondary" : "primary"
        ],
    },

    // LEGEND
    "& .apexcharts-legend": {
      padding: 0,
    },
    "& .apexcharts-legend-series": {
      display: "inline-flex !important",
      alignItems: "center",
    },
    "& .apexcharts-legend-marker": {
      marginRight: 8,
    },
    "& .apexcharts-legend-text": {
      lineHeight: "18px",
      textTransform: "capitalize",
    },
  },
}));

export default memo(Chart);
