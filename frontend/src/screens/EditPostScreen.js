/* eslint-disable no-multi-str */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updatePost, listPostDetails } from '../actions/postActions';

const EditPostScreen = () => {
  const [title, setTitle] = useState('');
  let content;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.userLogin);
  const { error, loading, post } = useSelector(state => state.postDetails);
  const { error: errorPostUpdate, loading: loadingPostUpdate} = useSelector(state => state.postUpdate);

  const initialValue = post.content;

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    } else {
      if (!post.title) {
        dispatch(listPostDetails(id));
      } else {
        setTitle(post.title);
      }
    }
  }, [userInfo, navigate, dispatch, id, post]);

  const onEditorChange = (e) => {
    content = e.target.getContent();
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const image = document.querySelector('#post-image').files[0];

    dispatch(updatePost(id, {
      title,
      content: content || initialValue,
      image
    }));

    navigate(`/post/${post._id}`);
  };

  return (
    <div>
      <h1>Edit Post</h1>
      {error && <Message type="warning">{error}</Message>}
      {errorPostUpdate && <Message type="warning">{errorPostUpdate}</Message>}
      {loadingPostUpdate ? <Loader /> : loading ? <Loader /> :
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
          <button className='ui button' type="submit">Save Changes</button>
        </form>
      }
    </div>
  );
};

export default EditPostScreen;
