import React from 'react';

import Part from './Part';

const Content = ({ content }) => {
  const total = content.reduce((acc, num) => acc + num.exercises, 0);

  return (
    <div>
      {content.map(({ id, name, exercises }) => {
        return <Part key={id} text={name} exercises={exercises} />;
      })}
      <p>Total of {total} exercises</p>
    </div>
  );
};

export default Content;
