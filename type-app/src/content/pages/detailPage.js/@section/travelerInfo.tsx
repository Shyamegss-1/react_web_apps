import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TravelerInfo = () => (
	<Box sx={{ mt: 4, paddingRight: "148px", position: "sticky", top: "10px" }}>
		<Paper
			elevation={2}
			sx={{
				border: "1px solid #DEDEDE",
				padding: "30px 20px",
				borderRadius: "15px",
			}}>
			<Typography variant='subtitle1' fontWeight={600}>
				₹3,999 night
			</Typography>

			<Grid
				container
				justifyContent='center'
				mt={2}
				sx={{ border: "1px solid #e3e1e1", borderRadius: "10px " }}>
				<Grid item container>
					<Grid
						md={6}
						item
						sx={{
							borderRight: "1px solid #e3e1e1",
							padding: "10px 37px 10px 12px",
						}}>
						<Typography variant='overline' sx={{ lineHeight: 1 }}>
							checkin
						</Typography>
						<Typography variant='subtitle2'>5/19/2023</Typography>
					</Grid>

					<Grid md={6} sx={{ padding: "10px 37px 10px 12px" }} item>
						<Typography variant='overline' sx={{ lineHeight: 1 }}>
							checkin
						</Typography>
						<Typography variant='subtitle2'>5/19/2023</Typography>
					</Grid>
				</Grid>

				<Grid
					item
					sx={{
						borderTop: "1px solid #e3e1e1",
						width: "100%",
						padding: "10px 37px 10px 12px",
					}}
					justifyContent='space-between'>
					<Typography variant='overline' sx={{ lineHeight: 1 }}>
						guests
					</Typography>
					<Typography variant='subtitle2'>1 guest</Typography>
				</Grid>
			</Grid>

			<Button
				size='large'
				sx={{
					my: 2,
					width: "100%",
					color: "white",
					fontWeight: 600,
					background:
						"linear-gradient(179.1deg, rgb(43, 170, 96) 2.3%, rgb(129, 204, 104) 98.3%)",
				}}>
				Reserve
			</Button>

			<Typography align='center'>You won't be charged yet</Typography>
		</Paper>
	</Box>
);
export default TravelerInfo;
