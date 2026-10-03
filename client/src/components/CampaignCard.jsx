import { Link } from "react-router-dom";

function CampaignCard({ campaign }) {
  const percent = Math.min(
    Math.round((campaign.collectedAmount / campaign.goalAmount) * 100),
    100
  );

  return (
    <div className="card">
      <span className="card-category">{campaign.category}</span>
      <h3>{campaign.title}</h3>
      <p className="card-ngo">by {campaign.ngo?.name}</p>
      <p className="card-desc">
        {campaign.description.length > 90
          ? campaign.description.slice(0, 90) + "..."
          : campaign.description}
      </p>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="card-amount">
        ₹{campaign.collectedAmount} raised of ₹{campaign.goalAmount} ({percent}
        %)
      </p>

      <Link to={`/campaigns/${campaign._id}`} className="btn card-btn">
        View Details
      </Link>
    </div>
  );
}

export default CampaignCard;