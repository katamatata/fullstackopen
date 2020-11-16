import React from 'react';

import Part from './Part';

const Content = ({ parts = [] }) => {
  const totalNum = parts.reduce((acc, num) => acc + num.exercises, 0);

  return (
    <div>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} text={`${name}`} exercises={exercises} />
      ))}
      <p>
        <strong>Total of {totalNum} exercises</strong>
      </p>
    </div>
  );
};

export default Content;
