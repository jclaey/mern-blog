import { Container } from "react-bootstrap"
import NavigationBar from "./Navbar.js"
import Footer from "./Footer.js"

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
            </Container>
            <Footer />
        </>    
    )
}

export default Layout