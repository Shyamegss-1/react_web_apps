import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function ReviewBox() {
	return (
		<List
			sx={{
				width: "100%",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "space-between",
			}}>
			{[...Array(5)].map(e => (
				<ListItem key={e} sx={{ flexWrap: "wrap", pb: 3, width: "45%" }}>
					<ListItemAvatar>
						<Avatar>
							<ImageIcon />
						</Avatar>
					</ListItemAvatar>

					<ListItemText primary='Photos' secondary='Jan 9, 2014' />

					<Box sx={{ width: "100%", px: 7 }}>
						<Typography variant='subtitle2'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Dignissimos omnis numquam exercitationem, repudiandae debitis
							deleniti sed dolor obcaecati? Magnam voluptas enim, quasi, dolores
							eaque perferendis, labore minus ab laboriosam architecto omnis
							iusto nobis ea commodi delectus? Debitis esse dicta doloremque!
						</Typography>
					</Box>
				</ListItem>
			))}
		</List>
	);
}
