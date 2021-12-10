import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <span className="header-link">Home</span>
      </Link>
      <div className="right menu">
        <Link to="/login" className="ui item">
          <span className="header-link">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
