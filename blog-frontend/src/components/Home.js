import { React, useState, useEffect, useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { decode } from 'html-entities'
import Layout from './Layout.js'
import AuthContext from '../context/AuthContext.js'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { isSignedIn } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts?page=${currentPage}&limit=5`)
                setPosts(response.data.posts)
                setTotalPages(response.data.totalPages)
            } catch (err) {
                console.error('Error fetching posts:', err)
                setError("Failed to fetch posts. Please try again later.")
            }
        }

        fetchPosts()
    }, [currentPage])

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
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
        <div className="pagination d-flex justify-content-center my-4">
            <Button 
                variant="secondary" 
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
                variant="secondary" 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(currentPage + 1)}
                className="ms-2"
            >
                Next
            </Button>
        </div>
    )

    return (
        <Layout>
            <div className="main">
                <h1 className="mb-5">Welcome to My Blog!</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div style={{ marginBottom: '5rem' }}>
                    {posts.length > 0 ? renderedPosts : <p>Loading posts...</p>}
                </div>
                { totalPages > 1 && renderPagination }
            </div>
        </Layout>
    )
}

export default Home