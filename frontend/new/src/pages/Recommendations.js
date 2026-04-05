import { Card, CardContent, Typography } from "@mui/material";
import { stops, buses } from "../data/mockData";

function Recommendations() {
  const recs = [];

  // Example recommendation logic
  stops.forEach(stop => {
    if (stop.crowdLevel === "High") {
      recs.push(`Send extra bus to ${stop.name}`);
    }
  });

  buses.forEach(bus => {
    if (bus.status === "Full") {
      recs.push(`Reroute bus ${bus.id} to reduce crowd`);
    }
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Recommendations</h1>
      {recs.length === 0 ? (
        <Typography>No recommendations currently</Typography>
      ) : (
        recs.map((rec, i) => (
          <Card key={i} className="dashboard-card recommendation-card">
            <CardContent>
              <Typography>{rec}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default Recommendations;