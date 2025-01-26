import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import StyledLink from './StyledLink.js'

const NavigationBar = () => (
  <Navbar bg="light" expand="lg" style={{ height: '100px' }}>
    <Navbar.Brand as={Link} to="/" style={{ marginLeft: '2rem' }}>
      <StyledLink to="/" fontSize={28}>
        My Blog
      </StyledLink>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <StyledLink to="/" fontSize={20}>Home</StyledLink>
        <StyledLink to="/about" fontSize={20}>About</StyledLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavigationBar