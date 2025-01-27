import Layout from "./Layout.js"
import { Form, Button } from "react-bootstrap"

const Login = () => {
    return (
        <Layout>
            <div style={{ marginBottom: '2rem' }}>
                <h2>Sign In</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form style={{ marginBottom: '3rem', width: '50%' }}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password..." />
                    </Form.Group>
                    <Button type="submit" variant="primary">Login</Button>
                </Form>
            </div>
        </Layout>
    )
}

export default Login