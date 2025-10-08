import { useState } from "react";
import { API_URL } from "../App";
import { handleApiError, showErrorAlert, showSuccessAlert, validateRequiredFields, validatePhone } from "../utils/errorHandler";

export default function ContactForm({ onAdded }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validation côté client
      validateRequiredFields(
        [form.firstName, form.lastName, form.phone],
        ["Prénom", "Nom", "Téléphone"]
      );
      validatePhone(form.phone);

      setLoading(true);
      
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/contacts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      await handleApiError(res, "Erreur lors de l'ajout du contact");
      
      setForm({ firstName: "", lastName: "", phone: "" });
      showSuccessAlert("Contact ajouté avec succès");
      onAdded();
      
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        placeholder="Numéro de téléphone *" 
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
      />
      <button type="submit" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter le contact"}
      </button>
    </form>
  );
}