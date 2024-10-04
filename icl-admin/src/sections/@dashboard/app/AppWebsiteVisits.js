import PropTypes from "prop-types";

// @mui
import {
  Card,
  CardHeader,
  Box,
  Avatar,
  ListItemText,
  Typography,
  Button,
  CardContent,
  Divider,
} from "@mui/material";
// components

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const green = {
  p: "5px 10px",
  borderRadius: "10px",
  borderColor: "green",
  background: "#EEFAE8",
};

export default function AppWebsiteVisits({ title, subheader, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        {[1, 2, 3].map((_, index) => (
          <>
            <Box sx={{ pb: 1 }} display="flex" columnGap={2}>
              <Avatar>{index + 1}</Avatar>

              <ListItemText
                sx={{ margin: 0 }}
                primaryTypographyProps={{
                  sx: { m: "9px 0px 4px", fontSize: "15px", fontWeight: 500 },
                }}
                primary="/templates/react/react-free/"
                secondary={
                  <Typography>
                    <Box display="flex" columnGap={4} mt={1}>
                      <Box>
                        <Typography gutterBottom>Impressions</Typography>
                        <Box display="flex" columnGap={1}>
                          <Typography variant="h4">84.873</Typography>
                          <Box sx={green}>
                            <Typography variant="button" color="green">
                              34.67%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box>
                        <Typography gutterBottom>Clicks</Typography>
                        <Box display="flex" columnGap={1}>
                          <Typography variant="h4">84.873</Typography>
                          <Box sx={green}>
                            <Typography variant="button" color="green">
                              34.67%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Typography>
                }
              />

              <Box display="flex" alignItems="center">
                <Button size="small">visit url</Button>
              </Box>
            </Box>

            <Divider sx={{ m: "12px 0" }} />
          </>
        ))}
      </CardContent>
    </Card>
  );
}
