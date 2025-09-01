import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsAdminPage.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductsForm from "./ProductForm/ProductForm";
import type { ProductFormData } from "./types/product";

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

      let imageUrl = editingProduct?.imageUrl || "";

      // 🚨 Si el usuario subió un archivo nuevo
      if (formData.imageFile) {
        const imageData = new FormData();
        imageData.append("file", formData.imageFile);

        const uploadRes = await fetch("http://localhost:3000/api/v1/products/upload-image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageData,
        });

        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          imageUrl = uploadResult.url; // 👈 la URL que devuelve el backend
        } else {
          alert("Error al subir la imagen");
          return;
        }
      }

      let url = "http://localhost:3000/api/v1/products";
      let method = "POST";

      if (isEditing) {
        method = "PATCH";
        url = `http://localhost:3000/api/v1/products/${editingProduct.id}`;
      }

      const productData: any = {
        name: formData.name,
        description: formData.description || undefined,
        unitPrice: parseFloat(formData.unitPrice),
        wholesalePrice: formData.wholesalePrice ? parseFloat(formData.wholesalePrice) : undefined,
        stock: parseInt(formData.stock),
        categoryId: formData.categoryId,
        imageUrl, // 👈 se guarda la URL generada
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        setEditingProduct(null);
        await fetchProducts();
        alert(isEditing ? "Producto actualizado correctamente" : "Producto creado correctamente");
      } else {
        console.error("Error detallado del servidor:", responseData);
        alert(responseData.message || "Error al guardar el producto");
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCategoryName = (product: Product): string => {
    const category = product.category || categories.find(cat => cat.id === product.categoryId);
    return category ? category.name : "Sin categoría";
  };

  const getCategoryDescription = (product: Product): string => {
    const category = product.category || categories.find(cat => cat.id === product.categoryId);
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
                        <img
                          src={`http://localhost:3000${product.imageUrl}`}
                          alt={product.name}
                          className="product-image"
                        />
                      ) : (
                        <div className="product-image-placeholder">📦</div>
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
                    <td>{formatPrice(product.unitPrice)}</td>
                    <td>{product.wholesalePrice ? formatPrice(product.wholesalePrice) : "N/A"}</td>
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
                        <Link to={`/admin/products/view/${product.id}`} className="btn btn-view">👁️ Ver</Link>
                        <button onClick={() => handleEditProduct(product)} className="btn btn-edit">✏️ Editar</button>
                        <button onClick={() => handleDelete(product.id)} className="btn btn-delete">🗑️ Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
              categoryId: editingProduct.categoryId,
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
