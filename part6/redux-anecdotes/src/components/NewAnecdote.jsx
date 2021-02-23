import React from 'react';

import Subtitle from './Subtitle';

const NewAnecdote = () => {
  return (
    <div>
      <Subtitle text='create new' />
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default NewAnecdote;
