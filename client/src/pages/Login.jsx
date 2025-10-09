import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import { handleApiError, showErrorAlert, validateRequiredFields, validateEmail } from "../utils/errorHandler";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validation côté client
      validateRequiredFields([form.email, form.password], ["Email", "Mot de passe"]);
      validateEmail(form.email);

      setLoading(true);
      
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await handleApiError(res, "Erreur de connexion");
      
      localStorage.setItem("token", data.token);
      window.location.href = "/";
      
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email *" 
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          type="password" 
          placeholder="Mot de passe *" 
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
        />
        <button type="submit" className="primary" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
      <p className="auth-link">Pas de compte ? <a href="/register">S'inscrire</a></p>
    </div>
  );
}
