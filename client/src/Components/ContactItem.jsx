import { useState } from "react";
import { API_URL } from "../App";
import { handleApiError, showErrorAlert, showSuccessAlert, confirmAction, validateRequiredFields, validatePhone } from "../utils/errorHandler";

export default function ContactItem({ contact, onUpdated, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(contact);
  const [loading, setLoading] = useState(false);

  const saveEdit = async () => {
    try {
      // Validation côté client
      validateRequiredFields(
        [form.firstName, form.lastName, form.phone],
        ["Prénom", "Nom", "Téléphone"]
      );
      validatePhone(form.phone);

      setLoading(true);
      
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

      await handleApiError(res, "Erreur lors de la modification");
      
      setIsEditing(false);
      showSuccessAlert("Contact modifié avec succès");
      onUpdated();
      
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirmAction("Êtes-vous sûr de vouloir supprimer ce contact ?");
    if (!confirmed) return;

    try {
      await onDeleted(contact._id);
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input 
              value={form.firstName} 
              onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
            />
          </td>
          <td>
            <input 
              value={form.lastName} 
              onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
            />
          </td>
          <td>
            <input 
              value={form.phone} 
              onChange={(e) => setForm({ ...form, phone: e.target.value })} 
            />
          </td>
          <td>
            <div className="btn-group">
              <button onClick={saveEdit} className="small modify" disabled={loading}>
                {loading ? "..." : "💾 Enregistrer"}
              </button>
              <button onClick={() => setIsEditing(false)} className="small delete">
                Annuler
              </button>
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
              <button onClick={() => setIsEditing(true)} className="small modify">
                Modifier
              </button>
              <button onClick={handleDelete} className="small delete">
                Supprimer
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}