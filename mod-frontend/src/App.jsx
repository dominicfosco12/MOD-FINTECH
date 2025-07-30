import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import { UserContext } from "./context/UserContext";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Tasks from "./pages/Tasks";
import Portfolio from "./pages/Portfolio";
import Orders from "./pages/Orders";
import Execution from "./pages/Execution";
import Risk from "./pages/Risk";
import "./styles/App.css";


export default function App() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <div style={{ display: "flex" }}>
      {!isLoginPage && user && <Sidebar />}

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/jobs"
            element={user ? <Jobs /> : <Navigate to="/" />}
          />
          <Route
            path="/tasks"
            element={user ? <Tasks /> : <Navigate to="/" />}
          />
          <Route
            path="/portfolio"
            element={user ? <Portfolio /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/" />}
          />
          <Route
            path="/execution"
            element={user ? <Execution /> : <Navigate to="/" />}
          />
          <Route
            path="/risk"
            element={user ? <Risk /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}
