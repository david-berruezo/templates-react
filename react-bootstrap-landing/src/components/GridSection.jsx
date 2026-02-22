import { Container, Row, Col } from 'react-bootstrap'

const gridItems = [
  {
    tag: 'React',
    title: 'Componentes Reutilizables',
    description: 'Librería de componentes React modulares y bien documentados.',
    imgClass: 'img-1',
    image: '⚛️ React Components',
  },
  {
    tag: 'Bootstrap',
    title: 'Sistema de Grid Flexible',
    description: 'Layout responsive con el potente grid de Bootstrap 5.',
    imgClass: 'img-2',
    image: '📐 Grid System',
  },
  {
    tag: 'Vite',
    title: 'Build Ultrarrápido',
    description: 'Compilación instantánea con hot module replacement.',
    imgClass: 'img-3',
    image: '⚡ Vite Build',
  },
  {
    tag: 'JavaScript',
    title: 'JavaScript Moderno',
    description: 'ES6+, módulos, async/await y las últimas features del lenguaje.',
    imgClass: 'img-4',
    image: '🟨 Modern JS',
  },
  {
    tag: 'CSS',
    title: 'Estilos Personalizados',
    description: 'Variables CSS, animaciones fluidas y diseño pixel perfect.',
    imgClass: 'img-5',
    image: '🎨 Custom CSS',
  },
  {
    tag: 'Deploy',
    title: 'Listo para Producción',
    description: 'Configurado para despliegue inmediato en cualquier plataforma.',
    imgClass: 'img-6',
    image: '🚀 Production Ready',
  },
]

function GridSection() {
  return (
    <section id="portfolio" className="grid-section">
      <Container>
        <div className="text-center">
          <span className="section-badge">PORTFOLIO</span>
          <h2 className="section-title">Explora el Grid</h2>
          <p className="section-subtitle">
            Sistema de columnas flexible para organizar tu contenido de forma elegante.
          </p>
        </div>
        <Row className="g-4">
          {gridItems.map((item, index) => (
            <Col md={6} lg={4} key={index}>
              <div className="grid-item">
                <div className={`grid-item-image ${item.imgClass}`}>
                  {item.image}
                </div>
                <div className="grid-item-body">
                  <span className="grid-item-tag">{item.tag}</span>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default GridSection
