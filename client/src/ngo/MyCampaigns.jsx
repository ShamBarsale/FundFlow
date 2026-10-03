import { useEffect, useState } from "react";
import API from "../services/api";

function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMine = async () => {
      try {
        const { data } = await API.get("/campaigns/my");
        setCampaigns(data);
      } catch (err) {
        setError("Could not load your campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchMine();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>My Campaigns</h2>

      {campaigns.length === 0 ? (
        <p>You have not created any campaigns yet.</p>
      ) : (
        <div className="card-grid">
          {campaigns.map((c) => (
            <div className="card" key={c._id}>
              <span className={`status status-${c.status}`}>{c.status}</span>
              <h3>{c.title}</h3>
              <p className="card-amount">
                ₹{c.collectedAmount} raised of ₹{c.goalAmount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCampaigns;