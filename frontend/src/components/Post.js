import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="item" key={post._id}>
      <div className="content">
        <div className="description">
          <Link to={`/post/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>Posted on: {post.createdAt.slice(0, 10)}</p>
          <p>By: {post.author.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
