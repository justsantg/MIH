import type React from "react"
import { useState, useEffect } from "react"
import {
  Star,
  Truck,
  Users,
  Palette,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react"
import "../HomePage/HomePage.css"
import type { HTMLFormMethod } from "react-router-dom"

interface CarouselItem {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta: string
}

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true)
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "Personalización Premium",
      subtitle: "Diseños únicos para tu marca",
      description: "Transforma tus ideas en realidad con nuestros servicios de personalización de alta calidad",
      image: "/placeholder-v2n00.png",
      cta: "Personalizar Ahora",
    },
    {
      id: 2,
      title: "Venta al Por Mayor",
      subtitle: "Precios especiales para tu negocio",
      description: "Obtén los mejores precios en pedidos grandes y haz crecer tu negocio con nosotros",
      image: "/bulk-clothing-wholesale.png",
      cta: "Ver Precios",
    },
    {
      id: 3,
      title: "Calidad Garantizada",
      subtitle: "Materiales de primera",
      description: "Utilizamos solo los mejores materiales y técnicas de impresión para resultados duraderos",
      image: "/placeholder-41nwp.png",
      cta: "Conocer Más",
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, carouselItems.length])

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/products") // 👈 tu backend
      .then((res) => res.json())
      .then((data) => {
        // el backend devuelve paginación, así que debes acceder a data.data
        setProducts(data.data ?? []);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const services = [
    {
      icon: <Palette className="service-icon" />,
      title: "Personalización",
      description: "Diseños únicos adaptados a tu marca y estilo personal",
      color: "var(--primary-red)",
    },
    {
      icon: <Users className="service-icon" />,
      title: "Venta al por Mayor",
      description: "Grandes volúmenes con precios especiales para tu negocio",
      color: "var(--secondary-blue)",
    },
    {
      icon: <Truck className="service-icon" />,
      title: "Envío Nacional",
      description: "Entrega rápida y segura en todo el territorio nacional",
      color: "var(--accent-peach)",
    },
    {
      icon: <Award className="service-icon" />,
      title: "Calidad Premium",
      description: "Materiales de primera calidad y acabados profesionales",
      color: "var(--primary-dark)",
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const newOrder = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:3000/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) throw new Error("Error enviando la orden");

      alert("✅ Tu pedido ha sido enviado con éxito!");
      e.currentTarget.reset();
    } catch (err) {
      alert("❌ Hubo un error al enviar tu pedido");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <section id="home" className="hero-section">
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {carouselItems.map((item, index) => (
                <div key={item.id} className="carousel-slide">
                  <div className="container">
                    <div className="slide-content">
                      <div className="slide-text">
                        <div className="slide-badge">
                          <span>Made in Heaven</span>
                        </div>
                        <h1 className="slide-title">{item.title}</h1>
                        <h2 className="slide-subtitle">{item.subtitle}</h2>
                        <p className="slide-description">{item.description}</p>
                        <div className="slide-buttons">
                          <button className="btn btn-secondary">
                            <a href="/contacto" className="router-link">
                              Cotiza con nosotros
                            </a>
                          </button>
                          <button className="btn btn-secondary">
                            <a href="/productos" className="router-link">
                              Ver Catálogo
                            </a>
                          </button>
                        </div>
                      </div>
                      <div className="slide-image">
                        <img src={item.image || "/placeholder.svg"} alt={item.title} />
                        <div className="image-overlay"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button onClick={prevSlide} className="carousel-btn carousel-btn-prev">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="carousel-btn carousel-btn-next">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="carousel-indicators">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
              />
            ))}
          </div>

          <div className="carousel-autoplay">
            <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="autoplay-btn">
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Nuestros Servicios</h3>
            <p className="section-subtitle">
              Ofrecemos soluciones completas para todas tus necesidades de personalización
            </p>
          </div>

          <div className="services-grid-modern">
            {services.map((service, index) => (
              <div key={index} className="service-card-modern">
                <div className="service-icon-container-modern" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h4 className="service-title-modern">{service.title}</h4>
                <p className="service-description-modern">{service.description}</p>
                <div className="service-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Nuestros Productos</h3>
            <p className="section-subtitle">
              Una amplia gama de productos para personalizar según tus necesidades
            </p>
          </div>

          <div className="products-grid-modern">
            {products.map((product) => (
              <div key={product.id} className="product-card-modern">
                <div className="product-image-modern">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                  />
                  <div className="product-overlay">
                    <button
                      className="product-btn"
                      onClick={() => (window.location.href = "/servicios")}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
                <div className="product-info-modern">
                  <h4 className="product-name-modern">{product.name}</h4>
                  <p className="product-description-modern">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content-modern">
            <div className="about-text-modern">
              <h3 className="section-title">¿Por qué elegirnos?</h3>
              <p className="about-intro">
                Somos líderes en personalización con años de experiencia creando productos únicos que reflejan la
                identidad de nuestros clientes.
              </p>
              <div className="about-features-modern">
                <div className="feature-modern">
                  <div className="feature-icon-modern">
                    <Clock />
                  </div>
                  <div className="feature-content">
                    <h4>+5 Años de Experiencia</h4>
                    <p>Perfeccionando el arte de la personalización</p>
                  </div>
                </div>
                <div className="feature-modern">
                  <div className="feature-icon-modern">
                    <Star />
                  </div>
                  <div className="feature-content">
                    <h4>Calidad Garantizada</h4>
                    <p>Materiales premium y acabados profesionales</p>
                  </div>
                </div>
                <div className="feature-modern">
                  <div className="feature-icon-modern">
                    <ShoppingBag />
                  </div>
                  <div className="feature-content">
                    <h4>+1000 Productos Entregados</h4>
                    <p>Clientes satisfechos en todo el país</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Contactános</h3>
            <p className="section-subtitle">Estamos aquí para ayudarte con tu próximo proyecto</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <h4>Teléfono</h4>
                  <p>+571234567890</p>
                </div>
              </div>
              <div className="contact-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="contact-icon"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                </svg>
                <div>
                  <h4>Instagram</h4>
                  <p>madeinheaven.shop_</p>
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
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Nombre completo"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    name="phone"
                    type="tel"
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
                <button type="submit" className="btn btn-primary btn-full">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
  )
}

export default HomePage

