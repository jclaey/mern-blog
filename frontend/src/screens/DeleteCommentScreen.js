import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../actions/postActions';
import Modal from '../components/Modal';

const DeleteCommentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, comment_id } = useParams();

  const onDeleteClick = (commentId) => {
    dispatch(deleteComment(id, commentId));
  };

  const actions = (
    <>
      <Link
        to={`/post/${id}`}
        className="ui red button"
        onClick={() => onDeleteClick(comment_id)}
      >
        Yes
      </Link>
      <Link
        to={`/post/${id}`}
        className="ui button"
      >
        Cancel
      </Link>
    </>
  );

  return (
    <div>
      <h1>Delete Comment</h1>
      <Modal 
        header="Delete Comment"
        content="Are you sure you want to delete this comment forever?"
        actions={actions}
        onDismiss={() => navigate(`/post/${id}`)}
      />
    </div>
  );
};

export default DeleteCommentScreen;