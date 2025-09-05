import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: "/admin/dashboard", label: "📊 Dashboard" },
    { path: "/admin/products", label: "📦 Productos" },
    { path: "/admin/categories", label: "🗂️ Categorías" },
    { path: "/admin/users", label: "👤 Usuarios" },
    { path: "/admin/orders", label: "📋 Ordenes" },
  ];

  return (
    <aside className="admin-sidebar-component">
      <h2 className="admin-sidebar-title">⚙️ Admin Panel</h2>
      <nav className="admin-sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`admin-sidebar-link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;