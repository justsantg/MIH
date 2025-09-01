import React, { useEffect, useState } from "react";
import "./ProductsPage.css";

const WHATSAPP_NUMBER = "573249207921";

// 👉 Base URL del backend (puedes moverlo a un .env)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
  category?: Category;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data || []); // ✅ backend responde { data, meta }
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

    fetchProducts();
  }, []);

  // Agrupar productos por categoría
  const productsByCategory = products.reduce((acc: any, product: Product) => {
    const category = product.category?.name || "Sin categoría";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <h1 className="products-title">Nuestros Productos</h1>
          <p className="products-subtitle">
            Descubre nuestra variedad de productos listos para personalizar a tu gusto.
          </p>
        </div>
      </section>

      <section className="products-list-section">
        <div className="container">
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            Object.keys(productsByCategory).map((category, idx) => (
              <div key={idx} className="category-section">
                <h2 className="category-title">{category}</h2>
                <div className="products-grid">
                  {productsByCategory[category].map((product: Product) => (
                    <div className="product-card" key={product.id}>
                      <div className="product-image">
                        {product.imageUrl ? (
                          <img
                            src={`${API_BASE}${product.imageUrl}`} // 👈 aseguramos la URL completa
                            alt={product.name}
                            className="product-img-tag"
                            style={{ maxHeight: "120px" }}
                          />
                        ) : (
                          <span className="product-emoji">📦</span>
                        )}
                      </div>
                      <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-description">{product.description}</p>
                      </div>
                      {/* Botón WhatsApp */}
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hola, quiero más información sobre el producto: ${product.name}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                      >
                        Preguntar por WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
