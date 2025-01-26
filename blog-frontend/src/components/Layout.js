import { Container } from "react-bootstrap"
import NavigationBar from "./Navbar.js"
import Footer from "./Footer.js"
import '../styles/style.css'

const Layout = ({ children }) => {
    return (
        <Container>
            <header>
                <NavigationBar />
            </header>
            <main>
                {children}
            </main>
            <Footer />
        </Container>        
    )
}

export default Layout