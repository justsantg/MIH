import React, { useState, useEffect } from 'react';
import { Menu, X, Star, Truck, Users, Palette, ArrowRight, Phone, Mail, MapPin, ShoppingBag, Award, Clock } from 'lucide-react';
import './Landing.css';

interface NavItem {
  id: string;
  label: string;
}

const Landing: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Smooth scroll and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'products', 'about', 'contact'];
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'products', label: 'Productos' },
    { id: 'about', label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' }
  ];

  const services = [
    {
      icon: <Palette className="service-icon" />,
      title: "Personalización",
      description: "Diseños únicos adaptados a tu marca y estilo personal"
    },
    {
      icon: <Users className="service-icon" />,
      title: "Venta al por Mayor",
      description: "Grandes volúmenes con precios especiales para tu negocio"
    },
    {
      icon: <Truck className="service-icon" />,
      title: "Envío Nacional",
      description: "Entrega rápida y segura en todo el territorio nacional"
    },
    {
      icon: <Award className="service-icon" />,
      title: "Calidad Premium",
      description: "Materiales de primera calidad y acabados profesionales"
    }
  ];

  const products = [
    { name: "Camisetas", image: "👕", description: "Personalizadas con tu diseño" },
    { name: "Hoodies", image: "🧥", description: "Comodidad y estilo único" },
    { name: "Gorras", image: "🧢", description: "Accesorios con personalidad" },
    { name: "Bolsos", image: "👜", description: "Funcionales y elegantes" },
    { name: "Tazas", image: "☕", description: "Perfectas para regalos" },
    { name: "Llaveros", image: "🔑", description: "Detalles que marcan diferencia" }
  ];

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            <div className="logo">
              <h1 className="logo-text">Made in Heaven</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <div className="nav-links">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="mobile-menu-button">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-toggle"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="mobile-nav">
              <div className="mobile-nav-content">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`mobile-nav-link ${activeSection === item.id ? 'mobile-nav-link-active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-heading">
                <h2 className="hero-title">
                  Made in
                  <span className="hero-title-accent">Heaven</span>
                </h2>
                <p className="hero-subtitle">
                  Prendas y accesorios personalizados de calidad premium. 
                  Especialistas en pedidos al por mayor y detal.
                </p>
              </div>
              
              <div className="hero-buttons">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-primary"
                >
                  Solicitar Cotización
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="btn btn-secondary"
                >
                  Ver Productos
                </button>
              </div>
            </div>

            <div className="hero-image">
              <div className="hero-image-content">
                <div className="hero-icon">
                  <Palette size={80} />
                  <p>Diseños Únicos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Nuestros Servicios</h3>
            <p className="section-subtitle">
              Ofrecemos soluciones completas para todas tus necesidades de personalización
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon-container">
                  {service.icon}
                </div>
                <h4 className="service-title">{service.title}</h4>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Nuestros Productos</h3>
            <p className="section-subtitle">
              Una amplia gama de productos para personalizar según tus necesidades
            </p>
          </div>

          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
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

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h3 className="section-title">¿Por qué elegirnos?</h3>
              <div className="about-features">
                <div className="feature">
                  <Clock className="feature-icon" />
                  <div>
                    <h4>Experiencia</h4>
                    <p>Años de experiencia en el mercado de personalización</p>
                  </div>
                </div>
                <div className="feature">
                  <Star className="feature-icon" />
                  <div>
                    <h4>Calidad Garantizada</h4>
                    <p>Utilizamos los mejores materiales y técnicas de impresión</p>
                  </div>
                </div>
                <div className="feature">
                  <ShoppingBag className="feature-icon" />
                  <div>
                    <h4>Variedad</h4>
                    <p>Amplio catálogo de productos para todos los gustos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Contactános</h3>
            <p className="section-subtitle">
              Estamos aquí para ayudarte con tu próximo proyecto
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <h4>Teléfono</h4>
                  <p>+57 324 9207921</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>info@madeinheaven.com</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <h4>Ubicación</h4>
                  <p>Pasto, Nariño, Colombia</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form className="form">
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

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h4>Made in Heaven</h4>
              <p>Personalización y calidad en cada detalle</p>
            </div>
            <div className="footer-info">
              <p>&copy; 2024 Made in Heaven. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;