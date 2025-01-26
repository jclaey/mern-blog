import { Container } from "react-bootstrap"
import NavigationBar from "./Navbar.js"
import Footer from "./Footer.js"
import '../styles/style.css'

const Layout = ({ children }) => {
    return (
        <>
            <header style={{ marginBottom: '2rem' }}>
                <NavigationBar />
            </header>
            <Container>
                <main>
                    {children}
                </main>
                <Footer />
            </Container>
        </>    
    )
}

export default Layout