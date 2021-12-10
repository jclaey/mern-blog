import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="ui container">
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
