import StopCard from "../components/StopCard";
import { stops } from "../data/mockData";

function StopMonitoring() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Stop Monitoring</h1>
      <p>Live crowd status of all bus stops</p>

      <div className="cards-container">
        {stops.map((stop, i) => (
          <StopCard key={stop.id ?? stop.name ?? i} stop={stop} />
        ))}
      </div>
    </div>
  );
}

export default StopMonitoring;