import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  //fetch
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/item/`);
      setProducts(data);
    } catch (err) {
      console.log("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/item/${editId}`, form);
      } else {
        await axios.post(`${API_URL}/item/`, form);
      }
      setForm({ title: "", description: "" });
      setIsEdit(false);
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.log("Error submitting form", error);
    }

    setLoading(false);
  };
  //delete
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/item/${id}`);
      fetchProducts();
    } catch (err) {
      console.log("Error deleting", err);
    }
  };
  //edit 
  const editItem = (item) => {
    setForm({ title: item.title, description: item.description });
    setIsEdit(true);
    setEditId(item.id);
  };

  return (
    <div>
      <h2>{isEdit ? "Update Item" : "Create Item"}</h2>

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
          {isEdit ? "Update" : "Create"}
        </button>
      </form>

      <h2>Items</h2>
      <div>
        {products.map((product) => (
          <p key={product.id}>
            {product.title} --- {product.description}
            <button onClick={() => editItem(product)}>Edit</button>
            <button onClick={() => deleteItem(product.id)}>Delete</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
