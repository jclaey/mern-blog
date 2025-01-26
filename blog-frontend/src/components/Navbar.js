import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavigationBar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand as={Link} to="/" style={{ marginLeft: '2rem' }}>My Blog</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavigationBar