// src/components/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const [openSections, setOpenSections] = useState({
    overview: true,
    management: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const linkStyle = {
    display: "block",
    padding: "6px 12px",
    textDecoration: "none",
    color: "#fff",
    fontSize: "14px",
    backgroundColor: "#0B1537",
    borderRadius: "4px",
    marginBottom: "4px",
  };

  const activeLink = {
    ...linkStyle,
    backgroundColor: "#47A1FF",
    fontWeight: "bold",
  };

  return (
    <div style={{
      width: "240px",
      backgroundColor: "#06102A",
      color: "#fff",
      padding: "20px",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ color: "#47A1FF", fontSize: "22px", marginBottom: "20px" }}>MOD</h2>

      {/* MOD Overview */}
      <div>
        <div
          style={{ cursor: "pointer", marginBottom: "8px", fontWeight: "bold" }}
          onClick={() => toggleSection("overview")}
        >
          MOD Overview {openSections.overview ? "▾" : "▸"}
        </div>
        {openSections.overview && (
          <div style={{ marginLeft: "10px", marginBottom: "16px" }}>
            <Link to="/dashboard" style={location.pathname === "/dashboard" ? activeLink : linkStyle}>MOD Dash</Link>
            <Link to="/jobs" style={location.pathname === "/jobs" ? activeLink : linkStyle}>MOD Jobs</Link>
            <Link to="/tasks" style={location.pathname === "/tasks" ? activeLink : linkStyle}>MOD Tasks</Link>
          </div>
        )}
      </div>

      {/* MOD Management */}
      <div>
        <div
          style={{ cursor: "pointer", marginBottom: "8px", fontWeight: "bold" }}
          onClick={() => toggleSection("management")}
        >
          MOD Management {openSections.management ? "▾" : "▸"}
        </div>
        {openSections.management && (
          <div style={{ marginLeft: "10px" }}>
            <Link to="/portfolio" style={location.pathname === "/portfolio" ? activeLink : linkStyle}>Portfolio Management</Link>
            <Link to="/orders" style={location.pathname === "/orders" ? activeLink : linkStyle}>Order Management</Link>
            <Link to="/execution" style={location.pathname === "/execution" ? activeLink : linkStyle}>Execution Management</Link>
            <Link to="/risk" style={location.pathname === "/risk" ? activeLink : linkStyle}>Risk Management</Link>
          </div>
        )}
      </div>
    </div>
  );
}
