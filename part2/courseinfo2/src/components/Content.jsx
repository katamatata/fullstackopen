import React from 'react';

import Part from './Part';

const Content = ({ content }) => {
  console.log(content);

  return (
    <div>
      {content.map(({ id, name, exercises }) => {
        return <Part key={id} text={name} exercises={exercises} />;
      })}
    </div>
  );
};

export default Content;
