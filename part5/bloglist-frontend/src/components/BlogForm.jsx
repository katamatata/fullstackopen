import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({ title: newTitle, author: newAuthor, url: newUrl });
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            name='Title'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author:</label>
          <input
            type='text'
            id='author'
            name='Author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>URL:</label>
          <input
            type='text'
            id='url'
            name='Url'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>

        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default BlogForm;
