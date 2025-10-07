import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container fade-in">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="First Name" onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Last Name" onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">S'inscrire</button>
        <p>Déjà inscrit? <a href="/login">Se connecter</a></p>
      </form>
    </div>
  );
}
