// import { Link } from "react-router-dom";

// function Sidebar() {
//     return (
//         <div className="sidebar">
//             <h2 class="side-bar-head">Smart Bus</h2>

//             <ul>
//                 <li><Link to="/dashboard">Dashboard</Link></li>
//                 <li><Link to="/bus-monitoring">Bus Monitoring</Link></li>
//                 <li><Link to="/stop-monitoring">Stop Monitoring</Link></li>
//                 <li><Link to="/alerts">Alerts</Link></li>
//                 <li><Link to="/recommendations">Recommendations</Link></li>
//             </ul>
//         </div>
//     );
// }

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const handleDashboardClick = (e) => {
    if (location.pathname === "/dashboard") {
      e.preventDefault();       // stop SPA navigation
      window.location.reload();  // force refresh
    }
  };

  return (
    <div className="sidebar">
      <h2 className="side-bar-head">Smart Bus</h2>

      <ul>
        <li>
          <Link to="/dashboard" onClick={handleDashboardClick}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/bus-monitoring">Bus Monitoring</Link>
        </li>
        <li>
          <Link to="/stop-monitoring">Stop Monitoring</Link>
        </li>
        <li>
          <Link to="/alerts">Alerts</Link>
        </li>
        <li>
          <Link to="/recommendations">Recommendations</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;