import React from 'react';

const Part = ({ text = '', exercises = 0 }) => (
  <p>
    {`${text}`} {exercises}
  </p>
);

export default Part;
