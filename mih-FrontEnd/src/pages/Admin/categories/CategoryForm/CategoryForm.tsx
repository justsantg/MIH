import React, { useState, useEffect } from "react";
import "./CategoryForm.css";

// Definimos el tipo Category (igual que en CategoriesAdminPage)
export interface Category {
  id?: string;
  name: string;
  description?: string;
}

interface CategoryFormProps {
  initialData?: Category | null;
  onSave: (data: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Descripción:
        <input
          type="text"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
        />
      </label>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Actualizar" : "Crear"}
        </button>
        <button type="button" className="btn btn-delete" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
