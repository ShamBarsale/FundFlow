import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        FundFlow
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/campaigns">Campaigns</Link>
        
{user && user.role === "donor" && (
  <Link to="/my-donations">My Donations</Link>
)}

        {user && user.role === "ngo" && (
          <Link to="/ngo/dashboard">NGO Dashboard</Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        )}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && <span className="nav-user">Hi, {user.name}</span>}
        {user && (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;