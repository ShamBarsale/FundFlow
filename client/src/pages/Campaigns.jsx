import { useEffect, useState } from "react";
import API from "../services/api";
import CampaignCard from "../components/CampaignCard";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await API.get("/campaigns");
        setCampaigns(data);
      } catch (err) {
        setError("Could not load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Campaigns</h2>

      {campaigns.length === 0 ? (
        <p>No approved campaigns yet.</p>
      ) : (
        <div className="card-grid">
          {campaigns.map((c) => (
            <CampaignCard key={c._id} campaign={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Campaigns;