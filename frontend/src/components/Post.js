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
          <p>By: {post.author.name}</p>
          <div>
            {post.content.slice(0, 250)}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
