import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function CampaignDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await API.get(`/campaigns/${id}`);
        setCampaign(data);
      } catch (err) {
        setError("Campaign not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const percent = Math.min(
    Math.round((campaign.collectedAmount / campaign.goalAmount) * 100),
    100
  );

  return (
    <div className="details">
      <span className="card-category">{campaign.category}</span>
      <h2>{campaign.title}</h2>
      <p className="card-ngo">by {campaign.ngo?.name}</p>

      <p className="details-desc">{campaign.description}</p>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="card-amount">
        ₹{campaign.collectedAmount} raised of ₹{campaign.goalAmount} ({percent}
        %)
      </p>
      <p className="card-ngo">
        Ends on: {new Date(campaign.endDate).toLocaleDateString()}
      </p>

      {!user && (
        <p>
          Please <Link to="/login">login</Link> as a donor to donate.
        </p>
      )}

      {user && user.role === "donor" && (
        <Link to={`/donate/${campaign._id}`} className="btn card-btn">
          Donate Now
        </Link>
      )}

      {user && user.role !== "donor" && (
        <p className="card-ngo">Only donors can donate.</p>
      )}
    </div>
  );
}

export default CampaignDetails;