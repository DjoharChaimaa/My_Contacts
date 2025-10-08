import { useEffect, useState } from "react";
import { API_URL } from "../App";
import ContactForm from "../Components/ContactForm";
import ContactItem from "../Components/ContactItem";
import { handleApiError, showErrorAlert } from "../utils/errorHandler";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await handleApiError(res, "Erreur lors du chargement des contacts");
      setContacts(data.data || data);
      
    } catch (error) {
      showErrorAlert(error.message);
      // Si erreur d'authentification, rediriger vers login
      if (error.message.includes("Session expirée") || error.message.includes("Token")) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/contacts/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      await handleApiError(res, "Erreur lors de la suppression");
      fetchContacts(); // Recharger la liste
      
    } catch (error) {
      showErrorAlert(error.message);
      throw error; // Propager l'erreur pour ContactItem
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = contacts.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div>
      <div className="contacts-header">
        <div className="search-container">
          <input 
            placeholder="Rechercher par numéro, nom ou prénom" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className="actions-container">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className={showForm ? "secondary" : "primary"}
          >
            {showForm ? "✖ Fermer" : "➕ Ajouter un contact"}
          </button>
        </div>
      </div>

      {showForm && <ContactForm onAdded={fetchContacts} />}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Numéro de téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {contacts.length === 0 ? "Aucun contact trouvé" : "Aucun résultat pour votre recherche"}
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <ContactItem
                  key={c._id}
                  contact={c}
                  onUpdated={fetchContacts}
                  onDeleted={deleteContact}
                />
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}