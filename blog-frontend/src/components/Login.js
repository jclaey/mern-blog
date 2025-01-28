import { useState } from 'react'
import Layout from "./Layout.js"
import { Form, Button, Alert } from "react-bootstrap"
import axios from 'axios'
import '../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", {
                email,
                password,
            })

            const { token } = response.data

            localStorage.setItem('accessToken', token)

            window.location.href = '/admin'
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message)
            setError('Invalid email or password. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div style={{ marginBottom: '4rem' }}>
                <h1>Sign In</h1>
            </div>
            <div className='login-form' style={{ marginBottom: '4rem' }}>
                <Form 
                    style={{ marginBottom: '3rem', width: '50%' }}
                    onSubmit={handleLogin}
                >
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button 
                        type="submit" 
                        variant="primary"
                        disabled={loading}
                        id='form-btn'
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}

export default Login