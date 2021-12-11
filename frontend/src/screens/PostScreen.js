import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPostDetails } from '../actions/postActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PostScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, post } = useSelector(state => state.postDetails);

  useEffect(() => {
    dispatch(listPostDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? <Loader /> : error ? <Message type="warning">{error}</Message> : 
        <div>
          <h1 className="ui header">{post.title}</h1>
          <p>By: {post.author.name}</p>
          <div>
            {post.content}
          </div>
        </div>
      }
    </div>
  );
};

export default PostScreen;
