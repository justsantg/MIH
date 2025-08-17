import React from 'react';
import './ProductsPage.css';

const products = [
  { name: "Camisetas", image: "👕", description: "Personalizadas con tu diseño" },
  { name: "Hoodies", image: "🧥", description: "Comodidad y estilo único" },
  { name: "Gorras", image: "🧢", description: "Accesorios con personalidad" },
  { name: "Bolsos", image: "👜", description: "Funcionales y elegantes" },
  { name: "Tazas", image: "☕", description: "Perfectas para regalos" },
  { name: "Llaveros", image: "🔑", description: "Detalles que marcan diferencia" }
];

const ProductsPage: React.FC = () => (
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
        <div className="products-grid">
          {products.map((product, idx) => (
            <div className="product-card" key={idx}>
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
              </div>
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ProductsPage;
