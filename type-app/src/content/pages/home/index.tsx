import Grid from "@mui/material/Grid";
import ViewCard from "../../../components/viewCard";
import { Box } from "@mui/material";

const Index = () => {
	return (
		<Box sx={{ maxWidth: "1890px", py: "35px" }}>
			<Grid container justifyContent='start' flexWrap='wrap' spacing={5}>
				{[...Array(40)].map((_, k) => (
					<Grid
						key={k}
						item
						xs={12}
						sm={6}
						md={4}
						lg={2.39}
						flexBasis='100%'
						flexShrink={0}>
						<ViewCard />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Index;
