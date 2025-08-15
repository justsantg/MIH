import React from 'react';
import './ContactPage.css';

const ContactPage: React.FC = () => (
  <div className="contact-page">
    <section className="contact-hero">
      <div className="container">
        <h1 className="contact-title">Contáctanos</h1>
        <p className="contact-subtitle">
          ¿Tienes un proyecto en mente? ¡Hablemos!
        </p>
      </div>
    </section>
    <section className="contact-main-section">
      <div className="container">
        <div className="contact-main-content">
          <div className="contact-info">
            <div className="contact-info-item">
              <span className="contact-info-emoji">📞</span>
              <div>
                <h4>Teléfono</h4>
                <p>+57 324 9207921</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-emoji">✉️</span>
              <div>
                <h4>Email</h4>
                <p>info@madeinheaven.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-emoji">📍</span>
              <div>
                <h4>Ubicación</h4>
                <p>Pasto, Nariño, Colombia</p>
              </div>
            </div>
          </div>
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Mensaje o detalles del pedido"
                  rows={4}
                  className="form-input form-textarea"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ContactPage;
