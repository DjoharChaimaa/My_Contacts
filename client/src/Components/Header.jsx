import { useNavigate } from "react-router-dom";

export default function Header({ title, showAdd = false, onAdd, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    location.reload();
    if (onLogout) onLogout();
  };

  return (
    <header className="app-header">
      <h1>{title}</h1>
      <div className="header-actions">
        <button className="small delete" onClick={handleLogout}>Déconnexion</button>
      </div>
    </header>
  );
}
