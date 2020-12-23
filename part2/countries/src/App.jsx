import React, { useState } from 'react';

import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [search, setSearch] = useState('');

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Find countries</h1>
      <Filter
        searchInputValue={search}
        handleSearchChange={handleSearchInputChange}
      />
      <Countries search={search} />
    </div>
  );
};

export default App;
