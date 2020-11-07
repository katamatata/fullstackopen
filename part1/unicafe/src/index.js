import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const TableRow = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistic = ({ countedClicks, total }) => {
  const { good, neutral, bad } = countedClicks;
  const averageFeedback = ((good - bad) / total).toFixed(1);
  const positiveFeedback = ((good / total) * 100).toFixed(1) + "%";

  const isNoFeedbackGiven = total === 0;

  return (
    <div>
      <Header text="Statistic:" />
      {isNoFeedbackGiven ? (
        <p>Be the first to leave a feedback</p>
      ) : (
        <table>
          <tbody>
            <TableRow value={good} text="good:" />
            <TableRow value={neutral} text="neutral:" />
            <TableRow value={bad} text="bad:" />
            <TableRow value={total} text="total:" />
            <TableRow value={averageFeedback} text="average feedback:" />
            <TableRow value={positiveFeedback} text="positive feedback:" />
          </tbody>
        </table>
      )}
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
