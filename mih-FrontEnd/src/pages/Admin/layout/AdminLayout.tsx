import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">⚙️ Admin Panel</h2>
      <nav className="sidebar-nav">
        <Link 
          to="/admin/dashboard" 
          className={`sidebar-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/admin/products" 
          className={`sidebar-link ${location.pathname === '/admin/products' ? 'active' : ''}`}
        >
          📦 Productos
        </Link>
        <Link 
          to="/admin/categories" 
          className={`sidebar-link ${location.pathname === '/admin/categories' ? 'active' : ''}`}
        >
          🗂️ Categorías
        </Link>
        <Link 
          to="/admin/users" 
          className={`sidebar-link ${location.pathname === '/admin/users' ? 'active' : ''}`}
        >
          👤 Usuarios
        </Link>
        <Link 
          to="/admin/orders" 
          className={`sidebar-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}
        >
          📋 Ordenes
        </Link>
      </nav>
    </aside>
  );
};

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-panel-layout">
      <Sidebar />
      <div className="admin-main-content">
        <header className="admin-topbar">
          <h1 className="topbar-title">Panel de Administración</h1>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </header>
        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;