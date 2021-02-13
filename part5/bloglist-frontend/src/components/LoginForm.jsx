import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logIn = (event) => {
    event.preventDefault();

    handleSubmit(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={logIn}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>

        <div>
          <button id='login-button' type='submit'>
            login
          </button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
