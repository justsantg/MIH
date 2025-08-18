import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <header className="navbar">
      <h1 className="navbar-title">Panel de Administración</h1>
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Cerrar sesión
      </button>
    </header>
  );
};

export default Navbar;
