import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, 
  Users, 
  Truck, 
  Award, 
  Clock, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  Quote,
  Star
} from 'lucide-react';
import './services.css';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  duration: string;
  popular?: boolean;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  const services: Service[] = [
    {
      id: 'personalizacion',
      title: 'Personalización de Prendas',
      description: 'Diseños únicos y personalizados para tu marca, evento o uso personal.',
      icon: <Palette size={40} />,
      features: [
        'Diseño gráfico incluido',
        'Múltiples técnicas de impresión',
        'Asesoría en materiales',
        'Pruebas de calidad',
        'Entrega garantizada'
      ],
      price: 'Desde $15.000',
      duration: '3-7 días',
      popular: true
    },
    {
      id: 'mayorista',
      title: 'Venta al por Mayor',
      description: 'Grandes volúmenes con precios especiales para distribuidores y empresas.',
      icon: <Users size={40} />,
      features: [
        'Precios preferenciales',
        'Mínimo 50 unidades',
        'Descuentos por volumen',
        'Embalaje profesional',
        'Soporte comercial'
      ],
      price: 'Desde $8.000',
      duration: '7-14 días'
    },
    {
      id: 'corporativo',
      title: 'Uniformes Corporativos',
      description: 'Soluciones completas para la imagen corporativa de tu empresa.',
      icon: <Target size={40} />,
      features: [
        'Análisis de necesidades',
        'Propuesta de diseño',
        'Bordados y estampados',
        'Control de inventario',
        'Mantenimiento continuo'
      ],
      price: 'Cotización personalizada',
      duration: '10-21 días'
    },
    {
      id: 'express',
      title: 'Servicio Express',
      description: 'Entregas rápidas para pedidos urgentes sin comprometer la calidad.',
      icon: <Clock size={40} />,
      features: [
        'Entrega en 24-48 horas',
        'Diseños predefinidos',
        'Stock disponible',
        'Seguimiento en tiempo real',
        'Garantía de calidad'
      ],
      price: 'Desde $25.000',
      duration: '1-2 días'
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: 1,
      title: 'Consulta Initial',
      description: 'Conversamos sobre tu proyecto, necesidades y objetivos.',
      icon: <Quote size={30} />
    },
    {
      step: 2,
      title: 'Diseño y Propuesta',
      description: 'Creamos el diseño y te presentamos una propuesta detallada.',
      icon: <Palette size={30} />
    },
    {
      step: 3,
      title: 'Producción',
      description: 'Iniciamos la producción con los mejores materiales y técnicas.',
      icon: <Target size={30} />
    },
    {
      step: 4,
      title: 'Control de Calidad',
      description: 'Revisamos cada producto antes de proceder con la entrega.',
      icon: <CheckCircle size={30} />
    },
    {
      step: 5,
      title: 'Entrega',
      description: 'Entregamos tu pedido en tiempo y forma acordados.',
      icon: <Truck size={30} />
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'María González',
      company: 'Café Central',
      text: 'Los uniformes que nos hicieron superaron nuestras expectativas. La calidad es excepcional y el servicio al cliente es de primera.',
      rating: 5
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      company: 'Eventos Premium',
      text: 'Hemos trabajado con Made in Heaven en múltiples eventos. Siempre entregan a tiempo y con la más alta calidad.',
      rating: 5
    },
    {
      id: '3',
      name: 'Ana Martínez',
      company: 'Startup Tech',
      text: 'Para nuestra empresa en crecimiento, encontrar un proveedor confiable era crucial. Made in Heaven ha sido nuestro aliado perfecto.',
      rating: 5
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId === selectedService ? '' : serviceId);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
  <div className="container">
    <div className="hero-stats">
      {[
        { number: '500+', label: 'Proyectos Completados' },
        { number: '98%', label: 'Satisfacción del Cliente' },
        { number: '5', label: 'Años de Experiencia' },
      ].map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">¿Qué Ofrecemos?</h2>
            <p className="section-subtitle">
              Cada servicio está diseñado para brindarte la mejor experiencia y resultados excepcionales.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`service-card ${service.popular ? 'service-popular' : ''} ${selectedService === service.id ? 'service-expanded' : ''}`}
                onClick={() => handleServiceSelect(service.id)}
              >
                {service.popular && (
                  <div className="popular-badge">
                    <Award size={16} />
                    Más Popular
                  </div>
                )}

                <div className="service-icon">
                  {service.icon}
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-meta">
                  <div className="service-price">{service.price}</div>
                  <div className="service-duration">⏱️ {service.duration}</div>
                </div>

                <div className={`service-features ${selectedService === service.id ? 'features-visible' : ''}`}>
                  <h4>Incluye:</h4>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="service-btn">
                  {selectedService === service.id ? 'Ver Menos' : 'Ver Más'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestro Proceso</h2>
            <p className="section-subtitle">
              Un proceso estructurado que garantiza la calidad y satisfacción en cada proyecto.
            </p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={step.step} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="step-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
            <p className="section-subtitle">
              La satisfacción de nuestros clientes es nuestra mejor recompensa.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-company">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para tu Próximo Proyecto?</h2>
            <p className="cta-description">
              Contáctanos hoy mismo y descubre cómo podemos ayudarte a materializar tus ideas.
            </p>
            <div className="cta-buttons">
              <Link to="/contacto" className="btn btn-primary">
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
              <Link to="/productos" className="btn btn-secondary">
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;