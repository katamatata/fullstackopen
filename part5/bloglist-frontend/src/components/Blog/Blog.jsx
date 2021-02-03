import React, { useState } from 'react';

import { BlogItem } from './BlogElements';

export const Blog = ({ blog, deleteBlog, loggedUser }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const { title, url, likes, author, user } = blog;

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
            <button>like</button>
          </div>
          <div>{author}</div>

          {loggedUser.username === user.username && (
            <button onClick={() => deleteBlog(blog.id)}>delete</button>
          )}
        </BlogItem>
      )}
    </div>
  );
};
