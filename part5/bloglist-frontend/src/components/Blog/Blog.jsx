import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { BlogItem } from './BlogElements';

export const Blog = ({ blog, updateBlog, deleteBlog, loggedUser }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const { title, url, likes, author, user, id } = blog;

  const blogCreator = loggedUser.username === user.username;

  return (
    <div data-testid='blog'>
      {isHidden ? (
        <BlogItem>
          {title} by {author}
          <button onClick={toggleVisibility}>
            {isHidden ? 'view' : 'hide'}
          </button>
        </BlogItem>
      ) : (
        <BlogItem data-testid='details'>
          <div>
            {title}
            <button onClick={toggleVisibility}>
              {isHidden ? 'view' : 'hide'}
            </button>
          </div>
          <div>{url}</div>
          <div>
            Likes: {likes}
            <button onClick={() => updateBlog(id)}>like</button>
          </div>
          <div>{author}</div>

          {blogCreator && (
            <button onClick={() => deleteBlog(id)}>delete</button>
          )}
        </BlogItem>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
};
