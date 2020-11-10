import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => (
  <h1>{text}</h1>
);

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);

const Content = ({ chapter }) => (
  <div>
    <Part name={chapter[0].name} exercises={chapter[0].exercises} />
    <Part name={chapter[1].name} exercises={chapter[1].exercises} />
    <Part name={chapter[2].name} exercises={chapter[2].exercises} />
  </div>
);

const Total = ({ number }) => (
  <p>Number of exercises {number[0].exercises + number[1].exercises + number[2].exercises}</p>
); 

const App = () => {
  const course = {
    title: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const {title, parts} = course;

  return (
    <div>
      <Header text={title} />
      <Content chapter={parts} />
      <Total number={parts} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
