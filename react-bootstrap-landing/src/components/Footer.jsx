import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="g-4">
          <Col lg={4} md={6}>
            <div className="footer-brand">
              React<span>Lab</span>
            </div>
            <p className="footer-desc">
              Plantilla profesional con React, Bootstrap 5 y Vite.
              Lista para personalizar y desplegar.
            </p>
          </Col>
          <Col lg={2} md={6}>
            <h6 className="footer-title">Navegación</h6>
            <a href="#home" className="footer-link">Inicio</a>
            <a href="#features" className="footer-link">Features</a>
            <a href="#showcase" className="footer-link">Showcase</a>
            <a href="#portfolio" className="footer-link">Portfolio</a>
          </Col>
          <Col lg={2} md={6}>
            <h6 className="footer-title">Recursos</h6>
            <a href="#" className="footer-link">Documentación</a>
            <a href="#" className="footer-link">Componentes</a>
            <a href="#" className="footer-link">Changelog</a>
            <a href="#" className="footer-link">Soporte</a>
          </Col>
          <Col lg={2} md={6}>
            <h6 className="footer-title">Legal</h6>
            <a href="#" className="footer-link">Privacidad</a>
            <a href="#" className="footer-link">Términos</a>
            <a href="#" className="footer-link">Licencia</a>
          </Col>
          <Col lg={2} md={6}>
            <h6 className="footer-title">Social</h6>
            <a href="#" className="footer-link">GitHub</a>
            <a href="#" className="footer-link">Twitter</a>
            <a href="#" className="footer-link">LinkedIn</a>
            <a href="#" className="footer-link">Discord</a>
          </Col>
        </Row>
        <div className="footer-bottom">
          © {new Date().getFullYear()} ReactLab. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  )
}

export default Footer
