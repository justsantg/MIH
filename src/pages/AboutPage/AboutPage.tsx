import React from 'react';
import './AboutPage.css';

const team = [
  { name: "Juan Pérez", role: "Fundador & CEO", emoji: "🧑‍💼" },
  { name: "María López", role: "Diseñadora", emoji: "🎨" },
  { name: "Carlos Ruiz", role: "Producción", emoji: "🧵" }
];

const AboutPage: React.FC = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="container">
        <h1 className="about-title">Sobre Nosotros</h1>
        <p className="about-subtitle">
          Pasión por la personalización, calidad y servicio.
        </p>
      </div>
    </section>
    <section className="about-history-section">
      <div className="container">
        <div className="about-history">
          <h2 className="about-section-title">Nuestra Historia</h2>
          <p>
            Made in Heaven nació en 2019 con el sueño de llevar prendas y accesorios personalizados a todos los rincones de Colombia. Desde entonces, hemos crecido gracias a la confianza de nuestros clientes y la dedicación de nuestro equipo.
          </p>
        </div>
      </div>
    </section>
    <section className="about-values-section">
      <div className="container">
        <h2 className="about-section-title">Nuestros Valores</h2>
        <div className="about-values-grid">
          <div className="about-value">
            <span className="about-value-emoji">🤝</span>
            <h4>Compromiso</h4>
            <p>Nos esforzamos por cumplir y superar las expectativas de cada cliente.</p>
          </div>
          <div className="about-value">
            <span className="about-value-emoji">✨</span>
            <h4>Calidad</h4>
            <p>Seleccionamos los mejores materiales y técnicas para cada producto.</p>
          </div>
          <div className="about-value">
            <span className="about-value-emoji">💡</span>
            <h4>Creatividad</h4>
            <p>Innovamos en cada diseño para que tu marca o evento destaque.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="about-team-section">
      <div className="container">
        <h2 className="about-section-title">Nuestro Equipo</h2>
        <div className="about-team-grid">
          {team.map((member, idx) => (
            <div className="about-team-card" key={idx}>
              <div className="about-team-emoji">{member.emoji}</div>
              <div className="about-team-info">
                <h4 className="about-team-name">{member.name}</h4>
                <p className="about-team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
