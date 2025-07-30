// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { UserContext } from "../context/UserContext";
import logo from "/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Login failed");
    } else {
      setUser(data.user);
      navigate("/dashboard");
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100vh", backgroundColor: "#06012eff"
    }}>
      <img src={logo} alt="MOD Logo" style={{ width: "300px", marginBottom: "10px" }} />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", width: "250px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "250px" }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", backgroundColor: "#47A1FF", color: "#fff", border: "none" }}
      >
        Log In
      </button>
    </div>
  );
}
