import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Cambiado para consistencia con AdminLayout
    navigate("/admin/login");
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-content">
        <h1 className="admin-navbar-title">Panel de Administración</h1>
        <div className="admin-navbar-actions">
          <div className="admin-user-info">
            <span className="admin-user-greeting">Hola, Admin</span>
            <span className="admin-user-role">Administrador</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span className="admin-logout-icon">🚪</span>
            <span className="admin-logout-text">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;