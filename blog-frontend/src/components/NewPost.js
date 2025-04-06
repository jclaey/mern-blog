import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import api from "../api.js"
import Layout from "./Layout.js"
import Editor from "./Editor.js"
import '../styles/newPost.css'

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
      
        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        if (image) {
          formData.append("image", image)
        }
      
        try {
          const token = sessionStorage.getItem("accessToken")
          const response = await api.post("/posts/new", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          })
      
          console.log("✅ Post created:", response.data)
          navigate(`/post/${response.data._id}`)
        } catch (err) {
          console.error("❌ Failed to create post:", err)
          setError("Failed to create post. Try again.")
        }
    }

    return (
        <Layout>
            <div className="main">
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

                        <Form.Group controlId="image" className="mb-3">
                            <Form.Label>Featured Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>

                        {image && (
                            <div className="mb-3">
                                <p>Preview:</p>
                                <img 
                                src={URL.createObjectURL(image)} 
                                alt="Preview" 
                                style={{ maxHeight: "200px" }} 
                                />
                            </div>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Post Content</Form.Label>
                            <Editor value={content} onChange={setContent} />
                        </Form.Group>

                        <Button type="submit" variant="primary" id="form-btn">
                            {loading ? "Publishing..." : "Publish"}
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default NewPost