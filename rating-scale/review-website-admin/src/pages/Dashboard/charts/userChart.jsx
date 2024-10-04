import React from "react";

import { styled, useTheme } from "@mui/material/styles";

import Chart, { useChart } from "../../../core/components/chart";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

function UserChart({ data }) {
  const CHART_HEIGHT = 400;

  const LEGEND_HEIGHT = 72;

  const StyledChart = styled(Chart)(({ theme }) => ({
    height: CHART_HEIGHT,
    "& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject": {
      height: `100% !important`,
    },
    "& .apexcharts-legend": {
      height: LEGEND_HEIGHT,
      borderTop: `dashed 1px ${theme.palette.divider}`,
      top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
  }));

  const theme = useTheme();

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: false,
      },
    },

    tooltip: {
      enabled: true,
      theme: true,
      style: {
        fontSize: "16px",
      },
    },
    labels: ["Verified User", "Unverified User"],
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      style: {
        color: "white",
        fontSize: "12px",
      },
      dropShadow: {
        enabled: true,
      },
    },

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
          },
        },
      },
    },
  });
  return (
    <Card>
      <CardHeader title={"User’s Distribution"} />

      <StyledChart
        dir="ltr"
        type="donut"
        series={data}
        options={chartOptions}
        width="100%"
        height={"350px"}
      />
    </Card>
  );
}

export default UserChart;
