import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "../styles/dashboard.css"; // adjust path if your CSS is elsewhere

function StopCard({ stop = {} }) {
  // defensive defaults
  const id = stop.id ?? stop.name ?? "—";
  const location = stop.location ?? stop.name ?? "Unknown location";
  const level = (stop.crowdedLevel ?? stop.crowdLevel ?? "Low").toString();

  // pick color class (uses CSS classes defined in dashboard.css)
  const levelClass =
    level.toLowerCase() === "high"
      ? "status-high"
      : level.toLowerCase() === "medium"
      ? "status-medium"
      : "status-low";

  return (
    <Card className={`dashboard-card ${levelClass}`}>
      <CardContent>
        <Typography variant="h6">Stop {id}</Typography>
        <Typography>Location: {location}</Typography>
        <Typography>Crowd Level: {level}</Typography>
      </CardContent>
    </Card>
  );
}

export default StopCard;