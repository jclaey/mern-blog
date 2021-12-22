import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import { updatePost, listPostDetails } from '../actions/postActions';

const EditPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.userLogin);
  const { error, loading, post } = useSelector(state => state.postDetails);
  const { error: errorPostUpdate, loading: loadingPostUpdate, success} = useSelector(state => state.postUpdate);

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    } else {
      if (!post.title) {
        dispatch(listPostDetails(id));
      } else {
        setTitle(post.title);
        setContent(post.content);
      }
    }
  }, [userInfo, navigate, dispatch, id, post]);

  const onFormSubmit = e => {
    e.preventDefault();

    dispatch(updatePost(id, {
      title,
      content
    }));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      {error && <Message type="warning">{error}</Message>}
      {errorPostUpdate && <Message type="warning">{errorPostUpdate}</Message>}
      {success && <Message type="success">Update successful</Message>}
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
            <label>Post Content</label>
            <textarea 
              name="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your blog post here..."
            ></textarea>
          </div>
          <button className="ui button" type="submit">Save Changes</button>
        </form>
      }
    </div>
  );
};

export default EditPostScreen;
