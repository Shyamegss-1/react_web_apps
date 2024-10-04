import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocationGallery from "./@section/locationGallery";
import Details from "./@section/details";
import TravelerInfo from "./@section/travelerInfo";
import TourSummary from "./@section/tourSummary";
import StarIcon from "@mui/icons-material/Star";

import ReviewBox from "./@section/reviewBox";

const DetailPage = () => {
	return (
		<Box sx={{ p: "30px 0" }}>
			<Grid
				container
				justifyContent='space-between'
				sx={{ position: "relative" }}>
				<Grid item md={8}>
					<LocationGallery />

					<TourSummary />
				</Grid>

				<Grid item md={3.6}>
					<Details />

					<TravelerInfo />
				</Grid>

				<Grid item md={12}>
					<Box py={4} sx={{ borderBottom: "1px solid #E7E7E7" }}>
						<Stack direction='row' alignItems='center' gap={1} mb={1}>
							<StarIcon fontSize='small' />
							<Typography variant='h6'>4.9 &#8226; 187 reviews</Typography>
						</Stack>

						<ReviewBox />

						<Button
							variant='outlined'
							sx={{
								zIndex: 111,
								borderColor: "gray",
								backgroundColor: "#80808066",
								color: "white",
								ml: 8,
								"&:hover": {
									borderColor: "gray",
									backgroundColor: "gray",
									color: "white",
								},
							}}>
							Show all reviews
						</Button>
					</Box>
				</Grid>

				<Grid item md={12}>
					<Box sx={{ overflow: "hidden", borderRadius: "10px", mt: 5 }}>
						<iframe
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143572.58785055904!2d8.033124727109971!3d46.509182474129204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478f79d6ed384d4b%3A0xf951ade012196fda!2sGross%20Wannenhorn!5e0!3m2!1sen!2sin!4v1683177488416!5m2!1sen!2sin'
							width='100%'
							height='500'
							style={{ border: 0 }}
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default DetailPage;
