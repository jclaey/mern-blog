import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPostDetails, createComment, updatePostComment } from '../actions/postActions';
import { POST_CREATE_COMMENT_RESET } from '../constants/postConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PostScreen = () => {
  const [body, setBody] = useState('');
  const [editCommentBody, setEditCommentBody] = useState('');
  const [isPostOwner, setIsPostOwner] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, post } = useSelector(state => state.postDetails);
  const { userInfo } = useSelector(state => state.userLogin);
  const { 
    error: errorCommentCreate,
    success: successCommentCreate
  } = useSelector(state => state.postCommentCreate);

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(createComment(id, body));
  };

  const onEditClick = e => {
    document.querySelector('#edit-comment-form').style.display = 'block';
  };

  const onCommentEditFormSubmit = (e, postId, commentId, commentBody) => {
    e.preventDefault();
    dispatch(updatePostComment(postId, commentId, commentBody));
  };

  useEffect(() => {
    if (successCommentCreate) {
      setBody('');
      dispatch({ type: POST_CREATE_COMMENT_RESET });
    }
    dispatch(listPostDetails(id));
  }, [dispatch, id, successCommentCreate]);

  useEffect(() => {
    if (userInfo && userInfo._id === post.author._id) {
      setIsPostOwner(true);
    } else {
      setIsPostOwner(false);
    }
  }, [post, userInfo]);

  const renderComments = () => {
    if (post.comments.length === 0) {
      return <p>No comments</p>
    }

    return post.comments.map(comment => {
      return (
        <div className="comment" key={comment._id}>
          <div className="content">
            <Link to={`/${comment.author}/profile`} className="author">
              {comment.name}
            </Link>
            <div className="metadata">
              <span className="date">{comment.date.slice(0, 10)}</span>
            </div>
            <div className="text">
              {comment.body}
              {userInfo && userInfo._id === comment.author 
                ? <span 
                    style={{cursor: 'pointer', display: 'block', marginTop: '1rem'}}
                    onClick={onEditClick}
                  >
                    <strong>Edit Comment</strong>
                  </span>
                : ''}
            </div>
            <div id="edit-comment-form" style={{display: 'none'}}>
              <form className="ui reply form" onSubmit={e => onCommentEditFormSubmit(e, id, comment._id, editCommentBody)}>
                <div className="field">
                  <textarea
                    name="body"
                    value={editCommentBody}
                    onChange={e => setEditCommentBody(e.target.value)}
                  ></textarea>
                </div>
                <button className="ui button" type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {loading ? <Loader /> : error ? <Message type="warning">{error}</Message> : 
        <div>
          <div className="post-container">
            <h1 className="ui header">{post.title}</h1>
            <p>By: {post.author.name}</p>
            <div className='post-body' dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {isPostOwner && 
              <Link to={`/post/${post._id}/edit`}>
                <div>
                  <button className="ui button">Edit Post</button>
                </div>
              </Link>
            }
          </div>
          <div id="comments-area" className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            {renderComments()}
          </div>
          <h2>Post A Comment</h2>
          {errorCommentCreate && <Message type="warning">{errorCommentCreate}</Message>}
          {userInfo ? 
            <form className="ui reply form" onSubmit={onFormSubmit}>
              <div className="field">
                <textarea
                  name="body"
                  placeholder="Enter comment..."
                  value={body}
                  onChange={e => setBody(e.target.value)}
                ></textarea>
              </div>
              <button className="ui button" type="submit">Add Comment</button>
            </form> : <p>You must <Link to="/login">sign in</Link> to post a comment</p>
          }
        </div>
      }
    </div>
  );
};

export default PostScreen;
