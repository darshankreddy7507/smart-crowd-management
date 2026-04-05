import { Card, CardContent, Typography } from "@mui/material";

function BusCard({ bus }) {

    const getColor = () => {
        if (bus.status === "Empty") return "green";
        if (bus.status === "Medium") return "orange";
        if (bus.status === "Full") return "red";
        return "gray";
    };

    return (
        <Card
        className="dashboard-card"
        style={{ margin: 10, borderLeft: `8px solid ${getColor()}` }}
        >
            <CardContent>
                <Typography variant="h6">Bus {bus.id}</Typography>
                <Typography>Passengers: {bus.passengers}</Typography>
                <Typography>Status: {bus.status}</Typography>
            </CardContent>
        </Card>
    );
}

export default BusCard;