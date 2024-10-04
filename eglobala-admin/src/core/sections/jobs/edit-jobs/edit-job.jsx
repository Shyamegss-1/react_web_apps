import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

//* custom components

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/custom-breadcrumbs";
import CustomTextField from "../../../components/custom-textfield/customtextfield";
import { useForm, Controller } from "react-hook-form";
import Editor from "../../../components/editior/editior";
import {
  getJobpostData,
  setJobpostData,
  updateJobpostData,
} from "../../../../services/operations/jobsApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubcategoryData } from "../../../../services/operations/subcategoryApi";

export default function EditJob() {
  const { handleSubmit, control, setValue } = useForm();

  const [editior, setEditior] = useState(defautl);

  const [state, setState] = useState([]);

  const { token } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  let i = Number(new URLSearchParams(window.location.search).get("i"));

  const submitHandler = (e) => {
    const editiorDiv = document.getElementById("editior-qill-je");

    if (editior === "" || editior === "<p><br></p>") {
      editiorDiv.style.border = "1px solid red";
    } else {
      editiorDiv.style.border = "1px solid rgba(58, 53, 65, 0.22)";
      setJobpostData(
        token,
        Object.assign(e, { description: editior }),
        navigate
      );
    }
  };

  const onUpdateHandler = (data) => {
    const editiorDiv = document.getElementById("editior-qill-je");

    if (editior === "" || editior === "<p><br></p>") {
      editiorDiv.style.border = "1px solid red";
    } else {
      editiorDiv.style.border = "1px solid rgba(58, 53, 65, 0.22)";
      updateJobpostData(
        token,
        { id: i, ...Object.assign(data, { description: editior }) },
        navigate
      );
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getSubcategoryData(token, navigate);

      setState(result);
    })();

    if (i) {
      (async () => {
        const data = await getJobpostData(token, navigate);
        const filtered = data.filter((e) => e.id === i)[0];

        setValue("department", filtered.subcategorie_id);
        setValue("title", filtered.job_title);
        setValue("location", filtered.location);
        setValue("applyby", filtered.apply_by);
        setValue("shift", filtered.shift);
      })();
    }
  }, [i]);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" mt={10}>
        <CustomBreadcrumbs
          heading="Add job post"
          links={[
            {
              name: "Dashboard",
              href: "/admin",
            },
            {
              name: "Jobs",
              href: "/admin/jobs",
            },
            {
              name: "edit",
              href: "#",
            },
          ]}
          sx={{
            mb: { xs: 3, md: 10 },
          }}
        />
      </Stack>

      <Grid container mt={4} justifyContent="space-between">
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Title, short description, image...
          </Typography>
        </Grid>

        <Grid md={7}>
          <form
            onSubmit={handleSubmit(i ? onUpdateHandler : submitHandler)}
            autoComplete="off"
          >
            <Card sx={{ p: 9 }}>
              <Stack spacing={6}>
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel>Select Category For job post</InputLabel>
                      <Select
                        value={value}
                        onChange={onChange}
                        name="department"
                        label="Select category For job post"
                      >
                        {state.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.title}
                          </MenuItem>
                        ))}
                      </Select>
                      {error && <span>{error.message}</span>}
                    </FormControl>
                  )}
                />

                <CustomTextField
                  control={control}
                  name="title"
                  label="Title of Job"
                />

                <CustomTextField
                  control={control}
                  name="location"
                  label="Job location"
                />

                <CustomTextField control={control} name="shift" label="Shift" />

                <CustomTextField
                  control={control}
                  name="applyby"
                  label="Apply by"
                  type="date"
                />

                <Editor value={editior} editiorHandler={setEditior} />

                <Stack spacing={1} direction="row">
                  <Button variant="contained" type="sumbit">
                    {i ? "update" : "Save"}
                  </Button>
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

const defautl = `<h2>Job description</h2>

<p><strong>Description:</strong>Need a react developer</p>

<p><strong>Requirements:</strong>React, Redux, Css, Javascript</p>

<p><strong>Job Responsibilities:</strong>&nbsp;Need a react developer who is having 2-3 yrs of experience</p>

<p><strong>What We Offer:</strong></p>

<p><strong>Exciting Projects:</strong>&nbsp;We focus on industries like High-Tech, communication, media, healthcare, retail and telecom. Our customer list is full of fantastic global brands and leaders who love what we build for them.</p>

<p><strong>Collaborative Environment:</strong>&nbsp;You Can expand your skills by collaborating with a diverse team of highly talented people in an open, laidback environment &mdash; or even abroad in one of our global centers or client facilities!</p>

<p><strong>Work-Life Balance:</strong>&nbsp;GlobalLogic prioritizes work-life balance, which is why we offer flexible work schedules, opportunities to work from home, and paid time off and holidays.</p>

<p><strong>Professional Development:</strong>&nbsp;Our dedicated Learning &amp; Development team regularly organizes Communication skills training(GL Vantage, Toast Master),Stress Management program, professional certifications, and technical and soft skill trainings.</p>

<p><strong>Excellent Benefits:</strong>&nbsp;We provide our employees with competitive salaries, family medical insurance, Group Term Life Insurance, Group Personal Accident Insurance , NPS(National Pension Scheme ), Periodic health awareness program, extended maternity leave, annual performance bonuses, and referral bonuses.</p>

<p><strong>Fun Perks:</strong>&nbsp;We want you to love where you work, which is why we host sports events, cultural activities, offer food on subsidies rates, Corporate parties. Our vibrant offices also include dedicated GL Zones, rooftop decks and GL Club where you can drink coffee or tea with your colleagues over a game of table and offer discounts for popular stores and restaurants!</p>

<p>Role:&nbsp;<a href="https://www.naukri.com/front-end-developer-jobs" target="_blank">Front End Developer</a></p>

<p>Industry Type:&nbsp;<a href="https://www.naukri.com/it-services-consulting-jobs" target="_blank">IT Services &amp; Consulting</a></p>

<p>Department:&nbsp;<a href="https://www.naukri.com/engineering-software-qa-jobs" target="_blank">Engineering - Software &amp; QA</a></p>

<p>Employment Type:&nbsp;Full Time, Permanent</p>

<p>Role Category:&nbsp;Software Development</p>

<p>Education</p>

<p>PG:&nbsp;Any Postgraduate</p>
`;
