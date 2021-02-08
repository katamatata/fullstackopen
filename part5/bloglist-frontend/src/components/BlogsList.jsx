import React from 'react';

import Blog from './Blog';

const BlogsList = ({ blogs, updateBlog, removeBlog, user }) => (
  <div>
    <h2>Blogs:</h2>

    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={removeBlog}
        loggedUser={user}
      />
    ))}
  </div>
);

export default BlogsList;
