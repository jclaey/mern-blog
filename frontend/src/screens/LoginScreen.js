import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector(state => state.userLogin);
  
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <Message type="warning">{error}</Message>}
      {loading ? <Loader /> :
        <div className="ui grid">
          <div className="ui row">
            <div className='six wide centered column'>
              <form className="ui form" onSubmit={submitHandler}>
                <div className="field">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <button className="ui button" type="submit">Sign In</button>
              </form>
              <div className="bottom-form-link">
                Not yet a member? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default LoginScreen;