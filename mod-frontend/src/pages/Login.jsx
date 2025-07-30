import { useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext); // ✅ This will now be defined
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      setUser(data.user); // ✅ This works now
      window.location.href = "/dashboard"; // or use `useNavigate()` if using react-router
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
