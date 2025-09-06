import React, { useEffect, useState } from "react";
import "./CategoriesAdminPage.css";
import CategoryForm from "./CategoryForm/CategoryForm";

interface Category {
  id: string;
  name: string;
  description?: string;
}

const CategoriesAdminPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/v1/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCategories(data.data || []);
      } else {
        console.error("Error fetching categories:", res.status);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (categoryData: Omit<Category, "id">) => {
    try {
      const token = localStorage.getItem("accessToken");
      const method = editingCategory ? "PATCH" : "POST";
      const url = editingCategory
        ? `http://localhost:3000/api/v1/categories/${editingCategory.id}`
        : "http://localhost:3000/api/v1/categories";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      if (res.ok) {
        await fetchCategories();
        setShowForm(false);
        setEditingCategory(null);
        alert(editingCategory ? "Categoría actualizada" : "Categoría creada");
      } else {
        const errData = await res.json();
        console.error("Error al guardar categoría:", errData);
        alert(errData.message || "Error al guardar categoría");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta categoría?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchCategories();
        alert("Categoría eliminada");
      } else {
        console.error("Error deleting category:", res.status);
        alert("Error al eliminar categoría");
      }
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  if (loading) {
    return (
      <div className="categories-admin-page">
        <p>Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="categories-admin-page">
      <div className="page-header">
        <h1>📂 Gestión de Categorías</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="btn btn-primary"
        >
          ➕ Nueva Categoría
        </button>
      </div>

      {showForm && (
        <CategoryForm
          initialData={editingCategory || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}

      {categories.length === 0 ? (
        <p>No hay categorías disponibles</p>
      ) : (
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.description || "Sin descripción"}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => {
                        setEditingCategory(cat);
                        setShowForm(true);
                      }}
                      className="btn btn-edit"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="btn btn-delete"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriesAdminPage;