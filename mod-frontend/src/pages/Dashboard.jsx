// mod-frontend/src/pages/Dashboard.jsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {user?.email}!</h1>
    </div>
  );
}
