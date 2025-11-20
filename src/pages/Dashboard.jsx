import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [isEdit, setIsEdit] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API_URL}/item/`);
    const products = data;
    setProducts(products);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/item/`, form);
      setForm(res.data);
    } catch (error) {
      console.log("error submiting form", error);
    }
    setLoading(false);
  };

  const deleteItem = (e) => {
    const newProduct = products.filter((item) => item.index !== 1);
    setForm(newProduct);
  };

  return (
    <div>
      <h2>create Items</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="enter title"
          value={form.title}
          onChange={handleChange}
        />
        <br />
        <input
          name="description"
          placeholder="enter description"
          value={form.description}
          onChange={handleChange}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Update" : "create"}
        </button>
      </form>

      <h2>Items</h2>

      <div>
        {products.map((product) => (
          <p key={product.id}>
            {product.title} {product.description}
            <button>{isEdit ? "Update" : "create"}</button>{" "}
            <button handleDelete={product.deleteItem}>Delete</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
