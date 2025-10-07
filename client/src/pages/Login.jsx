import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      location.reload();
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="auth-container fade-in">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      <p>Pas de compte? <a href="/register">S'inscrire</a></p>
    </div>
  );
}
