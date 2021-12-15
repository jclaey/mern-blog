import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const onLogoutClick = e => {
    dispatch(logout());
  };

  return (
    <div className="ui secondary pointing menu" id="navbar">
      <Link to="/" className="item">
        <span className="link item">Log 'n' Blog</span>
      </Link>
        {userInfo ? 
          <div className="right menu">
            <Link to="/profile" className="item">
              <span className="link item">
                <i className="user circle icon"></i>Profile
              </span>
            </Link>
            <button className="link item" onClick={onLogoutClick}>
              <span className="item">Logout</span>
            </button>
          </div>
           :
          <div className="right menu">
            <Link to="/login" className="ui item">
              <span className="link item">Sign In</span>
            </Link>
            <Link to="/register" className="ui item">
              <span className="link item">Create Account</span>
            </Link>
          </div>
        }
    </div>
  );
};

export default Header;
