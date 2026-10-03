import { useEffect, useState } from "react";
import API from "../services/api";

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await API.get("/donations/my");
        setDonations(data);
      } catch (err) {
        setError("Could not load your donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>My Donations</h2>

      {donations.length === 0 ? (
        <p>You have not made any donations yet.</p>
      ) : (
        <div className="card-grid">
          {donations.map((d) => (
            <div className="card" key={d._id}>
              <h3>{d.campaign?.title}</h3>
              <p className="card-amount">Donated: ₹{d.amount}</p>
              {d.message && <p className="card-desc">"{d.message}"</p>}
              <p className="card-ngo">
                {new Date(d.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonations;