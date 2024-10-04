import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Details = () => (
	<Box>
		<Typography variant='h5'>
			Family Room near Narkanda:Nirvana Homes Rarta
		</Typography>

		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<StarIcon fontSize='small' />
				<Typography variant='subtitle1'>4.9</Typography>
				&nbsp; &nbsp;
				<Typography
					variant='subtitle1'
					sx={{ textDecoration: "underline", cursor: "pointer" }}>
					Pharog, Himachal Pradesh, India
				</Typography>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.7 }}>
				<Button
					sx={{ color: "gray", mr: 1 }}
					variant='text'
					size='small'
					startIcon={<IosShareIcon />}>
					Share
				</Button>

				<Button
					sx={{ color: "gray" }}
					variant='text'
					size='small'
					startIcon={<FavoriteBorderOutlinedIcon />}>
					Save
				</Button>
			</Box>
		</Box>
	</Box>
);

export default Details;
