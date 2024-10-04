import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DatePicker from "../../../../components/Calander";

const TourSummary = () => {
	return (
		<Box>
			<Stack
				py={4}
				sx={{ borderBottom: "1px solid #E7E7E7" }}
				direction='row'
				justifyContent='space-between'>
				<Box>
					<Typography variant='h5'>
						Private room in farm stay hosted by sdsa
					</Typography>

					<Typography variant='subtitle1'>
						4 guests &#8226; 1 bedroom &#8226; 1 bed &#8226; 1.5 bathrooms
					</Typography>
				</Box>

				<Box>
					<Avatar sx={{ width: 46, height: 46 }} alt='Remy Sharp' />
				</Box>
			</Stack>

			<Box py={4} sx={{ borderBottom: "1px solid #E7E7E7" }}>
				{FEATURES.map(el => (
					<Stack key={el.id} direction='row' alignItems='start' mb={2.4}>
						<Box mr={2}>{el.icon}</Box>
						<Box>
							<Typography variant='h6'>{el.title}</Typography>
							<Typography variant='subtitle1'>{el.caption}</Typography>
						</Box>
					</Stack>
				))}
			</Box>

			<Box py={4} sx={{ borderBottom: "1px solid #E7E7E7" }}>
				<Typography mb={2} variant='subtitle1'>
					Reconnect with nature at this unforgettable escape with a unique and
					serene experience with its breathtaking view of the pine forest and
					direct access to the river. The property is surrounded by lush
					greenery and the sound of the river creates a peaceful ambiance.
					Guests can enjoy a morning cup of coffee or a relaxing evening by the
					river, taking in the beautiful scenery. Guests can also indulge in
					outdoor activities such as hiking and fishing in the nearby forest and
					river.
				</Typography>

				<Typography
					variant='button'
					fontWeight={600}
					sx={{ textDecoration: "underline", cursor: "pointer" }}>
					Show More
				</Typography>
			</Box>

			<Box py={4} sx={{ borderBottom: "1px solid #E7E7E7" }}>
				<Typography variant='h6'>Where you'll sleep</Typography>

				<Stack direction='row' gap={5}>
					{[...Array(2)].map(e => (
						<Box
							key={e}
							sx={{
								width: "20%",
								cursor: "pointer",
							}}>
							<Box
								sx={{
									overflow: "hidden",
									borderRadius: "7px",
									mt: 2,
								}}>
								<img
									style={{ verticalAlign: "middle" }}
									src='https://source.unsplash.com/random/500x330/?bedroom'
									alt=''
								/>
							</Box>

							<Typography variant='inherit' mt={2}>
								1 Bedroom
							</Typography>
							<Typography variant='inherit'>Double Bed</Typography>
						</Box>
					))}
				</Stack>
			</Box>

			<Box py={4} sx={{ borderBottom: "1px solid #E7E7E7" }}>
				<DatePicker />
			</Box>
		</Box>
	);
};

export default TourSummary;

const FEATURES = [
	{
		id: 1,
		icon: <TableRestaurantIcon sx={{ fontSize: "30px", color: "#585858" }} />,
		title: "Dedicated workspace",
		caption: "A common area with wifi that’s well suited for working.",
	},
	{
		id: 2,
		icon: <MilitaryTechIcon sx={{ fontSize: "30px", color: "#585858" }} />,
		title: "Kamlesh is a Superhost",
		caption: "A common area with wifi that’s well suited for working.",
	},
	{
		id: 3,
		icon: <CalendarMonthIcon sx={{ fontSize: "30px", color: "#585858" }} />,
		title: "Free cancellation before 1 Jun.",
		caption: "",
	},
];
