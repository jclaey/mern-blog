import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import axios from 'axios'
import Layout from "./Layout.js"
import Editor from "./Editor.js"
import '../styles/newPost.css'

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)
            const token = localStorage.getItem("accessToken")
            const response = await axios.post(
                "http://localhost:5000/api/posts/new",
                { title, content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            console.log("Post created:", response.data)
            setTitle("")
            setContent("")
            window.location.href = '/'
        } catch (err) {
            console.error("Error creating post:", err)
            setError("Failed to create post.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div style={{ marginBottom: '4rem' }}>
                <h1>Create A New Post</h1>
            </div>
            <div className='new-post-form-container' style={{ marginBottom: '4rem' }}>
                <Form onSubmit={handleSubmit} className="new-post-form">
                    <Form.Group className="mb-3">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter post title..."
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Post Content</Form.Label>
                        <Editor value={content} onChange={setContent} />
                    </Form.Group>

                    <Button type="submit" variant="primary" id="form-btn">
                        {loading ? "Publishing..." : "Publish"}
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}

export default NewPost