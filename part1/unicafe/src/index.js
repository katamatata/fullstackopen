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
  const [totalClicks, setTotalClicks] = useState(0);

  const onButtonClicked = (count) => {
    const newCount = {
      ...clicks,
      [count]: clicks[count] + 1
    };
    setClicks(newCount);
    setTotalClicks(totalClicks + 1);
  };

  const averageFeedback = ((clicks.good - clicks.bad) / totalClicks).toFixed(2);
  const positiveFeedback = ((clicks.good / totalClicks) * 100).toFixed(2) + "%";

  return (
    <div>
      <Header text="Please leave your feedback" />
      <Button handleClick={() => onButtonClicked("good")} text="good" />
      <Button handleClick={() => onButtonClicked("neutral")} text="neutral" />
      <Button handleClick={() => onButtonClicked("bad")} text="bad" />
      <Header text="Statistic:" />
      <Display showClicks={clicks.good} text="good:" />
      <Display showClicks={clicks.neutral} text="neutral:" />
      <Display showClicks={clicks.bad} text="bad:" />
      <Display showClicks={totalClicks} text="total:" />
      <Display showClicks={averageFeedback} text="average feedback:" />
      <Display showClicks={positiveFeedback} text="positive feedback:" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
