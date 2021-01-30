import React from 'react';

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <>
    <h2>Log in to application</h2>

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name='Username'
          value={username}
          onChange={handleUsernameChange}
        ></input>
      </div>

      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          id='password'
          name='Password'
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </div>

      <div>
        <button type='submit'>login</button>
      </div>
    </form>
  </>
);

export default LoginForm;
