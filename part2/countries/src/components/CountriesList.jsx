import React, { useState } from 'react';

import Country from './Country';

const CountriesList = ({ filteredList }) => {
  const [selected, setSelected] = useState({});
  const [showSelected, setShowSelected] = useState(false);

  const onShowClicked = (id) => {
    const selectedCountry = filteredList.find(
      (country) => country.alpha3Code === id
    );
    setSelected(selectedCountry);
    setShowSelected(true);
  };

  return (
    <div>
      {filteredList.map((country) => (
        <p key={country.name}>
          {country.name}
          <button onClick={() => onShowClicked(country.alpha3Code)}>
            show
          </button>
        </p>
      ))}
      {showSelected && <Country country={selected} />}
    </div>
  );
};

export default CountriesList;
