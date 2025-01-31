import { useContext } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import StyledLink from './StyledLink.js'
import AuthContext from '../context/AuthContext.js'
import api from '../api'

const NavigationBar = () => {
    const { accessToken, setAccessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
      try {
          await api.post('/admin/logout', {}, { withCredentials: true })

          sessionStorage.removeItem('accessToken')

          setAccessToken(null)

          navigate('/')
      } catch (err) {
          console.error('Logout failed:', err)
      }
  }

  return (
    <Navbar bg="light" expand="lg" style={{ height: '100px' }}>
      <Navbar.Brand as={Link} to="/" style={{ marginLeft: '2rem', fontSize: '28px' }}>
          My Blog
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <StyledLink to="/" fontSize={20}>Home</StyledLink>
          <StyledLink to="/about" fontSize={20}>About</StyledLink>
          <NavDropdown title="Topics" id="basic-nav-dropdown" style={{ fontSize: '20px', fontWeight: '500' }}>
            <StyledLink href="">Topic 1</StyledLink>
            <StyledLink href="">Topic 2</StyledLink>
          </NavDropdown>
        </Nav>
        {accessToken ? (
          <Button variant="danger" onClick={handleLogout}>
              Logout
          </Button>
        ) : (
          <Nav.Link as={Link} to="/admin/login">Login</Nav.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar