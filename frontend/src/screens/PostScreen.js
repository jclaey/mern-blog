import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  listPostDetails,
  createComment,
  updatePostComment
} from '../actions/postActions';
import { POST_CREATE_COMMENT_RESET, POST_DELETE_COMMENT_RESET } from '../constants/postConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PostScreen = () => {
  const [body, setBody] = useState('');
  const [editCommentBody, setEditCommentBody] = useState('');
  const [hasUpdatedComment, setHasUpdatedComment] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [isPostOwner, setIsPostOwner] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, post } = useSelector(state => state.postDetails);
  const { userInfo } = useSelector(state => state.userLogin);
  const { 
    error: errorCommentCreate,
    success: successCommentCreate
  } = useSelector(state => state.postCommentCreate);
  const {
    error: errorCommentUpdate,
    success: successCommentUpdate,
    updatedComment
  } = useSelector(state => state.postCommentUpdate);
  const { error: errorPostDelete } = useSelector(state => state.postDelete);
  const { success: successCommentDelete } = useSelector(state => state.postCommentDelete);

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(createComment(id, body));
  };

  const editCommentForm = document.querySelector('#edit-comment-form');

  const onEditClick = () => {
    editCommentForm.style.display = 'block';
  };

  const onCommentEditFormSubmit = (e, postId, commentId, commentBody) => {
    e.preventDefault();
    dispatch(updatePostComment(postId, commentId, commentBody));
    if (hasUpdatedComment) {
      setHasUpdatedComment(false);
    }
  };

  useEffect(() => {
    if (successCommentCreate) {
      setBody('');
      dispatch({ type: POST_CREATE_COMMENT_RESET });
    }

    if (successCommentDelete) {
      dispatch({ type: POST_DELETE_COMMENT_RESET });
    }

    dispatch(listPostDetails(id));
  }, [dispatch, id, successCommentCreate, successCommentDelete]);

  useEffect(() => {
    if (userInfo && userInfo._id === post.author._id) {
      setIsPostOwner(true);
    } else {
      setIsPostOwner(false);
    }

    if (userInfo && post.comments.find(comment => comment.author === userInfo._id)) {
      setHasCommented(true);
    } else {
      setHasCommented(false);
    }
  }, [post, userInfo]);

  useEffect(() => {
    if (updatedComment && updatedComment.name) {
      setHasUpdatedComment(true);
    }
  }, [updatedComment]);

  const renderComments = () => {
    if (post.comments.length === 0) {
      return <p>No comments</p>
    } else {
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
                  ? <div style={{marginTop: '0.5rem'}}>
                      <span 
                          style={{cursor: 'pointer', display: 'inline', marginTop: '1rem'}}
                          onClick={onEditClick}
                        >
                          <strong>Edit Comment</strong>
                        </span>
                        <Link to={`/post/${post._id}/comments/${comment._id}/delete`}>
                          <span 
                            style={{
                              cursor: 'pointer', 
                              display: 'inline', 
                              marginTop: '1rem', 
                              color: 'red', 
                              paddingLeft: '10px'
                            }}
                          >
                          <strong>Delete Comment</strong>
                        </span>
                      </Link>
                    </div>
                  : ''}
              </div>
              <div id="edit-comment-form" style={{display: 'none'}}>
                {errorCommentUpdate && <Message type="warning">{errorCommentUpdate}</Message>}
                {successCommentUpdate && <Message type="success">Comment updated</Message>}
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
    }
  };

  return (
    <div>
      {loading ? <Loader /> : error ? <Message type="warning">{error}</Message> : 
        <div>
          <div className="post-container">
            {post.image && <img className='ui fluid image' src={post.image.path} alt={`${post.title} showcase`} />}
            {errorPostDelete && <Message type="warning">{errorPostDelete}</Message>}
            <h1 className="ui header">{post.title}</h1>
            <p>By: {post.author.name}</p>
            <div className='post-body' dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {isPostOwner && 
              <div>
                <Link to={`/post/${post._id}/edit`}>
                  <button className="ui button">Edit Post</button>
                </Link>
                <Link to={`/post/${id}/delete`}>
                  <button className="ui red button">Delete Post</button>
                </Link>
              </div>
            }
          </div>
          <div id="comments-area" className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            <div id="rendered-comments">
              {hasUpdatedComment ? 
                <div className="comment" key={updatedComment._id}>
                  <div className="content">
                    <Link to={`/${updatedComment.author}/profile`} className="author">
                      {updatedComment.name}
                    </Link>
                    <div className="metadata">
                      <span className="date">{updatedComment.date.slice(0, 10)}</span>
                    </div>
                    <div className="text">
                      {updatedComment.body}
                      {userInfo && userInfo._id === updatedComment.author 
                        ? <div>
                            <span 
                              style={{cursor: 'pointer', display: 'block', marginTop: '1rem'}}
                              onClick={onEditClick}
                            >
                              <strong>Edit Comment</strong>
                            </span>
                            <Link to={`/post/${post._id}/comments/${updatedComment._id}/delete`}>
                              <span 
                                style={{
                                  cursor: 'pointer', 
                                  display: 'inline', 
                                  marginTop: '1rem', 
                                  color: 'red', 
                                  paddingLeft: '10px'
                                }}
                              >
                                <strong>Delete Comment</strong>
                              </span>
                            </Link>
                          </div>
                        : ''}
                    </div>
                    <div id="edit-comment-form" style={{display: 'none'}}>
                      {errorCommentUpdate && <Message type="warning">{errorCommentUpdate}</Message>}
                      <form className="ui reply form" onSubmit={e => onCommentEditFormSubmit(e, id, updatedComment._id, editCommentBody)}>
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
              : renderComments()}
            </div>
          </div>
          <h2>Post A Comment</h2>
          {errorCommentCreate && <Message type="warning">{errorCommentCreate}</Message>}
          {userInfo && !hasCommented ? 
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
            </form> : userInfo && hasCommented ? <p>You have already commented on this post</p> : <p>You must <Link to="/login">sign in</Link> to post a comment</p>
          }
        </div>
      }
    </div>
  );
};

export default PostScreen;
