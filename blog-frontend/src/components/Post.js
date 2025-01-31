import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import Layout from './Layout.js'
import { Card, Spinner } from "react-bootstrap"

const Post = () => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/post/${postId}`)
                setPost(response.data.post)
            } catch (err) {
                console.error("Error fetching post:", err)
                setError("Failed to load post.")
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [postId])

    if (loading) {
        return (
            <Layout>
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            </Layout>
        )
    }

    if (error) {
        return <Layout><div className="alert alert-danger">{error}</div></Layout>
    }

    return (
        <Layout>
            <Card>
                {post.image ? <Card.Img variant="top" src={post.image.path} /> : ""}
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: decode(post.content) }} />
                    {post.author ? <Card.Text>By: {post.author.name}</Card.Text> : ""}
                </Card.Body>
            </Card>
        </Layout>
    )
}

export default Post