import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      login(data);

      if (data.role === "ngo") {
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
      <h2>Create an account</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="donor">I am a Donor</option>
          <option value="ngo">I am an NGO</option>
        </select>
        <button type="submit" className="btn">
          Register
        </button>
      </form>

      <p className="form-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;