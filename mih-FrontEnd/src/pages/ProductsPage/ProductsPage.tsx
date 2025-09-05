import React, { useEffect, useState } from "react";
import "./ProductsPage.css";

const WHATSAPP_NUMBER = "573249207921";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/api/v1/products`),
          fetch(`${API_BASE}/api/v1/categories`)
        ]);

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.data || []);
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => 
        product.category?.name === selectedCategory || 
        product.category?.id === selectedCategory
      );

  // Agrupar productos por categoría
  const productsByCategory = filteredProducts.reduce((acc: any, product: Product) => {
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

      <section className="products-filter-section">
        <div className="container">
          <div className="filter-container">
            <label htmlFor="category-filter" className="filter-label">
              Filtrar por categoría:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="products-list-section">
        <div className="container">
          {loading ? (
            <p className="loading-text">Cargando productos...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="no-products">No hay productos disponibles</p>
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
                            src={`${API_BASE}${product.imageUrl}`}
                            alt={product.name}
                            className="product-img"
                          />
                        ) : (
                          <span className="product-emoji">📦</span>
                        )}
                      </div>
                      <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        {product.description && (
                          <p className="product-description">{product.description}</p>
                        )}
                        <p className="product-price">
                          Precio: ${product.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hola, quiero más información sobre el producto: ${product.name} (Precio: $${product.unitPrice.toLocaleString()})`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                      >
                        💬 Preguntar por WhatsApp
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