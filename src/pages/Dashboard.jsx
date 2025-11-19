import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        setMsg("Session expired. Please login again.", err);
        setTimeout(() => navigate("/login"), 1000);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Dashboard</h2>

      {!user && !msg && <p>Loading...</p>}
      {msg && <p>{msg}</p>}

      {user && (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
