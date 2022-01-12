import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../actions/postActions';

const DeleteCommentScreen = () => {
  const dispatch = useDispatch();
  const { id, comment_id } = useParams();

  const onDeleteClick = (commentId) => {
    dispatch(deleteComment(id, commentId));
  };

  return (
    <div id="comment-delete-alert" className="ui warning message">
      <div className="header" style={{marginBottom: '1rem'}}>
        Are you sure you want to delete this comment forever?
      </div>
      <div>
        <Link to={`/post/${id}`}>
          <button 
            className="ui green button"
            onClick={() => onDeleteClick(comment_id)}
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

export default DeleteCommentScreen;