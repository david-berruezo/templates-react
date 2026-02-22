import { Container, Row, Col } from 'react-bootstrap'

const features = [
  {
    icon: '⚡',
    iconClass: 'icon-1',
    title: 'Rendimiento Ultra',
    description: 'Vite ofrece compilación instantánea con HMR. Tu desarrollo será más rápido que nunca.',
  },
  {
    icon: '🎨',
    iconClass: 'icon-2',
    title: 'Bootstrap 5 Integrado',
    description: 'Grid system, componentes responsive y utilidades CSS listas para usar desde el primer momento.',
  },
  {
    icon: '🧩',
    iconClass: 'icon-3',
    title: 'Componentes Modulares',
    description: 'Arquitectura basada en componentes reutilizables. Fácil de extender y mantener.',
  },
  {
    icon: '📱',
    iconClass: 'icon-4',
    title: 'Mobile First',
    description: 'Diseñado pensando primero en dispositivos móviles. Se adapta a cualquier pantalla.',
  },
  {
    icon: '🔧',
    iconClass: 'icon-5',
    title: 'Fácil Customización',
    description: 'Variables CSS personalizables y estructura clara para adaptar a tu marca rápidamente.',
  },
  {
    icon: '🚀',
    iconClass: 'icon-6',
    title: 'Deploy Sencillo',
    description: 'Listo para desplegar en Vercel, Netlify o cualquier plataforma con un solo comando.',
  },
]

function Features() {
  return (
    <section id="features" className="features-section">
      <Container>
        <div className="text-center">
          <span className="section-badge">FEATURES</span>
          <h2 className="section-title">Todo lo que necesitas</h2>
          <p className="section-subtitle">
            Componentes profesionales listos para usar en tu próximo proyecto.
          </p>
        </div>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={6} lg={4} key={index}>
              <div className="feature-card">
                <div className={`feature-icon ${feature.iconClass}`}>
                  {feature.icon}
                </div>
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Features
