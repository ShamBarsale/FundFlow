import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p className="card-ngo">Welcome, {user?.name}</p>

      <div className="card-grid">
        <div className="card">
          <h3>Pending Campaigns</h3>
          <p className="card-desc">Review and approve or reject campaigns.</p>
          <Link to="/admin/pending" className="btn card-btn">
            Review
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;