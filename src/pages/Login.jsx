import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "350px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}


export default Login;