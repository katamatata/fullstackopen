import React, { useState } from 'react';

import { BlogItem } from './BlogElements';

export const Blog = ({ blog }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      {isHidden ? (
        <BlogItem>
          {blog.title}
          <button onClick={toggleVisibility}>
            {isHidden ? 'view' : 'hide'}
          </button>
        </BlogItem>
      ) : (
        <BlogItem>
          <div>
            {blog.title}
            <button onClick={toggleVisibility}>
              {isHidden ? 'view' : 'hide'}
            </button>
          </div>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button>like</button>
          </div>
          <div>{blog.author}</div>
        </BlogItem>
      )}
    </div>
  );
};
