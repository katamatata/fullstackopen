import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const COUNTRIES_API = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

  useEffect(() => {
    if (!name) {
      return null;
    }

    axios
      .get(COUNTRIES_API)
      .then((response) => {
        setCountry({ ...response.data[0], found: true });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setCountry({ found: false });
        }
        console.log('error', error.response.data);
      });
  }, [name]);

  return country;
};
