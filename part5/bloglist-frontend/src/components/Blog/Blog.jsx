import React, { useState } from 'react';

import { BlogItem } from './BlogElements';

export const Blog = ({ blog, updateBlog, deleteBlog, loggedUser }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const { title, url, likes, author, user, id } = blog;

  const blogCreator = loggedUser.username === user.username;

  return (
    <div>
      {isHidden ? (
        <BlogItem>
          {title}
          <button onClick={toggleVisibility}>
            {isHidden ? 'view' : 'hide'}
          </button>
        </BlogItem>
      ) : (
        <BlogItem>
          <div>
            {title}
            <button onClick={toggleVisibility}>
              {isHidden ? 'view' : 'hide'}
            </button>
          </div>
          <div>{url}</div>
          <div>
            {likes}
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
