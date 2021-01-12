const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title && !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: !body.likes ? 0 : body.likes,
  });

  const savedBlog = await blog.save();
  response.json(savedBlog);
});

module.exports = blogsRouter;