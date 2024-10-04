import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomTextField from "../../components/custom-textfield/customtextfield";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import {
  GetCategory,
  addBusiness,
  getBusinessDetails,
  updateBusinessDetails,
} from "../../../services/operations/listing";
import Iconify from "../../components/iconify/Iconify";
import { ImageUploadService } from "../../utils/imageUploader";

const IMAGE_URL = "https://thetestingserver.com/review-web-s/image/";

export default function Index() {
  const { handleSubmit, control, watch, setValue } = useForm();
  const [personName, setPersonName] = React.useState([]);
  const [lurl, setLurl] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [logo, setLogo] = React.useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const [state, setState] = React.useState([]);
  const [length, setLength] = React.useState(0);

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const page = "?puchi=true";

      const data = await GetCategory(page);

      const d = data.data.map((e) => {
        return e.title;
      });

      setState(d);
      setLength(data.length);
    })();
  }, []);

  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    let LocalUrl = URL.createObjectURL(selectedFile);

    setLurl(LocalUrl);

    const formData = new FormData();
    formData.append("image", selectedFile);

    setImage(formData);
  };

  const submitHandler = async (event) => {
    let icon = "";
    if (lurl) {
      let data = await ImageUploadService(image);
      icon = data.image;
    }

    await addBusiness({
      ...event,
      icon,
      category: personName.length ? personName.join(",") : null,
    });
  };

  const ef = new URLSearchParams(window.location.search).get("e");

  React.useEffect(() => {
    if (ef) {
      (async () => {
        const d = await getBusinessDetails(ef);
        Object.entries(d).map(([key, values]) => {
          setValue(key, values);
        });

        setLogo(d.icon);

        if (d.category) {
          setPersonName(d.category.split(","));
        }
      })();
    }
  }, []);

  const updateListinghandler = async (event) => {
    let icon = logo;
    if (lurl) {
      let data = await ImageUploadService(image);
      icon = data.image;
    }

    await updateBusinessDetails({
      ...event,
      icon,
      category: personName.length ? personName.join(",") : null,
    });
  };

  console.log(logo);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!ef && (
        <Typography variant="h2" mb={5}>
          Add New Business
        </Typography>
      )}

      <form
        autoComplete="off"
        onSubmit={handleSubmit(ef ? updateListinghandler : submitHandler)}
      >
        <Grid container spacing={4} mb={10}>
          <Grid item xs={4}>
            <CustomTextField
              control={control}
              name="companyname"
              label="Business Name"
            />
          </Grid>

          <Grid item xs={4}>
            <CustomTextField control={control} name="website" label="website" />
          </Grid>

          <Grid item xs={4}>
            <CustomTextField control={control} name="address" label="Address" />
          </Grid>

          {/* <Grid item xs={4}>
            <CustomTextField
              control={control}
              name="fname"
              label="First Name"
            />
          </Grid>

          <Grid item xs={4}>
            <CustomTextField control={control} name="lname" label="Last Name" />
          </Grid> */}

          <Grid item xs={4}>
            <CustomTextField
              control={control}
              name="workemail"
              label="Work email"
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTextField
              control={control}
              type="number"
              name="phone"
              label="Phone Number"
            />
          </Grid>

          <Grid item xs={4}>
            <Stack direction="row" gap={6}>
              <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
                gap={2}
                sx={{
                  border: "2px dashed black",
                  width: "100%",
                  bgcolor: "#64002642",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                {!lurl ? (
                  <>
                    <Iconify icon="ion:camera" />
                    <Typography variant="h5">Select company Logo</Typography>
                  </>
                ) : (
                  <Typography>
                    Click on update Listing to update logo
                  </Typography>
                )}

                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </Stack>

              <Avatar
                alt="Logo"
                src={!lurl ? IMAGE_URL + logo : lurl}
                sx={{ width: 50, height: 50 }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              control={control}
              name="about"
              label="About Your Business"
              row={5}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                fullWidth
                value={personName}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Category" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, index) => (
                      <Chip key={index} label={value} />
                    ))}
                  </Box>
                )}
              >
                {state.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box>
          <Button sx={{ mr: 2 }} type="submit" variant="contained">
            {ef ? "update Listing" : "Add Listing"}
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
