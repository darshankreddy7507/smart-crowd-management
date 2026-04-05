import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function DemandChart({ stops }) {

    const getBarColor = (level) => {
        if (level === "Low") return "rgb(160, 253, 163)";
        if (level === "Medium") return "rgb(251, 222, 147)";
        if (level === "High") return "rgb(251, 162, 162)";
        return "gray";
    };

    const data = {
        labels: stops.map(s => s.name),
        datasets: [{
            label: "Passenger Demand",
            data: stops.map(s => s.crowd),
            backgroundColor: stops.map(s => getBarColor(s.crowdLevel))
        }]
    };

    return <Bar data={data} />;
}

export default DemandChart;