import React, { Component } from "react";
import Papa from "papaparse";
import { Typography, Box, Card, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

export default class BulkUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file.name.split(".")[1] !== "csv")
      toast.error("You can only upload CSV files");
    else {
      reader.onload = () => {
        const csvData = reader.result;

        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: function (h) {
            return h.trim();
          },
          complete: (results) => {
            let formattedData = this.formatCSVData(results.data);

            formattedData = formattedData.map((e) => {
              return e;
            });

            console.log(formattedData);

            this.setState({ formattedData });
          },
        });
      };
      reader.readAsText(file);
    }
  };

  formatCSVData(data) {
    return data.map((row) => {
      delete row["ï»¿id"];
      return row;
    });
  }

  handleRemoveClick = () => {
    this.setState((state) => delete state["formattedData"]);
  };

  render() {
    return (
      <div style={{ padding: "25px" }}>
        <Typography gutterBottom variant="h3">
          Bulk Business Uploader
        </Typography>

        {!this.state.formattedData ? (
          <Box>
            <Button
              component="label"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add file
              <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={this.handleFileChange}
              />
            </Button>

            <Button
              sx={{ ml: 3 }}
              component="a"
              href={"/admin/dummylist.csv"}
              variant="contained"
              color="success"
              download={"dummylist.csv"}
              startIcon={<DownloadIcon />}
            >
              Download Sample CSV
            </Button>
          </Box>
        ) : (
          <Stack direction="row" spacing={3} alignItems="center">
            <Button
              onClick={this.handleRemoveClick}
              variant="contained"
              color="error"
              startIcon={<DeleteOutlineIcon />}
            >
              remove files
            </Button>
            <Button
              onClick={() =>
                this.props.BulkUploadHandler(this.state.formattedData)
              }
              variant="contained"
              color="success"
              startIcon={<CloudUploadIcon />}
            >
              upload
            </Button>
            <Typography color="green" variant="caption">
              ({this.state.formattedData.length + ` business Listing`})
            </Typography>
          </Stack>
        )}

        <Box mt={5}>
          <Card elevation={10} sx={{ padding: 5, width: "500px" }}>
            <Typography variant="h4" mb={4}>
              Valid Fields{" "}
              <Typography variant="overline" color="error">
                (below mention fields are required)
              </Typography>
            </Typography>

            <ul style={{ marginLeft: "30px" }}>
              <li>
                <Typography variant="subtitle1">
                  companyName{" "}
                  <Typography variant="overline">(company name)</Typography>
                </Typography>
              </li>

              <li>
                <Typography variant="subtitle1">
                  category{" "}
                  <Typography variant="overline">(category)</Typography>
                </Typography>
              </li>

              <li>
                <Typography variant="subtitle1">
                  website{" "}
                  <Typography variant="overline">(Website url)</Typography>
                </Typography>
              </li>

              <li>
                <Typography variant="subtitle1">
                  about{" "}
                  <Typography variant="overline">(about company)</Typography>
                </Typography>
              </li>

              <li>
                <Typography variant="subtitle1">
                  workemail{" "}
                  <Typography variant="overline">(work email)</Typography>
                </Typography>
              </li>

              <li>
                <Typography variant="subtitle1">
                  phone{" "}
                  <Typography variant="overline">(company phone)</Typography>
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  address{" "}
                  <Typography variant="overline">(company address)</Typography>
                </Typography>
              </li>
            </ul>
          </Card>
        </Box>
      </div>
    );
  }
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
