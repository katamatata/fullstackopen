import React from 'react';

import Title from './Title';
import Header from './Header';
import Content from './Content';

const Course = ({ title = '', courses = [] }) => (
  <div>
    <Title text={`${title}`} />
    {courses.map(({ id, name, parts }) => (
      <div key={id}>
        <Header title={`${name}`} />
        <Content parts={parts} />
      </div>
    ))}
  </div>
);

export default Course;
