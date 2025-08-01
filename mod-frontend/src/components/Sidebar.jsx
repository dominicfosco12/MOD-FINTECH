import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, NavLink } from "react-router-dom";
import { FaTachometerAlt, FaSignOutAlt, FaBriefcase, FaChartLine, FaLayerGroup } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

function Sidebar() {
  const { user, setUser } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-dark text-white vh-100 p-3 d-flex flex-column" style={{ width: "250px" }}>
      <div>
        <h5 className="mb-4">MOD</h5>

        <div>
          <h6 className="text-uppercase text-muted small">MOD Overview</h6>
          <NavLink to="/dashboard" className="d-block text-white text-decoration-none mb-2" activeclassname="fw-bold">
            <FaTachometerAlt className="me-2" />
            Dashboard
          </NavLink>
        </div>

        <div className="mt-4">
          <h6 className="text-uppercase text-muted small">MOD Management</h6>
          <NavLink to="/portfolios" className="d-block text-white text-decoration-none mb-2" activeclassname="fw-bold">
            <FaLayerGroup className="me-2" />
            Portfolio Management
          </NavLink>
          <NavLink to="/orders" className="d-block text-white text-decoration-none mb-2" activeclassname="fw-bold">
            <FaBriefcase className="me-2" />
            Order Management
          </NavLink>
          <NavLink to="/risk" className="d-block text-white text-decoration-none" activeclassname="fw-bold">
            <FaChartLine className="me-2" />
            Risk Management
          </NavLink>
        </div>
      </div>

      <div className="mt-auto">
        {user && (
          <div className="mb-2 small text-truncate text-light" title={user.email}>
            {user.email}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="btn btn-outline-light btn-sm w-100 d-flex align-items-center justify-content-center"
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
