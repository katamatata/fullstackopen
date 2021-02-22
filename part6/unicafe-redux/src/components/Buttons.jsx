import React from 'react';
import { useDispatch } from 'react-redux';

import { addGood, addNeutral, addBad, resetStats } from '../actions';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Buttons = () => {
  const dispatch = useDispatch();

  const handleAddGood = () => {
    dispatch(addGood);
  };

  const handleAddNeutral = () => {
    dispatch(addNeutral);
  };

  const handleAddBad = () => {
    dispatch(addBad);
  };

  const handleResetStats = () => {
    dispatch(resetStats);
  };

  return (
    <div>
      <Button handleClick={handleAddGood} text='good' />
      <Button handleClick={handleAddNeutral} text='neutral' />
      <Button handleClick={handleAddBad} text='bad' />
      <Button handleClick={handleResetStats} text='reset stats' />
    </div>
  );
};

export default Buttons;
