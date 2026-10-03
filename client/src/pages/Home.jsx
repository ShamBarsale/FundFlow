import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import CampaignCard from "../components/CampaignCard";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await API.get("/campaigns");
        setCampaigns(data.slice(0, 3));
      } catch (err) {
        console.log("Could not load campaigns");
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <div className="hero">
        <h1>Give. Support. Change lives.</h1>
        <p>
          FundFlow connects NGOs with donors. Browse verified campaigns and
          donate to causes you care about.
        </p>

        <div className="hero-buttons">
          <Link to="/campaigns" className="btn hero-btn">
            Browse Campaigns
          </Link>
          {!user && (
            <Link to="/register" className="btn hero-btn hero-btn-light">
              Join Now
            </Link>
          )}
        </div>
      </div>

      <h2>Latest Campaigns</h2>

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

export default Home;