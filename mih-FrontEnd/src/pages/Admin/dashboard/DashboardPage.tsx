import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./DashboardPage.css";

interface Stats {
  products: number;
  categories: number;
  users: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    categories: 0,
    users: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const [productsRes, categoriesRes, usersRes] = await Promise.all([
        fetch("http://localhost:3000/api/v1/products", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/api/v1/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/api/v1/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const usersData = await usersRes.json();

      setStats({
        products: productsData.data?.length || 0,
        categories: categoriesData.data?.length || 0,
        users: usersData.data?.length || 0,
      });
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <div className="admin-content">
          <h1>📊 Dashboard del Administrador</h1>

          <div className="stats-grid">
            <div className="stat-card products">
              <h2>{stats.products}</h2>
              <p>Productos</p>
            </div>
            <div className="stat-card categories">
              <h2>{stats.categories}</h2>
              <p>Categorías</p>
            </div>
            <div className="stat-card users">
              <h2>{stats.users}</h2>
              <p>Usuarios</p>
            </div>
          </div>

          <div className="quick-links">
            <h2>Accesos Rápidos</h2>
            <div className="links-grid">
              <a href="/admin/products" className="quick-link">📦 Gestionar Productos</a>
              <a href="/admin/categories" className="quick-link">📂 Gestionar Categorías</a>
              <a href="/admin/users" className="quick-link">👤 Gestionar Usuarios</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
