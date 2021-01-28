import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    loginService
      .login({ username, password })
      .then((returnedUser) => {
        setUser(returnedUser);
        setUsername('');
        setPassword('');
      })
      .catch((error) => console.log(error.response.data));
  };

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='Username'
              value={username}
              onChange={handleUsernameInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='text'
              id='password'
              name='Password'
              value={password}
              onChange={handlePasswordInputChange}
            ></input>
          </div>
          <div>
            <button type='submit'>login</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} is logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
