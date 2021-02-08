import React from 'react';
import PropTypes from 'prop-types';

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

BlogsList.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogsList;
