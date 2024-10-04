import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Fab from "@mui/material/Fab";

import Divider from "@mui/material/Divider";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import {
  getBusinessUserDetails,
  getBusinessUserSubscriptionHistory,
} from "../../../services/operations/userAPI";

import Iconify from "../../components/iconify/Iconify";
import SubDetailPage from "./tableSub";

const MODE = import.meta.env.MODE;
let uri = MODE === "development" ? "" : "/admin";

export default function details() {
  let b = {
    padding: "5px 10px",
    cursor: "pointer",
    height: "100%",
    "&:hover": {
      boxShadow: "none",
    },
  };

  const [state, setState] = useState({});
  const [reviews, setReviews] = useState(0);
  const [report, setReport] = useState(0);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);

  const id = new URLSearchParams(window.location.search).get("search");

  useEffect(() => {
    (async () => {
      const data = await getBusinessUserDetails(id);
      setState(data?.data[0]);
      setReport(data.report);
      setReviews(data.reviews);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const data = await getBusinessUserSubscriptionHistory(id);
      setSubscriptionDetails(data);
    })();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "20px",
          background: "linear-gradient(to right, #c33764, #1d2671)",
          color: "white",
          padding: "10px 10px",
          height: "250px",
          position: "relative",
        }}
      >
        <CustomCard
          style={{
            left: "41%",
            bottom: "-55px",
            position: "absolute",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "86px",
              height: "86px",
              padding: "16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              borderRadius: "68px",
              border: "1px solid #7053C1",
            }}
          >
            <img src={uri + "/images/icons/default-company.svg"} alt="" />
          </div>

          <div>
            <Typography
              variant="h2"
              color="black"
              fontWeight={700}
              gutterBottom={false}
            >
              {state?.companyname}
            </Typography>
            <Typography fontWeight={600} variant="overline" color={"gray"}>
              Owner : {`${state.fname} ${state.lname}`}
            </Typography>
          </div>
        </CustomCard>
      </Box>

      <Grid container spacing={5} mt={20}>
        <Grid item xs={4}>
          <BottomCard
            title="Review"
            value={reviews}
            url={`/admin/businessuser/review?search=${state.id}`}
          />
        </Grid>

        <Grid item xs={4}>
          <BottomCard
            title="Report"
            value={report}
            url={`/admin/businessuser/report?search=${state.id}`}
          />
        </Grid>
        <Grid item xs={4}>
          <BottomCard
            title="Review"
            value={reviews}
            url={`/admin/businessuser/review?search=${state.id}`}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomCard>
            <div style={{ width: "100%" }}>
              <Typography variant="h3" fontWeight={700}>
                {state?.companyname} Details
              </Typography>

              <Divider />

              <div style={{ marginTop: "15px" }}>
                <ContentBox
                  icon="ic:baseline-email"
                  item={"Email"}
                  value={state.email}
                />
                <ContentBox
                  icon="ic:baseline-phone"
                  item={"Phone"}
                  value={state.phone ?? "Not set"}
                />
                <ContentBox
                  icon="ion:navigate"
                  item={"Address"}
                  value={state.address ?? "Not set"}
                />
                <ContentBox
                  icon="ic:round-attach-email"
                  item={"Work Email"}
                  value={state.workemails ?? "Not set"}
                />

                <ContentBox
                  icon="ph:globe"
                  item={"Website"}
                  value={state.website ?? "Not set"}
                />

                <ContentBox
                  icon="mdi:briefcase"
                  item={"Job title"}
                  value={state.jobtitle ?? "Not set"}
                />
              </div>
            </div>
          </CustomCard>
        </Grid>
        <Grid item xs={8}>
          <CustomCard>
            {subscriptionDetails.length ? (
              <div style={{ width: "100%" }}>
                <CardHeader title={"Subscription History"} />
                <SubDetailPage data={subscriptionDetails} />
              </div>
            ) : (
              <Box sx={{ width: "100%", p: "100px 20px" }}>
                <Typography variant="h1" fontWeight={600} textAlign="center">
                  No Subscription History
                </Typography>
              </Box>
            )}
          </CustomCard>
        </Grid>
      </Grid>
    </>
  );
}

const ContentBox = ({ icon, item, value }) => {
  const StyledSpan = styled("p")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }));

  return (
    <Grid container alignItems="center" mb={2}>
      <Grid item sm={4}>
        <StyledSpan>
          <Iconify color="#79153B" icon={icon} />
          <Typography variant="subtitle1" noWrap color="black">
            {item}
          </Typography>
        </StyledSpan>
      </Grid>

      <Grid item sm={5}>
        <Typography variant="subtitle2">{value}</Typography>
      </Grid>
    </Grid>
  );
};

const BottomCard = ({ title = "Title", value = 0, url }) => {
  const navigate = useNavigate();

  return (
    <CustomCard
      style={{
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Typography
            variant="h1"
            color="black"
            gutterBottom={false}
            fontWeight={700}
          >
            {value}
          </Typography>

          <img src={uri + "/images/icons/waveincrease.svg"} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" gutterBottom={false} fontWeight={700}>
            {title}
          </Typography>

          {/* <Stack direction="row" gap={1} alignItems="center">
            <span>
              <img src={uri + "/images/icons/up-arrow.svg"} alt="" />
            </span>
            <Typography variant="caption" gutterBottom={false} fontWeight={700}>
              12%
            </Typography>
          </Stack> */}
        </div>
      </div>

      <Fab
        onClick={() => navigate(url)}
        variant="extended"
        size="medium"
        color="primary"
      >
        View
        <ArrowRightAltIcon sx={{ ml: 1 }} />
      </Fab>
    </CustomCard>
  );
};

const CustomCard = ({ children, style }) => {
  return (
    <Card
      sx={{
        padding: "20px 28px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        boxShadow:
          "0px 6px 10px -6px rgba(0, 0, 0, 0.10), 0px 20px 25px -5px rgba(0, 0, 0, 0.10);",
        borderRadius: "20px",
        ...style,
      }}
    >
      {children}
    </Card>
  );
};
