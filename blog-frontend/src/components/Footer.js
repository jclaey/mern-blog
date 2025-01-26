import { Row, Col } from "react-bootstrap"
import StyledLink from "./StyledLink.js"

const Footer = () => {
    return (
        <footer>
            <Row style={{ width: '100%' }}>
                <Col style={{ marginLeft: '5rem' }}>
                    <StyledLink to="/" fontSize={36}>
                        My Blog
                    </StyledLink>
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