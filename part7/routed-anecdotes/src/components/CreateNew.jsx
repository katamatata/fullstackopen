import React from 'react';
import { useHistory } from 'react-router-dom';

import { useField } from '../hooks';

const CreateNew = (props) => {
  const content = useField();
  const author = useField();
  const info = useField();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
    };
    props.addNew({ ...newAnecdote, votes: 0 });
    history.push('/');
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
