import { useEffect, useState, useContext } from "react"
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { decode } from 'html-entities'
import api from '../api.js'
import Layout from "./Layout.js"
import '../styles/dashboard.css'
import AuthContext from '../context/AuthContext.js'

const Dashboard = () => {
    const [adminDetails, setAdminDetails] = useState(null)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const { isSignedIn } = useContext(AuthContext)

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const token = sessionStorage.getItem('accessToken')
                const response = await api.get('/admin/dashboard-admin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                
                setAdminDetails(response.data.admin)
                setPosts(response.data.posts)
            } catch (err) {
                console.error('Error fetching admin details:', err)
                setError('Failed to fetch admin details')
            }
        }

        fetchAdminDetails()
    }, [])

    const renderedPosts = posts.map(post => (
        <Card key={post._id} className="card mb-3">
            {post.image 
                ? <Card.Img variant='top' src={post.image.path} />
                : ''
            }
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: decode(post.content).slice(0, 30) }} />
                { post.author 
                   ? <Card.Text>By: {post.author.name}</Card.Text>
                   : ''
                }
                <Link to={`/post/${post._id}`}>
                    <Button variant="primary">
                        <i className="fa-solid fa-book-open-reader" style={{ marginRight: '0.5rem' }}></i>
                        View Post
                    </Button>
                </Link>
                {isSignedIn && (
                    <>
                        <Link to={`/admin/edit/${post._id}`}>
                            <Button variant="warning" className="ms-2">
                                <i className="fa-solid fa-pen-to-square" style={{ marginRight: '0.5rem' }}></i>
                                Edit
                            </Button>
                        </Link>
                        <Button 
                            variant="danger" 
                            className="ms-2"
                            onClick={() => handleDelete(post._id)}
                        >
                            <i className="fa-solid fa-trash" style={{ marginRight: '0.5rem' }}></i>
                            Delete
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    ))

    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    return (
        <Layout>
            <div className="dashboard-container main">
                <div>
                    <h1>Admin Dashboard</h1>
                </div>
                {adminDetails ? (
                    <div style={{ marginBottom: '5rem' }}>
                        { adminDetails.name ? <h3>Hello, {adminDetails.name}</h3> : '' }
                        <p style={{ fontSize: '20px' }}>Email: {adminDetails.email}</p>
                    </div>
                ) : (
                    <p>Loading admin details...</p>
                )}
                <div style={{ marginBottom: '5rem' }}>
                    {posts.length > 0 ? renderedPosts : <p>Loading posts...</p>}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard