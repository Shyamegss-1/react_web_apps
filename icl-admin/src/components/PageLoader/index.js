import { Grid } from "@mui/material";
import React from "react";

const Index = () => {
  return (
    <Grid
      container
      className="center"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item className="circle pulse">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/avatars/avatar_11.jpg`}
        />
      </Grid>
    </Grid>
  );
};

export default Index;
