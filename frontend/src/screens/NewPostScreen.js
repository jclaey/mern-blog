import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createPost } from '../actions/postActions';

const NewPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.userLogin);
  const { error, loading} = useSelector(state => state.postCreate);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const onFormSubmit = e => {
    e.preventDefault();

    dispatch(createPost(title, content, userInfo._id));
    navigate(`/${userInfo._id}/profile`);
  };

  return (
    <div>
      <h1>Create A New Post</h1>
      {error && <Message type="warning">{error}</Message>}
      {loading ? <Loader /> : 
        <form className="ui form" onSubmit={onFormSubmit}>
          <div className="field">
            <label>Post Title</label>
            <input 
              type="text"
              name="title"
              placeholder="Enter post title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Post Content</label>
            <textarea 
              name="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your blog post here..."
            ></textarea>
          </div>
          <button className="ui button" type="submit">Create</button>
        </form>
      }
    </div>
  );
};

export default NewPostScreen;
