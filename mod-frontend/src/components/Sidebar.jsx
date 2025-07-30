import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaTasks,
  FaCogs,
  FaBriefcase,
  FaSignOutAlt,
  FaUser,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { UserContext } from "../context/UserContext";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = useState({
    overview: false,
    management: false,
  });
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSessionTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">MOD</div>

      <div className="section">
        <div className="section-header" onClick={() => toggleSection("overview")}>
          <span>MOD Overview</span>
          {expanded.overview ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        {expanded.overview && (
          <ul>
            <li>
              <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
                <FaChartBar className="icon" /> MOD Dash
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <FaTasks className="icon" /> MOD Jobs
              </Link>
            </li>
            <li>
              <Link to="/tasks">
                <FaTasks className="icon" /> MOD Tasks
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="section">
        <div className="section-header" onClick={() => toggleSection("management")}>
          <span>MOD Management</span>
          {expanded.management ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        {expanded.management && (
          <ul>
            <li>
              <Link to="/portfolio">
                <FaBriefcase className="icon" /> Portfolio Management
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <FaBriefcase className="icon" /> Order Management
              </Link>
            </li>
            <li>
              <Link to="/execution">
                <FaBriefcase className="icon" /> Execution Management
              </Link>
            </li>
            <li>
              <Link to="/risk">
                <FaBriefcase className="icon" /> Risk Management
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <FaUser className="icon" />
          <span>{user?.email}</span>
        </div>
        <div className="session-timer">Session: {formatTime(sessionTime)}</div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
