import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import NewPostScreen from './screens/NewPostScreen';
import EditPostScreen from './screens/EditPostScreen';
import DeleteCommentScreen from './screens/DeleteCommentScreen';
import DeletePostScreen from './screens/DeletePostScreen';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="ui container">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/post/:id" element={<PostScreen />} />
          <Route path="/post/:id/edit" element={<EditPostScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/:id/profile" element={<ProfileScreen />} />
          <Route path="/:id/profile/edit" element={<EditProfileScreen />} />
          <Route path="/post/new" element={<NewPostScreen />} />
          <Route path="/post/:id/comments/:comment_id/delete" element={<DeleteCommentScreen />} />
          <Route path="/post/:id/delete" element={<DeletePostScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
