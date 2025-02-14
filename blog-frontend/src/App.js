import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.js'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import NewPost from './components/NewPost.js'
import EditPost from './components/EditPost.js'
import Post from './components/Post.js'
import About from './components/About.js'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/post/new" element={<NewPost />} />
        <Route path="/admin/edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
  </Router>
)

export default App