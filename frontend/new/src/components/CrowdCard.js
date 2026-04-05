import { Card, CardContent, Typography } from "@mui/material";

function CrowdCard({ stop }) {

    const getColor = () => {
        if (stop.crowd < 20) return "green";
        if (stop.crowd < 40) return "orange";
        return "red";
    };

    return (
        <Card 
        className="dashboard-card"
        style={{ margin: 10, borderLeft: `8px solid ${getColor()}` }}>
            <CardContent>
                <Typography variant="h6">{stop.name}</Typography>
                <Typography>Crowd: {stop.crowd}</Typography>
            </CardContent>
        </Card>
    );
}

export default CrowdCard;