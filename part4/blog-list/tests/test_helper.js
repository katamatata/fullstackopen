const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Test',
    author: 'Test',
    url: 'https://www.test.com/',
    likes: '1',
  },
  {
    title: 'Test2',
    author: 'Test2',
    url: 'https://www.test.com/',
    likes: '2',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'New Blog',
    author: 'New Author',
    url: 'https://www.new-test.com/',
    likes: '1',
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
