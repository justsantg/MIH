import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: "/admin/dashboard", label: "📊 Dashboard" },
    { path: "/admin/products", label: "📦 Productos" },
    { path: "/admin/categories", label: "🗂️ Categorías" },
    { path: "/admin/users", label: "👤 Usuarios" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${
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

export default Sidebar;
