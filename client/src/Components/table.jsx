import ContactItem from "./ContactItem";

export default function Table({ contacts, onUpdated, onDeleted }) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>No contacts found.</td>
          </tr>
        ) : (
          contacts.map((contact) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              onUpdated={onUpdated}
              onDeleted={onDeleted}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
