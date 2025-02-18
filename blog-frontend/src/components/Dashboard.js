import { useEffect, useState, useContext } from "react"
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { decode } from 'html-entities'
import api from '../api.js'
import Layout from "./Layout.js"
import '../styles/dashboard.css'
import AuthContext from '../context/AuthContext.js'

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [adminDetails, setAdminDetails] = useState(null)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { isSignedIn } = useContext(AuthContext)

    useEffect(() => {
        const fetchAdminDetailsAndPosts = async () => {
            try {
                const token = sessionStorage.getItem('accessToken')
                const response = await api.get('/admin/dashboard-admin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                
                setAdminDetails(response.data.admin)

                const posts = await api.get(`http://localhost:5000/api/posts`, {
                    params: {
                        page: currentPage,
                        limit: 5,
                        title: searchQuery,
                    },
                })

                setPosts(posts.data.posts)
                setTotalPages(posts.data.totalPages)
            } catch (err) {
                console.error('Error fetching admin details:', err)
                setError('Failed to fetch admin details')
            }
        }

        fetchAdminDetailsAndPosts()
    }, [currentPage, searchQuery])

    const handleSearch = (e) => {
        e.preventDefault()
        setCurrentPage(1)
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return
        try {
            const token = localStorage.getItem("accessToken")
            await axios.delete(`http://localhost:5000/api/posts/post/${postId}/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId))
        } catch (error) {
            console.error("Error deleting post:", error)
            alert("Failed to delete post.")
        }
    }

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

    const renderPagination = () => (
        <div className="pagination d-flex justify-content-center my-5">
            <Button 
                variant="outline-dark" 
                disabled={currentPage === 1} 
                onClick={() => handlePageChange(currentPage - 1)}
                className="me-2"
            >
                Previous
            </Button>
            <span className="align-self-center mx-2">
                Page {currentPage} of {totalPages}
            </span>
            <Button 
                variant="outline-dark" 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(currentPage + 1)}
                className="ms-2"
            >
                Next
            </Button>
        </div>
    )

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
                <Form onSubmit={handleSearch} className="mb-4 d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Search your posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="me-2"
                    />
                    <Button type="submit" variant="primary">Search</Button>
                </Form>
                <div style={{ marginBottom: '5rem' }}>
                    {posts.length > 0 ? renderedPosts : <p>No posts found...</p>}
                </div>
                { totalPages > 1 && renderPagination() }
            </div>
        </Layout>
    )
}

export default Dashboard