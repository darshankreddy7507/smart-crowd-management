import { useEffect, useState } from "react";
import BusCard from "../components/BusCard";
import CrowdCard from "../components/CrowdCard";
import AlertPanel from "../components/AlertPanel";
import Recommendation from "../components/Recommendation";
import DemandChart from "../components/DemandChart";
import SystemOverview from "../components/SystemOverview";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/data");
        const result = await res.json();

        console.log("LIVE DATA:", result);
        setData(result);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>

      {/* ===== HEADER ===== */}
      <h1>Smart Bus Management Dashboard</h1>

      {/* ===== NEW KPI CARDS (ADDED) ===== */}
      <div className="cards-container">

        <div className="card-content1">
          <div className="card-title">Total Buses</div>
          <div className="card-value">{data.bus ? 1 : 0}</div>
        </div>

        <div className="card-content2">
          <div className="card-title">Crowded Stops</div>
          <div className="card-value">{data.stop ? 1 : 0}</div>
        </div>

        <div className="card-content3">
          <div className="card-title">Crowded Buses</div>
          <div className="card-value">
            {data.bus?.passengerCount > 30 ? 1 : 0}
          </div>
        </div>

        <div className="card-content4">
          <div className="card-title">Active Cameras</div>
          <div className="card-value">1</div>
        </div>

      </div>

      {/* ===== SYSTEM OVERVIEW ===== */}
      <SystemOverview
        buses={[data.bus]}
        stops={[data.stop]}
        cameras={[1]}
      />

      {/* ===== LIVE BUS DATA ===== */}
      <div style={{
        background: "#e6f7ff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
      }}>
        <h2>Live Bus Data 🚌</h2>
        <h3>Passengers: {data.bus?.passengerCount || 0}</h3>
        <h3>Location: {data.bus?.location || "Loading..."}</h3>
        <h3>Bus Number: {data.bus?.busNumber || "--"}</h3>
      </div>

      {/* ===== BUS STATUS ===== */}
      <h2>Bus Status</h2>
      <div className="cards-container">
        {data.bus && <BusCard bus={data.bus} />}
      </div>

      {/* ===== BUS STOP DATA ===== */}
      <h2>Bus Stop Crowd</h2>
      {data.stop && <CrowdCard stop={data.stop} />}

      {/* ===== ALERT ===== */}
      <AlertPanel stops={data.stop ? [data.stop] : []} />

      {/* ===== RECOMMENDATION ===== */}
      <Recommendation stops={data.stop ? [data.stop] : []} />

      {/* ===== CHART ===== */}
      <h2>Demand Chart</h2>
      <DemandChart stops={data.stop ? [data.stop] : []} />

    </div>
  );
}

export default Dashboard;