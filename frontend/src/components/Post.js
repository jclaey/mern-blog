import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="item" key={post._id}>
      <i className="large middle aligned icon user"></i>
      <div className="content">
        <div className="description">
          <h2>{post.title}</h2>
          <p>By: {post.author.name}</p>
          <p>{post.content.slice(0, 250)}...</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
