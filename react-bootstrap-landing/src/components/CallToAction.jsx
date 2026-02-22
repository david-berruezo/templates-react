import { Container, Row, Col } from 'react-bootstrap'

function CallToAction() {
  return (
    <section id="contact" className="cta-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="cta-box">
              <h2 className="cta-title">¿Listo para empezar?</h2>
              <p className="cta-subtitle">
                Descarga esta plantilla y comienza a construir tu próximo proyecto
                con React, Bootstrap y Vite.
              </p>
              <a href="#" className="btn-cta">
                Descargar Template ↓
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CallToAction
