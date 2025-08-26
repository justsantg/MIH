import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsAdminPage.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductsForm from "./ProductForm/ProductForm";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  unitPrice: number;
  wholesalePrice?: number;
  stock: number;
  imageUrl?: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
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

const ProductsAdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/v1/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || []);
      } else {
        console.error("Error fetching products:", res.status);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

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
      setCategoriesLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmitProduct = async (formData: ProductFormData) => {
    try {
      const token = localStorage.getItem("accessToken");
      const isEditing = !!editingProduct;

      // DEBUG: Verificar los datos del formulario
      console.log("Datos del formulario:", formData);
      console.log("CategoryId recibido:", formData.categoryId);
      console.log("Tipo de categoryId:", typeof formData.categoryId);

      // Verificar que categoryId tenga un valor válido (UUID)
      if (!formData.categoryId || formData.categoryId === "" || formData.categoryId === "null" || formData.categoryId === "undefined") {
        alert("Por favor selecciona una categoría válida");
        return;
      }

      // Verificar que el categoryId tenga formato UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(formData.categoryId)) {
        alert("El ID de categoría no tiene un formato válido (UUID)");
        return;
      }

      let url = "http://localhost:3000/api/v1/products";
      let method = "POST";

      if (isEditing) {
        method = "PATCH";
        url = `http://localhost:3000/api/v1/products/${editingProduct.id}`;
      }

      if (isEditing) {
        method = "PATCH";
        url = `http://localhost:3000/api/v1/products/${editingProduct.id}`;
      }

      const productData: any = {
        imageUrl: formData.imageUrl || undefined,
        stock: parseInt(formData.stock),
        wholesalePrice: formData.wholesalePrice && formData.wholesalePrice !== ""
          ? parseFloat(formData.wholesalePrice)
          : undefined,
        unitPrice: parseFloat(formData.unitPrice),
        description: formData.description || undefined,
        name: formData.name,
        categoryId: formData.categoryId,
      };

      // Solo agregar id en update
      if (isEditing && editingProduct?.id) {
        productData.id = editingProduct.id;
      }



      // Limpiar campos undefined para que no causen problemas
      Object.keys(productData).forEach(key => {
        if (productData[key] === undefined) {
          delete productData[key];
        }
      });

      console.log("Enviando datos al servidor (orden corregido):", productData);
      console.log("URL:", url);
      console.log("Método:", method);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const responseData = await response.json();
      console.log("Respuesta completa del servidor:", responseData);

      if (response.ok) {
        setIsModalOpen(false);
        setEditingProduct(null);

        // Si es una creación, agregar el nuevo producto con la categoría completa
        if (!isEditing && responseData.data) {
          const newProduct = responseData.data;

          // Buscar la categoría completa por el ID
          const fullCategory = categories.find(cat => cat.id === newProduct.categoryId);

          if (fullCategory) {
            // Asignar la categoría completa al nuevo producto
            newProduct.category = fullCategory;
          } else {
            // Si no encontramos la categoría, crear un objeto mínimo
            newProduct.category = {
              id: newProduct.categoryId,
              name: "Cargando...",
              description: ""
            };
          }

          // Agregar el nuevo producto a la lista
          setProducts(prevProducts => [newProduct, ...prevProducts]);
        } else {
          // Recargar la lista completa de productos para ediciones
          await fetchProducts();
        }

        alert(isEditing ? "Producto actualizado correctamente" : "Producto creado correctamente");
      } else {
        console.error("Error detallado del servidor:", responseData);

        // Mostrar errores específicos del servidor
        if (responseData.errors) {
          const errorMessages: string[] = [];

          Object.entries(responseData.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message: string) => {
                errorMessages.push(`${field}: ${message}`);
              });
            } else {
              errorMessages.push(`${field}: ${messages}`);
            }
          });

          alert(`Errores de validación:\n${errorMessages.join('\n')}`);
        } else if (responseData.message) {
          alert(`Error: ${responseData.message}`);
        } else {
          alert("Error desconocido al guardar el producto");
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`http://localhost:3000/api/v1/products/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setProducts(products.filter(p => p.id !== productId));
          alert("Producto eliminado correctamente");
        } else {
          alert("Error al eliminar el producto");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Función para formatear precios en pesos colombianos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Función para obtener el nombre de la categoría de forma segura
  const getCategoryName = (product: Product): string => {
    if (product.category) {
      return product.category.name;
    }

    // Si no hay categoría en el producto, buscar en la lista de categorías
    const category = categories.find(cat => cat.id === product.categoryId);
    return category ? category.name : "Sin categoría";
  };

  // Función para obtener la descripción de la categoría de forma segura
  const getCategoryDescription = (product: Product): string => {
    if (product.category) {
      return product.category.description;
    }

    // Si no hay categoría en el producto, buscar en la lista de categorías
    const category = categories.find(cat => cat.id === product.categoryId);
    return category ? category.description : "";
  };

  if (loading || categoriesLoading) return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <div className="admin-content">
          <p>Cargando productos...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <div className="admin-content">
          <div className="page-header">
            <h1>📦 Gestión de Productos</h1>

            <button onClick={handleCreateProduct} className="btn btn-primary">
              ➕ Nuevo Producto
            </button>
          </div>

          {products.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio Unitario</th>
                  <th>Precio Mayorista</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                      ) : (
                        <div className="product-image-placeholder">
                          📦
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="product-name">{product.name}</div>
                      {product.description && (
                        <div className="product-description">
                          {product.description.length > 50
                            ? `${product.description.substring(0, 50)}...`
                            : product.description}
                        </div>
                      )}
                    </td>
                    <td>{formatPrice(parseFloat(product.unitPrice.toString()))}</td>
                    <td>
                      {product.wholesalePrice ? formatPrice(parseFloat(product.wholesalePrice.toString())) : "N/A"}
                    </td>
                    <td>
                      <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="category-name">{getCategoryName(product)}</div>
                      <div className="category-description">{getCategoryDescription(product)}</div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/admin/products/view/${product.id}`} className="btn btn-view">
                          👁️ Ver
                        </Link>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="btn btn-edit"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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

          {/* Modal de formulario de productos */}
          <ProductsForm
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitProduct}
            initialData={editingProduct ? {
              name: editingProduct.name,
              description: editingProduct.description || "",
              unitPrice: editingProduct.unitPrice.toString(),
              wholesalePrice: editingProduct.wholesalePrice?.toString() || "",
              stock: editingProduct.stock.toString(),
              imageUrl: editingProduct.imageUrl || "",
              categoryId: editingProduct.categoryId
            } : null}
            categories={categories}
            title={editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsAdminPage;