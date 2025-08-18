import React, { useEffect, useState } from 'react';
import './ProductsPage.css';

const WHATSAPP_NUMBER = "573249207921";
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data); // 👈 porque backend devuelve { data, meta }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setLoading(false);
      });
  }, []);

  // 👇 Agrupar productos por categoría
  const productsByCategory = products.reduce((acc: any, product: any) => {
    const category = product.category?.name || "Sin categoría";
    if (!acc[category]) {
      acc[category] = [];
    }
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
                  {productsByCategory[category].map((product: any, pIdx: number) => {
                    const whatsappMessage = encodeURIComponent(
                      `Hola, quiero más información sobre el producto: ${product.name}`
                    );
                    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

                    return (
                      <div className="product-card" key={pIdx}>
                        <div className="product-image">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="product-img-tag"
                              style={{ maxHeight: "80px" }}
                            />
                          ) : (
                            <span className="product-emoji">📦</span>
                          )}
                        </div>
                        <div className="product-info">
                          <h4 className="product-name">{product.name}</h4>
                          <p className="product-description">{product.description}</p>
                        </div>
                        {/* 👇 Botón WhatsApp */}
                        {/* 👇 Botón WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                            `Hola, quiero más información sobre el producto: ${product.name}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp"
                        >
                          Preguntar por WhatsApp
                        </a>

                      </div>
                    );
                  })}
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
