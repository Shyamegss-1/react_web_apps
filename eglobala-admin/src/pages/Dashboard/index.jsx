import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SubscriberTable from "../../core/sections/dashboard/subscriberTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useOnceEffect from "../../core/hooks/useOnce";
import ContactTable from "../../core/sections/dashboard/contactTable";
import {
  deleteVisitData,
  getVisitorData,
} from "../../services/operations/visitApi";
import { getQueryData } from "../../services/operations/settingAPI";

export default function Index() {
  const { token } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([]);
  const [contact, setContact] = useState([]);

  const [totalData, setTotalData] = useState([]);

  useOnceEffect(async () => {
    const result = await getVisitorData(token, navigate, true, "contacts");
    const datata = await getVisitorData(token, navigate, false, "subscribers");
    const eell = await getQueryData(token, navigate);

    setTotalData(eell);

    setContact(result);
    setState(datata);
  }, []);

  const subDeleteHadler = async (id) => {
    const result = await deleteVisitData(token, id, navigate, "subscribers");
    setState(result);
  };
  const contactDeleteHadler = async (id) => {
    const result = await deleteVisitData(token, id, navigate, "contacts");
    setContact(result);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3} rowSpacing={{ md: 13, xs: 5 }}>
          {totalData.length > 0 ? (
            <>
              <Grid item md={3} sm={6} xs={12}>
                <TotalCard
                  lable="Jobs"
                  href="/admin/jobs"
                  amount={totalData[0]?.jobs_count}
                />
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <TotalCard
                  href="/admin/category"
                  lable="Categories"
                  amount={totalData[0]?.subcategory_count}
                />
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <TotalCard
                  href="/admin/department"
                  lable="Department"
                  amount={totalData[0]?.categorys_count}
                />
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <TotalCard
                  href="/admin/carrer"
                  lable="Applicants"
                  amount={totalData[0]?.careers_count}
                />
              </Grid>
            </>
          ) : (
            [...Array(4)].map((_, e) => {
              return (
                <Grid item md={3} sm={6} xs={12} key={e}>
                  <Skeleton variant="rounded" width={"100%"} height={150} />
                </Grid>
              );
            })
          )}

          {state.length > 0 ? (
            <Grid item xs={12}>
              <SubscriberTable data={state} subDeleteHadler={subDeleteHadler} />
            </Grid>
          ) : (
            <Grid my={30} item xs={12}>
              <Typography variant="inherit" textAlign="center">
                We couldn't find any information to show on Subscribers list .
              </Typography>
            </Grid>
          )}

          {contact.length > 0 ? (
            <Grid item xs={12}>
              <ContactTable
                data={contact}
                contactDeleteHadler={contactDeleteHadler}
              />
            </Grid>
          ) : (
            <Grid my={30} item xs={12}>
              <Typography variant="inherit" textAlign="center">
                We couldn't find any information to show on Contact list.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

const TotalCard = ({ amount, lable, href = "admin" }) => {
  const navigate = useNavigate();

  return (
    <StyledBox onClick={() => navigate(href)}>
      <StyledTextBox>
        <Typography
          component="div"
          variant="h2"
          fontWeight={600}
          color="#7867ab"
        >
          {amount}
        </Typography>
      </StyledTextBox>

      <Typography component="div" variant="h4" color="#3f3f3f">
        {lable}
      </Typography>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[4],
  padding: "25px 16px",
  display: "flex",
  borderRadius: 7,
  backdropFilter: "blur(6px)",
  alignItems: "center",
  cursor: "pointer",
  flexDirection: "column",
  "&:hover": {
    boxShadow: theme.shadows[1],
  },
}));

const StyledTextBox = styled(Box)(() => ({
  width: "80px",
  height: "80px",
  display: "flex",
  borderRadius: 50,
  background: "linear-gradient(to right, #a8c0ff21, #3f2b962e)",
  alignItems: "center",
  justifyContent: "center",
  margin: "0px 0 20px 0",
}));
