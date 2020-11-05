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

const Statistic = ({ countedClicks, total }) => {
  const { good, neutral, bad } = countedClicks;
  const averageFeedback = ((good - bad) / total).toFixed(2);
  const positiveFeedback = ((good / total) * 100).toFixed(2) + "%";

  if (total === 0) {
    return (
      <>
        <Header text="Statistic:" />
        <p>Be the first to leave a feedback</p>
      </>
    );
  }

  return (
    <div>
      <Header text="Statistic:" />
      <Display showClicks={good} text="good:" />
      <Display showClicks={neutral} text="neutral:" />
      <Display showClicks={bad} text="bad:" />
      <Display showClicks={total} text="total:" />
      <Display showClicks={averageFeedback} text="average feedback:" />
      <Display showClicks={positiveFeedback} text="positive feedback:" />
    </div>
  );
};

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

  return (
    <div>
      <Header text="Please leave your feedback" />
      <Button handleClick={() => onButtonClicked("good")} text="good" />
      <Button handleClick={() => onButtonClicked("neutral")} text="neutral" />
      <Button handleClick={() => onButtonClicked("bad")} text="bad" />
      <Statistic countedClicks={clicks} total={totalClicks} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
