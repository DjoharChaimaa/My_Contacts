import { useState } from "react";
import { API_URL } from "../App";

export default function ContactItem({ contact, onUpdated, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(contact);

  const saveEdit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/contacts/update/${contact._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      }),
    });

    if (res.ok) {
      setIsEditing(false);
      onUpdated();
    } else {
      alert("Failed to update contact");
    }
  };

  return (
    <tr>
    {isEditing ? (
        <>
        <td>{/* input */}<input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></td>
        <td>{/* input */}<input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></td>
        <td>{/* input */}<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></td>
        <td>
            <div className="btn-group">
            <button onClick={saveEdit} className="small modify">Enregistrer</button>
            <button onClick={() => setIsEditing(false)} className="small delete">Annuler</button>
            </div>
        </td>
        </>
    ) : (
        <>
        <td>{contact.firstName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.phone}</td>
        <td>
            <div className="btn-group">
            <button onClick={() => setIsEditing(true)} className="small modify">Modifier</button>
            <button onClick={() => onDeleted(contact._id)} className="small delete">Supprimer</button>
            </div>
        </td>
        </>
    )}
    </tr>

  );
}
