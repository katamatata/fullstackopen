import React from 'react';

import Blog from './Blog';

const BlogsList = ({ blogs, updateBlog, removeBlog, user }) => {
  const sortedByLikes = blogs.sort((a, b) => a.likes - b.likes);

  return (
    <div>
      <h2>Blogs:</h2>

      {sortedByLikes.map((blog) => (
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
};

export default BlogsList;
