import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../actions/postActions';
import Modal from '../components/Modal';

const DeletePostScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userInfo } = useSelector(state => state.userLogin);

  const onDeleteClick = () => {
    dispatch(deletePost(id));
  };

  const actions = (
    <>
      <Link
        to={`/${userInfo._id}/profile`}
        className="ui red button"
        onClick={() => onDeleteClick}
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
      <h1>Delete Post</h1>
      <Modal
        header="Delete Post"
        content="Are you sure you want to delete this comment forever?"
        actions={actions}
      />
    </div>
  );
};

export default DeletePostScreen;