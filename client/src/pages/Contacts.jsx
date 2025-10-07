import { useEffect, useState } from "react";
import { API_URL } from "../App";
import ContactForm from "../Components/ContactForm";
import ContactItem from "../Components/ContactItem";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setContacts(data);
    }
  };

  const deleteContact = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/contacts/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContacts();
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
  <div className="fade-in">
    <div className="contacts-header">
      <div className="search-container">
        <input 
          placeholder="🔍 Rechercher par numéro, nom ou prénom..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
      <div className="actions-container">
        <button 
          className={showForm ? "secondary" : "primary"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✖ Fermer" : " Ajouter un contact"}
        </button>
      </div>
    </div>

    {showForm && <ContactForm onAdded={fetchContacts} />}

    {filtered.length === 0 ? (
      <div className="empty-state">
        <div>📋</div>
        <p>Aucun contact trouvé</p>
      </div>
    ) : (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Prémon</th>
            <th>Nom</th>
            <th>Numéro de téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <ContactItem
              key={c._id}
              contact={c}
              onUpdated={fetchContacts}
              onDeleted={deleteContact}
            />
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}
