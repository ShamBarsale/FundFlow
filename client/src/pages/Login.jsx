import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", { email, password });

      login(data);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.role === "ngo") {
        navigate("/ngo/dashboard");
      } else {
        navigate("/campaigns");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>

      <p className="form-link">
        New here? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;