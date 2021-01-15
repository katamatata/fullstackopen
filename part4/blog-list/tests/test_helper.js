const Blog = require('../models/blog');
const User = require('../models/user');

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
    title: 'Non-Existing Blog',
    author: 'New Author',
    url: 'https://www.new-test.com/',
    likes: '105',
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
