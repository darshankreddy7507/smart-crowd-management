import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import BusMonitoring from "./pages/BusMonitoring";
import StopMonitoring from "./pages/StopMonitoring";
import Alerts from "./pages/Alerts";
import Recommendations from "./pages/Recommendations";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5002/get-data");
        const result = await res.json();
        console.log(result);
        setData(result);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={
  <Layout>
    <Dashboard data={data} />
  </Layout>
} />
      <Route path="/bus-monitoring" element={<BusMonitoring />} />
      <Route path="/stop-monitoring" element={<StopMonitoring />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/recommendations" element={<Recommendations />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;