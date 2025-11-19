import React, { useState } from 'react'
import axios from "axios"

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: ""});
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setMsg("")
    try {
      const res = await axios.post(`${API_URL}/auth`, form)
      setMsg(res.data.message);
      setForm({ name: "", email: "", password: ""})

    } catch (error) {
      console.error(error.message)
    }
    setLoading(false)
  }



  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name='name' placeholder='Name' value={form.name} onChange={handleChange} /><br />
        <input name='email' placeholder='Email' value={form.email} onChange={handleChange}/><br />
        <input name='password' placeholder='Password' type='password'  value={form.password} onChange={handleChange}/><br /> 

      <button type='submit' >
        {loading ? "Loading" : "Sign up"}
      </button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}

export default Register