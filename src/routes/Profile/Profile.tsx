import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared";
interface IProfileData {
  about: string;

  country: string;

  first_name: string;

  last_name: string;

  username: string;
}
export const Profile = () => {
  const httpClient = useHttpClient();
  const [data, setData] = useState<IProfileData | null>(null);
  const start = async () => {
    const data = await httpClient.get<IProfileData>("/profile/moy_gosoadin/");
    setData(data);
    console.log("data", data);
  };
  useEffect(() => {
    start();
  }, []);
  return (
    <Card variant="outlined" sx={{ height: 500 }}>
      <Grid container item xs={12} spacing={2} padding={2}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h3" component="div">
            My profile
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom variant="h5" component="div">
            user name
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {data?.username}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography gutterBottom variant="h5" component="div">
            first name
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {data?.first_name}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography gutterBottom variant="h5" component="div">
            last name
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {data?.last_name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom variant="h5" component="div">
            about
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {data?.about}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom variant="h5" component="div">
            country
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {data?.country}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
