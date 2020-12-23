import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Country from './Country';
import CountriesList from './CountriesList';

const Countries = ({ search }) => {
  const [countries, setCountries] = useState([]);

  const COUNTRIES_API = 'https://restcountries.eu/rest/v2/all';

  useEffect(() => {
    axios
      .get(COUNTRIES_API)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (search === '') return null;

  if (filteredCountries.length === 0) return <p>No matches found.</p>;

  if (filteredCountries.length > 10)
    return <p>Too many matches, please specify your search.</p>;

  return (
    <div>
      {filteredCountries.length > 1 ? (
        <CountriesList filteredList={filteredCountries} />
      ) : (
        <Country country={filteredCountries[0]} />
      )}
    </div>
  );
};

export default Countries;
