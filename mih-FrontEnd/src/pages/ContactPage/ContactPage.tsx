import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const newOrder = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      status: 'pending',
    };

    try {
      const res = await fetch('http://localhost:3000/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) throw new Error('Error enviando la orden');

      alert('✅ Tu pedido ha sido enviado con éxito!');
      e.currentTarget.reset();
    } catch (err) {
      alert('❌ Hubo un error al enviar tu pedido');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
                  <p>
                    <a
                      href="https://wa.me/573249207921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      +57 3249207921
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-emoji">✉️</span>
                <div>
                  <h4>Instagram</h4>
                  <p>
                    <a
                      href="https://instagram.com/madeinheaven.shop_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      madeinheaven.shop_
                    </a>
                  </p>
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
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nombre completo"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Mensaje o detalles del pedido"
                    rows={4}
                    className="form-input form-textarea"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
