import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NGODashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2>NGO Dashboard</h2>
      <p className="card-ngo">Welcome, {user?.name}</p>

      <div className="card-grid">
        <div className="card">
          <h3>Create Campaign</h3>
          <p className="card-desc">Start a new fundraising campaign.</p>
          <Link to="/ngo/create" className="btn card-btn">
            Create
          </Link>
        </div>

        <div className="card">
          <h3>My Campaigns</h3>
          <p className="card-desc">See your campaigns and their status.</p>
          <Link to="/ngo/campaigns" className="btn card-btn">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NGODashboard;