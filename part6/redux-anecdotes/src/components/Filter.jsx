import React from 'react';
import { useDispatch } from 'react-redux';

import { filterChange } from '../actions/actions';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const userInput = event.target.value;
    dispatch(filterChange(userInput));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <label htmlFor='search'>Search:</label>
      <input name='search' onChange={handleChange} />
    </div>
  );
};

export default Filter;
