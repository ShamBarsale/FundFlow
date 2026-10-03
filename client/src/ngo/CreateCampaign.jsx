import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("education");
  const [goalAmount, setGoalAmount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/campaigns", {
        title,
        description,
        category,
        goalAmount: Number(goalAmount),
        imageUrl,
        endDate,
      });

      setSuccess("Campaign submitted. It will appear after admin approval.");

      setTimeout(() => {
        navigate("/ngo/campaigns");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create campaign");
    }
  };

  return (
    <div className="form-box">
      <h2>Create Campaign</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="environment">Environment</option>
          <option value="food">Food</option>
          <option value="disaster">Disaster</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Goal amount (₹)"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          min="1"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Submit Campaign
        </button>
      </form>
    </div>
  );
}

export default CreateCampaign;