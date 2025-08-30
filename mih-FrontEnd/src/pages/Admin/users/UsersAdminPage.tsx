import React, { useEffect, useState } from "react";
import "./UsersAdminPage.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserForm from "./UserForm/UserForm";


interface User {
  id: number;
  email: string;
  provider: string;
  socialId?: string | null;
  firstName: string;
  lastName: string;
  role: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}


const UsersAdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data.data || []);
      } else {
        console.error("Error fetching users:", res.status);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setIsModalOpen(true);
  };

  const handleSubmitUser = async (formData: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "Admin", // 👈 asignamos rol Admin
      }),
    });

    if (res.ok) {
      alert("Administrador creado correctamente");
      fetchUsers(); // refrescar lista
    } else {
      alert("Error al crear administrador");
    }
  } catch (error) {
    console.error("Error creando usuario:", error);
  }
};

  const handleDeleteUser = async (userId: number) => {
  if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
        alert("Usuario eliminado correctamente");
      } else {
        alert("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("Error al eliminar el usuario");
    }
  }
};


  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Navbar />
          <div className="admin-content">
            <p>Cargando usuarios...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <div className="admin-content">
          <div className="page-header">
            <h1>👤 Gestión de Administradores</h1>
            <button onClick={handleCreateUser} className="btn btn-primary">
              ➕ Nuevo Administrador
            </button>
          </div>

          {users.length === 0 ? (
            <p>No hay administradores registrados</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Creado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.firstName} {u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{u.role?.name}</td>
                    <td>{u.status?.name}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="btn btn-delete"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Modal con el formulario */}
          <UserForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersAdminPage;
