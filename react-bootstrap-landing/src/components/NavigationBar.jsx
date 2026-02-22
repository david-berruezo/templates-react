import { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

function NavigationBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-text">
          React<span>Lab</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="nav-link-custom">Inicio</Nav.Link>
            <Nav.Link href="#features" className="nav-link-custom">Features</Nav.Link>
            <Nav.Link href="#showcase" className="nav-link-custom">Showcase</Nav.Link>
            <Nav.Link href="#portfolio" className="nav-link-custom">Portfolio</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom btn-nav-cta ms-2">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
