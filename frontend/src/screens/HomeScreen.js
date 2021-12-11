import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { listPosts } from '../actions/postActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, posts } = useSelector(state => state.postList);

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  const renderedPosts = posts.map(post => {
    return (
      <Post post={post} key={post._id} />
    );
  });

  return (
    <div>
      <h1>Latest Posts</h1>
      {loading ? <Loader /> : error ? <Message type="warning">{error}</Message> : 
        <div className="ui relaxed divided list">
          {renderedPosts}
        </div>
      }
    </div>
  );
};

export default HomeScreen;