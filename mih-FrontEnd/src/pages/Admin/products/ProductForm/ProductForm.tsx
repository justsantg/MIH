import React, { useState, useEffect } from "react";
import "./ProductForm.css"

interface Category {
  id: string;
  name: string;
  description: string;
}

interface ProductFormData {
  name: string;
  description: string;
  unitPrice: string;
  wholesalePrice: string;
  stock: string;
  imageUrl: string;
  categoryId: string;
}

interface ProductsFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductFormData) => void;
  initialData?: ProductFormData | null;
  categories: Category[];
  title: string;
}

const ProductsForm: React.FC<ProductsFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
  title
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    unitPrice: "",
    wholesalePrice: "",
    stock: "",
    imageUrl: "",
    categoryId: ""
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  // Cargar datos iniciales cuando el modal se abre o initialData cambia
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        description: "",
        unitPrice: "",
        wholesalePrice: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.unitPrice.trim()) newErrors.unitPrice = "El precio unitario es requerido";
    if (!formData.stock.trim()) newErrors.stock = "El stock es requerido";
    if (!formData.categoryId) newErrors.categoryId = "La categoría es requerida";

    if (formData.unitPrice && parseFloat(formData.unitPrice) <= 0) {
      newErrors.unitPrice = "El precio debe ser mayor a 0";
    }

    if (formData.stock && parseInt(formData.stock) < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      unitPrice: "",
      wholesalePrice: "",
      stock: "",
      imageUrl: "",
      categoryId: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Nombre del Producto *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="unitPrice">Precio Unitario *</label>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={errors.unitPrice ? "error" : ""}
              />
              {errors.unitPrice && <span className="error-message">{errors.unitPrice}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="wholesalePrice">Precio Mayorista</label>
              <input
                type="number"
                id="wholesalePrice"
                name="wholesalePrice"
                value={formData.wholesalePrice}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stock">Stock *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={errors.stock ? "error" : ""}
              />
              {errors.stock && <span className="error-message">{errors.stock}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="categoryId">Categoría *</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={errors.categoryId ? "error" : ""}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL de la Imagen</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.imageUrl && (
              <div className="image-preview">
                <img src={formData.imageUrl} alt="Vista previa" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }} />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="btn btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn btn-submit">
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsForm;