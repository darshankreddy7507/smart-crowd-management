import { Card, CardContent, Typography } from "@mui/material";
import { buses, stops, cameras } from "../data/mockData";

function Alerts() {

  // Generate alerts
  const busAlerts = buses
    .filter(bus => bus.status === "Full")
    .map(bus => `Bus ${bus.id} is full`);

  const stopAlerts = stops
    .filter(stop => stop.crowdLevel === "High")
    .map(stop => `Stop ${stop.name} is overcrowded`);

  const cameraAlerts = cameras
    .filter(cam => cam.status !== "Active")
    .map(cam => `Camera ${cam.id} is ${cam.status}`);

  const allAlerts = [...busAlerts, ...stopAlerts, ...cameraAlerts];

  return (
    <div style={{ padding: 20 }}>
      <h1>System Alerts</h1>
      {allAlerts.length === 0 ? (
        <Typography>No current alerts</Typography>
      ) : (
        allAlerts.map((alert, i) => (
          <Card key={i} className="dashboard-card alert-card">
            <CardContent>
              <Typography>{alert}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default Alerts;