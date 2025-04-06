import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import axios from "axios"
import Layout from "./Layout.js"
import Editor from "./Editor.js"
import '../styles/editPost.css'

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState('')
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/post/${id}`)
                setTitle(response.data.post.title)
                setContent(response.data.post.content)
                if (response.data.image?.path) {
                    setPreviewImage(response.data.image.path)
                }
            } catch (err) {
                console.error("Error fetching post:", err)
                setError("Failed to load post.")
            }
        }

        fetchPost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const token = sessionStorage.getItem("accessToken")
      
        try {
          const formData = new FormData()
          formData.append("title", title)
          formData.append("content", content)
          if (image) formData.append("image", image)
      
          await api.patch(`/posts/post/${id}/edit`, formData, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            }
          });
      
          navigate(`/post/${id}`)
        } catch (err) {
          console.error("Error updating post:", err)
          setError("Failed to update post.")
        }
    }      

    return (
        <Layout>
            <div className="main">
                <div style={{ marginBottom: "4rem" }}>
                    <h1>Edit Post</h1>
                </div>
                <div className="edit-post-form-container" style={{ marginBottom: "4rem" }}>
                    <Form onSubmit={handleSubmit} className="edit-post-form">
                        {error && <div className="alert alert-danger">{error}</div>}
                        
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
                            <Form.Label>Change Featured Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>

                        {image ? (
                            <div className="mb-3">
                                <p>New Preview:</p>
                                <img 
                                src={URL.createObjectURL(image)} 
                                alt="New preview"
                                style={{ maxHeight: '200px', borderRadius: '8px' }}
                                />
                            </div>
                        ) : previewImage ? (
                            <div className="mb-3">
                                <p>Current Image:</p>
                                <img 
                                src={previewImage}
                                alt="Current"
                                style={{ maxHeight: '200px', borderRadius: '8px' }}
                                />
                            </div>
                        ) : null}

                        <Form.Group className="mb-3">
                            <Form.Label>Post Content</Form.Label>
                            <Editor key={id} value={content} onChange={setContent} />
                        </Form.Group>

                        <Button type="submit" variant="primary" id="form-btn">
                            {loading ? "Updating..." : "Update Post"}
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default EditPost