import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';

const ProfileScreen = () => {
  const [isOwner, setIsOwner] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, user } = useSelector(state => state.userDetails);

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails(id));
    }

    if (userInfo && userInfo._id === user._id) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [dispatch, userInfo, id, user]);

  const renderedPosts = user.posts.map(post => {
    return (
      <div id="profile-post" className="item" key={post._id}>
        <div className="content">
          <div className="description">
            <Link to={`/post/${post._id}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>Posted on: {post.createdAt.slice(0,10)}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div id="profile-user-info">
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <h1>{isOwner ? 'My' : `${user.name}'s`} Profile</h1>
        <p>Email: {user.email}</p>
        {isOwner ? 
          <Link to={`/${id}/profile/edit`}>
            <button className="ui button">Edit Info</button> 
          </Link>
          : ''}
      </div>
      <div className='ui relaxed divided list' id="profile-posts">
        <h2>Recent Posts</h2>
        {renderedPosts}
      </div>
    </div>
  );
};

export default ProfileScreen;
