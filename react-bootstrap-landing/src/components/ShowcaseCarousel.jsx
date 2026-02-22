import { Container, Row, Col, Carousel } from 'react-bootstrap'

const slides = [
  {
    title: 'Proyecto Dashboard',
    description: 'Panel de administración moderno con gráficos interactivos, tablas de datos y gestión de usuarios en tiempo real.',
    image: '📊 Dashboard Preview',
  },
  {
    title: 'E-commerce Template',
    description: 'Tienda online completa con carrito de compras, pasarela de pago y gestión de inventario integrada.',
    image: '🛒 E-commerce Preview',
  },
  {
    title: 'App de Gestión',
    description: 'Aplicación de gestión de tareas con drag & drop, calendario integrado y notificaciones push.',
    image: '📋 App Preview',
  },
]

function ShowcaseCarousel() {
  return (
    <section id="showcase" className="carousel-section">
      <Container>
        <div className="text-center mb-5">
          <span className="section-badge">SHOWCASE</span>
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-subtitle">
            Explora algunos ejemplos de lo que puedes construir con esta plantilla.
          </p>
        </div>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Carousel indicators={true} interval={5000} pause="hover">
              {slides.map((slide, index) => (
                <Carousel.Item key={index}>
                  <div className="carousel-slide">
                    <Row className="align-items-center">
                      <Col md={7}>
                        <div className="carousel-slide-image">
                          {slide.image}
                        </div>
                      </Col>
                      <Col md={5}>
                        <h4>{slide.title}</h4>
                        <p>{slide.description}</p>
                        <a href="#" className="btn-hero-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                          Ver Más →
                        </a>
                      </Col>
                    </Row>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ShowcaseCarousel
