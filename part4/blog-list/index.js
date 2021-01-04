require('dotenv').config();
const express = require('express');
const app = express();
const Blog = require('./models/blog');
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());

morgan.token('data', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :data')
);

app.use(cors());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
