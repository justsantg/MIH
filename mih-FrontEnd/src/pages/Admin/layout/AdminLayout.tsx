import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import Navbar from "../components/Navbar"; // Importa el navbar propio del admin

// Sidebar component
const Sidebar: React.FC = () => (
  <aside className="admin-sidebar">
    <h2 className="sidebar-title">Admin Panel</h2>
    <nav className="sidebar-nav">
      <Link to="/admin/dashboard" className="sidebar-link">
        📊 Dashboard
      </Link>
      <Link to="/admin/products" className="sidebar-link">
        📦 Productos
      </Link>
      <Link to="/admin/categories" className="sidebar-link">
        🗂️ Categorías
      </Link>
      <Link to="/admin/users" className="sidebar-link">
        👤 Usuarios
      </Link>
    </nav>
  </aside>
);

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


