import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import { decode } from 'html-entities'
import Layout from './Layout.js'
import { Spinner, Image } from "react-bootstrap"

const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/post/${id}`)
                setPost(response.data.post)
            } catch (err) {
                console.error("Error fetching post:", err)
                setError("Failed to load post.")
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

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
            <div>
                {post.image ? <Image src={`${post.image.path}`} rounded /> : ""}
            </div>
            <div>
                <h1>{post.title}</h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: decode(post.content) }} />
        </Layout>
    )
}

export default Post