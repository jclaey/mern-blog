import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="ui container">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/post/:id" element={<PostScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
