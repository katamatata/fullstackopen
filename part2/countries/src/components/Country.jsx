import React from 'react';

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country;
  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Languages:</p>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <div>
        <img style={{ width: '50%' }} src={flag} alt='Flag' />
      </div>
    </div>
  );
};

export default Country;
