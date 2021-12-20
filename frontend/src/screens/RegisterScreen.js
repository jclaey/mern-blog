import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector(state => state.userRegister);
  
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const onFormSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords must match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {message && <Message type="warning">{message}</Message>}
      {error && <Message type="warning">{error}</Message>}
      {loading ? <Loader /> : 
        <div className="ui grid">
          <div className="ui row">
            <div className='six wide centered column'>
              <form className="ui form" onSubmit={onFormSubmit}>
                <div className="field">
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="ui button" type="submit">Sign Up</button>
              </form>
              <div className="bottom-form-link">
                Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default LoginScreen;