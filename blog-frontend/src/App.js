import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import NewPost from './components/NewPost.js'
import Post from './components/Post.js'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/post/new" element={<NewPost />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  </Router>
)

export default App