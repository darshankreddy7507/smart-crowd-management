import { Card, CardContent, Typography, Grid } from "@mui/material";

function SystemOverview({ buses = [], stops = [], cameras = [] }) {

  const totalBuses = buses?.length || 0;

  const crowdedStops = stops?.filter(
    (stop) => stop?.crowdedLevel === "High"
  ).length || 0;

  const crowdedBuses = buses?.filter(
    (bus) => bus?.crowdedLevel === "High"
  ).length || 0;

  const activeCameras = cameras?.filter(
    (cam) => cam?.status === "Active"
  ).length || 0;

  return (
    <Grid container spacing={2} style={{ marginBottom: 20 }}>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Buses</Typography>
            <Typography variant="h4">{totalBuses}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Crowded Stops</Typography>
            <Typography variant="h4">{crowdedStops}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Crowded Buses</Typography>
            <Typography variant="h4">{crowdedBuses}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Active Cameras</Typography>
            <Typography variant="h4">{activeCameras}</Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}

export default SystemOverview;