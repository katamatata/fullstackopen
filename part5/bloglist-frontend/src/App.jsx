import React, { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import BlogsList from './components/BlogsList';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    isError: false,
    message: null,
  });

  const { isError, message } = notification;

  const showNotification = (message = '', isError = false) => {
    setNotification({
      isError: isError,
      message: message,
    });
    setTimeout(() => {
      setNotification({ ...notification, message: null });
    }, 3000);
  };

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = (username, password) => {
    loginService
      .login({ username, password })
      .then((loggedUser) => {
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(loggedUser)
        );
        blogService.setToken(loggedUser.token);
        setUser(loggedUser);
      })
      .catch((error) => showNotification('Wrong username or password', true));
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        showNotification(
          `A new blog '${returnedBlog.title}' by ${returnedBlog.author} added`,
          false
        );
      })
      .catch((error) => showNotification(`${error.response.data.error}`, true));
  };

  const updateBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, updatedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
        showNotification(
          `A blog '${returnedBlog.title}' by ${returnedBlog.author} was updated`,
          false
        );
      })
      .catch((error) => showNotification(`${error.response.data.error}`, true));
  };

  const removeBlog = (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);

    const confirmed = window.confirm(`Delete blog '${blogToDelete.title}'?`);

    if (confirmed) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id));
          showNotification(`Blog '${blogToDelete.title}' deleted`, false);
        })
        .catch((error) =>
          showNotification(`${error.response.data.error}`, true)
        );
    }
  };

  return (
    <div>
      <h1>Blogs App</h1>

      <Notification isError={isError} message={message} />

      {user === null ? (
        <LoginForm handleSubmit={handleLogin} />
      ) : (
        <div>
          <p>{user.name} is logged in</p>
          <button type='submit' onClick={handleLogout}>
            log out
          </button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogsList
            blogs={blogs}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
