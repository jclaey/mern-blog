import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../actions/postActions';

const DeletePostScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userInfo } = useSelector(state => state.userLogin);

  const onDeleteClick = () => {
    dispatch(deletePost(id));
  };

  return (
    <div id="post-delete-alert" className="ui warning message">
      <div className="header" style={{marginBottom: '1rem'}}>
        Are you sure you want to delete this comment forever?
      </div>
      <div>
        <Link to={`/${userInfo._id}/profile`}>
          <button 
            className="ui green button"
            onClick={onDeleteClick}
          >
            Yes
          </button>
        </Link>
        <Link to={`/post/${id}`}>
          <button className="ui red button">No</button>
        </Link>
      </div>
    </div>
  );
};

export default DeletePostScreen;