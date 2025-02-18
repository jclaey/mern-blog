import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import StyledLink from './StyledLink.js'
import AuthContext from '../context/AuthContext.js'
import api from '../api.js'

const NavigationBar = () => {
    const auth = useContext(AuthContext)

    if (!auth) {
        console.error("❌ AuthContext is undefined in NavigationBar")
        return null
    }

    const { accessToken, isSignedIn, setAccessToken, setIsSignedIn } = auth

    const handleLogout = async () => {
        try {
            console.log("🔹 Sending logout request...")
            await api.post('/admin/logout', {}, { withCredentials: true })

            console.log("✅ Logout successful")

            sessionStorage.clear()
            localStorage.clear()
            setAccessToken(null)
            setIsSignedIn(false)

            window.location.href = "/"

        } catch (err) {
            console.error("❌ Logout failed:", err.response?.data || err.message)
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
                </Nav>
                <div style={{ marginRight: '5rem' }}>
                    {isSignedIn ? (
                        <div>
                            <Link to="/admin/dashboard" style={{ marginRight: '1rem' }}>
                                <Button variant="dark">
                                    <i className="fa-solid fa-gauge" style={{  marginRight: '0.5rem' }}></i>
                                    Dashboard
                                </Button>
                            </Link>
                            <Link to="/admin/post/new" style={{ marginRight: '1rem' }}>
                                <Button variant="success">
                                    <i className="fa-solid fa-plus" style={{  marginRight: '0.5rem' }}></i>
                                    Add New Post
                                </Button>
                            </Link>
                            <Button variant="danger" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '0.5rem' }}></i>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <StyledLink to="/admin/login" fontSize={20}>Login</StyledLink>
                    )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar