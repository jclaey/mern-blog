import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const EditProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(state => state.userDetails);
  const { userInfo } = useSelector(state => state.userLogin);
  const { success } = useSelector(state => state.userUpdate);

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, id, dispatch]);

  const onFormSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords must match');
    } else {
      dispatch(updateUserProfile(id, {
        id: user._id,
        name,
        email,
        password
      }));
    }
  };

  return (
    <div>
      <h1>Update Your Information</h1>
      {message && <Message type="warning">{message}</Message>}
      {error && <Message type="warning">{error}</Message>}
      {success && <Message type="success">Update successful</Message>}
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
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="ui button" type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default EditProfileScreen;