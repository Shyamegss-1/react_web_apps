import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function SearchBar() {
	return (
		<Card
			sx={{
				display: "flex",
				justifyContent: "space-between",
				flexDirection: ["column", "column", "row"],
				alignItems: "center",
				borderRadius: "30px",
				cursor: "pointer",
				"& hr": {
					mx: 0.5,
				},
			}}
			elevation={2}>
			<Box sx={{ width: "100%" }}>
				<CardContent
					sx={{
						"&:last-child": {
							paddingBottom: "5px ",
						},
						p: "5px 12px",
					}}>
					<Typography variant='subtitle1' noWrap>
						Any Where
					</Typography>
				</CardContent>
			</Box>

			<Divider orientation='vertical' variant='middle' flexItem />

			<Box sx={{ width: "100%" }}>
				<CardContent
					sx={{
						"&:last-child": {
							paddingBottom: "5px",
						},
						p: "5px 12px",
					}}>
					<Typography variant='subtitle1' noWrap>
						Any Week
					</Typography>
				</CardContent>
			</Box>

			<Divider orientation='vertical' variant='middle' flexItem />

			<Box sx={{ width: "100%" }}>
				<CardContent
					sx={{
						"&:last-child": {
							paddingBottom: "5px",
						},
						p: "5px 12px",
						alignItems: "center",
						display: "flex",
						gap: 1,
					}}>
					<Typography variant='subtitle1' noWrap>
						Add Guest
					</Typography>

					<IconButton
						size='small'
						sx={{
							background: "#60BF65",
							"&:hover": { background: "#39AF61" },
						}}>
						<SearchIcon sx={{ color: "white" }} />
					</IconButton>
				</CardContent>
			</Box>
		</Card>
	);
}
