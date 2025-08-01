import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Portfolios from "./pages/Portfolios";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";

function App() {
  const { user } = useContext(UserContext) || {};
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/portfolios"
            element={user ? <Portfolios /> : <Navigate to="/login" />}
          />
          <Route
            path="/accounts"
            element={user ? <Accounts /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
