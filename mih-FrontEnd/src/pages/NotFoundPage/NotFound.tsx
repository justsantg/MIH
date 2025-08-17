import React from 'react';
import './NotFound.css';

const NotFound: React.FC = () => (
  <div className="notfound-page">
    <section className="notfound-hero">
      <div className="container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Página no encontrada</p>
        <p className="notfound-message">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <a href="/" className="btn btn-primary notfound-btn">
          Volver al inicio
        </a>
      </div>
    </section>
  </div>
);

export default NotFound;
