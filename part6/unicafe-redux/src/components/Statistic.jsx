import React from 'react';
import { useSelector } from 'react-redux';

import { getGood, getNeutral, getBad } from '../selectors';

import Header from './Header';

const TableRow = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistic = () => {
  const good = useSelector(getGood);
  const neutral = useSelector(getNeutral);
  const bad = useSelector(getBad);

  const total = good + neutral + bad;
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
              <TableRow text='neutral:' value={neutral} />
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

export default Statistic;
