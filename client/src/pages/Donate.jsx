import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function Donate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await API.get(`/campaigns/${id}`);
        setCampaign(data);
      } catch (err) {
        setError("Campaign not found");
      }
    };

    fetchCampaign();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/donations", {
        campaignId: id,
        amount: Number(amount),
        message,
      });

      setSuccess("Thank you! Your donation was successful.");

      setTimeout(() => {
        navigate(`/campaigns/${id}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Donation failed");
    }
  };

  if (!campaign && !error) return <p>Loading...</p>;

  return (
    <div className="form-box">
      <h2>Donate</h2>
      {campaign && <p className="card-ngo">to {campaign.title}</p>}

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
        />
        <button type="submit" className="btn">
          Donate
        </button>
      </form>
    </div>
  );
}

export default Donate;