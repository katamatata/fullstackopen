import React from 'react';
import { useDispatch } from 'react-redux';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Buttons = () => {
  const dispatch = useDispatch();

  const onButtonClicked = (action) => {
    dispatch({ type: action });
  };
  return (
    <div>
      <Button handleClick={() => onButtonClicked('GOOD')} text='good' />
      <Button handleClick={() => onButtonClicked('OK')} text='neutral' />
      <Button handleClick={() => onButtonClicked('BAD')} text='bad' />
      <Button handleClick={() => onButtonClicked('ZERO')} text='reset stats' />
    </div>
  );
};

export default Buttons;
