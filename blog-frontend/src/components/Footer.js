import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import StyledLink from "./StyledLink.js"

const Footer = () => {
    return (
        <footer>
            <Row>
                <Col>
                    <h3>My Blog</h3>
                </Col>
                <Col>
                    <div>
                        <StyledLink to="/privacy-policy" fontSize={18}>
                            Privacy Policy
                        </StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/terms-and-conditions" fontSize={18}>
                            Terms and Conditions
                        </StyledLink>
                    </div>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer