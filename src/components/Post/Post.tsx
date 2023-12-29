import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ITwit } from "../../routes";
interface IProps {
  twit: ITwit;
  onDelete: () => void;
  onEdit: () => void;
}
export function Post({ twit, onDelete, onEdit }: IProps) {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {twit.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {twit.created_at}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              description
            </Typography>
            <Button onClick={onDelete}>Delete</Button>
            <Button onClick={onEdit}>Edit</Button>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
