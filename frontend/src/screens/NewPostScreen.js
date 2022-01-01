/* eslint-disable no-multi-str */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createPost } from '../actions/postActions';

const NewPostScreen = () => {
  const [title, setTitle] = useState('');
  let content;

  const [dirty, setDirty] = useState(false);

  const initialValue = '<p>Write your post here...</p>';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.userLogin);
  const { error, loading} = useSelector(state => state.postCreate);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    setDirty(false);
  }, [userInfo, navigate, initialValue]);

  const onEditorChange = (e) => {
    content = e.target.getContent();
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const image = document.querySelector('#post-image').files[0];

    dispatch(createPost({ title, content, image, author: userInfo._id }));
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
            <label>Featured Image</label>
            <input 
              id="post-image"
              type="file"
              name="image"
            />
          </div>
          <div className="field">
            <label>Post Content</label>
            <Editor
              apiKey='u7jtsuz1glcmvd4obg3mihkfv74kpuhtx7qhydm5uc9j6u7e'
              onChange={onEditorChange}
              initialValue={initialValue}
              onDirty={() => setDirty(true)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image',
                  'charmap print preview anchor help',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help'
              }}
            />
          </div>
          <button className={`ui ${!dirty ? 'disabled' : ''} button`} type="submit">Create</button>
        </form>
      }
    </div>
  );
};

export default NewPostScreen;
