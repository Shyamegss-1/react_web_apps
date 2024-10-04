import {
  Card,
  Paper,
  Box,
  Typography,
  CardContent,
  CardHeader,
} from "@mui/material";

import React from "react";

const green = {
  p: "9px",
  borderColor: "green",
  background: "#EEFAE8",
};

const AppProductsRanking = () => {
  return (
    <Card>
      <CardHeader title="Most Purchased" />

      <CardContent>
        <Box display="grid" rowGap={2}>
          {[...Array(5)].map((_, i) => (
            <Paper
              key={i}
              variant="outlined"
              sx={{
                p: 1.2,
                display: "grid",
                gridTemplateColumns: "auto 65% auto",
                justifyContent: "start",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  overflow: "hidden",
                  borderRadius: 1,
                  background: `url(https://images.unsplash.com/photo-1619286188088-de820bdc1230?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80) no-repeat center`,
                  backgroundSize: "cover",
                }}
              />

              <Box>
                <Typography variant="button">Lorem ipsum dolor sit.</Typography>
                <Typography variant="inherit">kurta</Typography>
              </Box>

              <Box>
                <Paper sx={green}>
                  <Typography variant="button" color="green">
                    {2 + (Math.random() * 4).toFixed(2)}k
                  </Typography>
                </Paper>
              </Box>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AppProductsRanking;
