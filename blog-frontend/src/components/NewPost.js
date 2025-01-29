import { useState } from "react"
import Layout from "./Layout.js"
import '../styles/newPost.css'

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = e => {

    }

    return (
        <Layout>
            <div style={{ marginBottom: '4rem' }}>
                <h1>Create A New Post</h1>
            </div>
            <div className='new-post-form' style={{ marginBottom: '4rem' }}>
                <Form 
                    style={{ marginBottom: '3rem', width: '50%' }}
                    onSubmit={handleSubmit}
                >
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter post title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter post content..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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

export default NewPost