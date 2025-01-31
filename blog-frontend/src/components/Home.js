import { React, useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { decode } from 'html-entities'
import Layout from './Layout.js'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts')
                setPosts(response.data.posts)
            } catch (err) {
                console.error('Error fetching posts:', err)
                setError("Failed to fetch posts. Please try again later.")
            }
        }

        fetchPosts()
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
                    <Button variant="primary">View Post</Button>
                </Link>
            </Card.Body>
        </Card>
    ))

    return (
        <Layout>
            <h1 className="mb-5">Welcome to My Blog!</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div style={{ marginBottom: '5rem' }}>
                {posts.length > 0 ? renderedPosts : <p>Loading posts...</p>}
            </div>
        </Layout>
    )
}

export default Home