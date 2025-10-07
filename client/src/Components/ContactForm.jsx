import { useState } from "react";
import { API_URL } from "../App";

export default function ContactForm({ onAdded }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/contacts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ firstName: "", lastName: "", phone: "" });
      onAdded();
    } else {
      alert("Error adding contact");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Prénon" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
      <input placeholder="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
      <input placeholder="Numéro de téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <button type="submit">Ajouter</button>
    </form>
  );
}
