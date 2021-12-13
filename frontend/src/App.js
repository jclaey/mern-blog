import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="ui container">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/post/:id" element={<PostScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
