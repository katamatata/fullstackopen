import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const TableRow = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistic = () => {
  const feedback = useSelector((state) => state);
  console.log(feedback);

  const { good, ok, bad } = feedback;

  const total = good + ok + bad;
  const averageFeedback = ((good - bad) / total).toFixed(1);
  const positiveFeedback = ((good / total) * 100).toFixed(1) + '%';

  const isNoFeedbackGiven = total === 0;

  return (
    <div>
      {isNoFeedbackGiven ? (
        <p>Be the first to leave a feedback.</p>
      ) : (
        <div>
          <Header text='Statistic:' />

          <table>
            <tbody>
              <TableRow text='good:' value={good} />
              <TableRow text='neutral:' value={ok} />
              <TableRow text='bad:' value={bad} />
              <TableRow text='total:' value={total} />
              <TableRow text='average feedback:' value={averageFeedback} />
              <TableRow text='positive feedback:' value={positiveFeedback} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const onButtonClicked = (action) => {
    dispatch({ type: action });
  };

  return (
    <div>
      <Header text='Please leave your feedback' />
      <Button handleClick={() => onButtonClicked('GOOD')} text='good' />
      <Button handleClick={() => onButtonClicked('OK')} text='neutral' />
      <Button handleClick={() => onButtonClicked('BAD')} text='bad' />
      <Button handleClick={() => onButtonClicked('ZERO')} text='reset stats' />
      <Statistic />
    </div>
  );
};

export default App;
