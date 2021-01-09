const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).json({ error: 'Title is required' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  try {
    const savedBlog = await blog.save();
    response.json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
