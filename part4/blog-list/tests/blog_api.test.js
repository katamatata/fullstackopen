const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   let blogObj = new Blog(helper.initialBlogs[0]);
//   await blogObj.save();
//   blogObj = new Blog(helper.initialBlogs[1]);
//   await blogObj.save();
// });

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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
    // console.log(validNonExistingId);

    await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
  });

  test('fails with status code 400 if ID is invalid', async () => {
    const invalidId = '5ffdaa45521aba19d363ab5';

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('interactions with api with token authentication', () => {
  let loggedInToken = '';

  beforeEach(async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200);

    loggedInToken = response.body.token;
  });

  describe('adding a new blog', () => {
    test('succeeds with valid data and valid token', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'https://www.new-test.com/',
        likes: '2',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
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
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((b) => b.title);
      expect(contents).toContain('Blog With No Likes');
    });

    test('fails with status code 400 if data is invalid and token provided', async () => {
      const newBlog = {
        author: 'New Author',
        likes: '3',
      };

      const result = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('Title and URL are required');

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test('fails with status code 401 if NO token provided', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'https://www.new-test.com/',
        likes: '2',
      };

      await api.post('/api/blogs').send(newBlog).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('deletion of one blog', () => {
    let blogToDelete = {};

    beforeEach(async () => {
      const blog = {
        title: 'Blog to delete',
        author: 'Author',
        url: 'https://www.test.com/',
        likes: '2',
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      blogToDelete = response.body;
    });

    test('succeeds with status code 204 if ID is valid and token provided', async () => {
      const blogsAtStart = await helper.blogsInDb();

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${loggedInToken}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const contents = blogsAtEnd.map((r) => r.title);
      expect(contents).not.toContain(blogToDelete.title);
    });

    test('fails with status code 401 if NO token provided', async () => {
      const blogsAtStart = await helper.blogsInDb();

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });
  });

  describe('updating data in the blog', () => {
    test('succeeds with valid ID', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      blogToUpdate.likes = 1000; //updating likes property of the blog

      const resultBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(resultBlog.body).toEqual(blogToUpdate);

      const blogsAtEnd = await helper.blogsInDb();

      const updatedBlog = blogsAtEnd.find((b) => b.likes);
      expect(updatedBlog.likes).toEqual(blogToUpdate.likes);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
