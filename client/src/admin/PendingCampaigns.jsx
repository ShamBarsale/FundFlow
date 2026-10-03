import { useEffect, useState } from "react";
import API from "../services/api";

function PendingCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPending = async () => {
    try {
      const { data } = await API.get("/admin/campaigns/pending");
      setCampaigns(data);
    } catch (err) {
      setError("Could not load pending campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await API.put(`/admin/campaigns/${id}/${action}`);
      // Remove the reviewed campaign from the list
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (err) {
      setError("Action failed. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Pending Campaigns</h2>

      {error && <p className="error">{error}</p>}

      {campaigns.length === 0 ? (
        <p>No campaigns waiting for review.</p>
      ) : (
        <div className="card-grid">
          {campaigns.map((c) => (
            <div className="card" key={c._id}>
              <span className="card-category">{c.category}</span>
              <h3>{c.title}</h3>
              <p className="card-ngo">
                by {c.ngo?.name} ({c.ngo?.email})
              </p>
              <p className="card-desc">{c.description}</p>
              <p className="card-amount">Goal: ₹{c.goalAmount}</p>

              <div className="action-row">
                <button
                  className="btn approve-btn"
                  onClick={() => handleAction(c._id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="btn reject-btn"
                  onClick={() => handleAction(c._id, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingCampaigns;