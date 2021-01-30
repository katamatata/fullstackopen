import React, { useState, useEffect } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    loginService
      .login({ username, password })
      .then((loggedUser) => {
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(loggedUser)
        );
        blogService.setToken(loggedUser.token);
        setUser(loggedUser);
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        setErrorMessage('Wrong username or password');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));
  };

  return (
    <div>
      <h1>Blogs App</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        <div>
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </div>
      ) : (
        <div>
          <p>{user.name} is logged in</p>
          <button type='submit' onClick={handleLogout}>
            log out
          </button>

          <BlogForm createBlog={addBlog} />

          <p>
            <strong>Blogs:</strong>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
