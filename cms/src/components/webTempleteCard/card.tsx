import { Button, CardMedia } from "@mui/material";
import { StyledCard, StyledCardContent } from "./card.style";

interface cardInter {
  img: string;
}

export default function WebTempleteCard({ img }: cardInter) {
  return (
    <StyledCard>
      <CardMedia component="img" height="300" image={img} alt="Paella dish" />

      <StyledCardContent>
        <Button variant="outlined">Create</Button>
        <Button variant="contained">Preview</Button>
      </StyledCardContent>
    </StyledCard>
  );
}
