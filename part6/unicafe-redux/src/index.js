import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

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
  const countedGood = store.getState().good;
  const countedNeutral = store.getState().ok;
  const countedBad = store.getState().bad;

  const total = countedGood + countedNeutral + countedBad;

  const averageFeedback = ((countedGood - countedBad) / total).toFixed(1);

  const positiveFeedback = ((countedGood / total) * 100).toFixed(1) + '%';

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
              <TableRow text='good:' value={countedGood} />
              <TableRow text='neutral:' value={countedNeutral} />
              <TableRow text='bad:' value={countedBad} />
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
  const onButtonClicked = (action) => {
    store.dispatch({ type: action });
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

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
