const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

// const initialBlogs = [
//   {
//     title: 'Test',
//     author: 'Test',
//     url: 'https://www.test.com/',
//     likes: '0',
//   },
//   {
//     title: 'Test2',
//     author: 'Test2',
//     url: 'https://www.test.com/',
//     likes: '0',
//   },
// ];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(helper.initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(helper.initialBlogs[1]);
  await blogObj.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');
  const contents = response.body.map((r) => r.title);
  expect(contents).toContain('Test');
});

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'https://www.new-test.com/',
    likes: '0',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((b) => b.title);
  expect(contents).toContain('New Blog');
});

// test('a blog without title is not added', async () => {
//   const newBlog = {
//     author: 'New Author',
//     url: 'https://www.new-test.com/',
//     likes: '0',
//   };

//   await api.post('/api/blogs').send(newBlog).expect(400);

//   const blogsAtEnd = await helper.blogsInDb();
//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
// });

afterAll(() => {
  mongoose.connection.close();
});
