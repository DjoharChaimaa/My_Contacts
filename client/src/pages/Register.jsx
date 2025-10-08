import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import { 
  handleApiError, 
  showErrorAlert, 
  showSuccessAlert,
  validateRequiredFields,
  validateEmail,
  validatePhone 
} from "../utils/errorHandler";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validation côté client
      validateRequiredFields(
        [form.firstName, form.lastName, form.phone, form.email, form.password],
        ["Prénom", "Nom", "Téléphone", "Email", "Mot de passe"]
      );
      
      validateEmail(form.email);
      validatePhone(form.phone);
      
      if (form.password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères");
      }

      setLoading(true);
      
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      await handleApiError(res, "Erreur lors de l'inscription");
      
      showSuccessAlert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
      navigate("/login");
      
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Prénom *" 
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
        />
        <input 
          placeholder="Nom *" 
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
        />
        <input 
          placeholder="Téléphone *" 
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} 
        />
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
        <button type="submit" disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
      <p className="auth-link">Déjà un compte ? <a href="/login">Se connecter</a></p>
    </div>
  );
}
