import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, showClicks }) => (
  <div>
    {text} {showClicks}
  </div>
);

const App = () => {
  const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0 });

  const onGoodClicked = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    };
    setClicks(newClicks);
  };

  const onNeutralClicked = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    };
    setClicks(newClicks);
  };

  const onBadClicked = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1
    };
    setClicks(newClicks);
  };

  return (
    <div>
      <Header text="Please leave your feedback" />
      <Button handleClick={onGoodClicked} text="good" />
      <Button handleClick={onNeutralClicked} text="neutral" />
      <Button handleClick={onBadClicked} text="bad" />
      <Header text="Statistic:" />
      <Display showClicks={clicks.good} text="good:" />
      <Display showClicks={clicks.neutral} text="neutral:" />
      <Display showClicks={clicks.bad} text="bad:" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
