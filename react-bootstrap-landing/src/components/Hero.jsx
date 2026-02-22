import { Container, Row, Col } from 'react-bootstrap'

function Hero() {
  return (
    <section id="home" className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <span className="hero-badge">🚀 Nuevo Template 2026</span>
            <h1 className="hero-title">
              Construye algo<br />
              <span className="highlight">increíble</span> hoy
            </h1>
            <p className="hero-subtitle">
              Una plantilla React moderna con Bootstrap, Vite y JavaScript puro.
              Lista para personalizar y desplegar en minutos.
            </p>
            <div className="d-flex flex-wrap">
              <a href="#features" className="btn-hero-primary">
                Explorar Features
              </a>
              <a href="#showcase" className="btn-hero-secondary">
                Ver Showcase
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-number">50+</div>
                <div className="hero-stat-label">Componentes</div>
              </div>
              <div>
                <div className="hero-stat-number">100%</div>
                <div className="hero-stat-label">Responsive</div>
              </div>
              <div>
                <div className="hero-stat-number">⚡</div>
                <div className="hero-stat-label">Vite + React</div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="hero-image-wrapper">
              <div className="hero-image-placeholder">
                📱 Hero Image / Mockup (540 x 420)
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
