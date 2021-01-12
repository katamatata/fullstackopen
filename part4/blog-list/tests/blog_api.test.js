const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(helper.initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(helper.initialBlogs[1]);
  await blogObj.save();
});

describe('when there is initially some blogs saved', () => {
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

  test('id of the blog is defined', async () => {
    const response = await api.get('/api/blogs');
    const contents = response.body.map((r) => r.id);
    expect(contents).toBeDefined();
  });
});

describe('adding a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'https://www.new-test.com/',
      likes: '2',
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

  test('if the likes property of blog is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Blog With No Likes',
      author: 'New Author',
      url: 'https://www.new-test.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).toContain('Blog With No Likes');
  });

  test('fails with status code 400 if data is invalid', async () => {
    const newBlog = {
      author: 'New Author',
      likes: '3',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('viewing a single blog', () => {
  test('succeeds with a valid ID', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();

    console.log(validNonExistingId);

    await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
  });

  test('fails with status code 400 if ID is invalid', async () => {
    const invalidId = '5ffdaa45521aba19d363ab5';

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
