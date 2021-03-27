import React from 'react';
import { useHistory } from 'react-router-dom';

import { useField } from '../hooks';

const CreateNew = (props) => {
  const { reset: resetContent, ...restContent } = useField();
  const { reset: resetAuthor, ...restAuthor } = useField();
  const { reset: resetInfo, ...restInfo } = useField();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdote = {
      content: restContent.value,
      author: restAuthor.value,
      info: restInfo.value,
    };
    props.addNew({ ...newAnecdote, votes: 0 });
    history.push('/');
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...restContent} />
        </div>
        <div>
          author
          <input {...restAuthor} />
        </div>
        <div>
          url for more info
          <input {...restInfo} />
        </div>
        <button type='submit'>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
