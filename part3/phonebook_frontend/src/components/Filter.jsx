import React from 'react';

const Filter = ({ searchInputValue, handleSearchChange }) => {
  return (
    <div>
      <label htmlFor='search'>Search by Name: </label>
      <input
        id='search'
        name='search'
        value={searchInputValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Filter;
