import React, { useEffect, useState } from "react";
import "./OrdersAdminPage.css";

interface Order {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  message?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

const OrdersAdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
      } else {
        console.error("Error al cargar órdenes:", res.status);
      }
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta orden?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:3000/api/v1/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setOrders(orders.filter(o => o.id !== orderId));
        alert("Orden eliminada correctamente");
      } else {
        alert("Error al eliminar la orden");
      }
    } catch (error) {
      console.error("Error eliminando la orden:", error);
      alert("Error al eliminar la orden");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:3000/api/v1/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        await fetchOrders(); // recargar lista
      } else {
        alert("Error al actualizar el estado");
      }
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  if (loading) {
    return (
      <div className="orders-admin-page">
        <p>Cargando órdenes...</p>
      </div>
    );
  }

  return (
    <div className="orders-admin-page">
      <div className="page-header">
        <h1>📑 Gestión de Órdenes</h1>
      </div>

      {orders.length === 0 ? (
        <p>No hay órdenes registradas</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Mensaje</th>
                <th>Estado</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.fullName}</td>
                  <td>{order.email}</td>
                  <td>{order.phone || "N/A"}</td>
                  <td className="order-message">{order.message || "-"}</td>
                  <td>
                    <select
                      value={order.status || ""}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="">Pendiente</option>
                      <option value="Procesando">Procesando</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Completado">Completado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(order.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersAdminPage;