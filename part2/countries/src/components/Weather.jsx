import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const api_key = process.env.REACT_APP_API_KEY;
  const WEATHER_API = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;

  useEffect(() => {
    //setting loading to true here and adding props capital to dependencies []
    //allows us to update weather info in the Country component each time when user clicks
    //on 'show' button to see info and weather of the country when the names of multiple countries are shown
    setLoading(true);
    axios
      .get(WEATHER_API)
      .then((response) => {
        setWeather(response.data.current);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [capital]);

  const { temperature, weather_icons, wind_speed, wind_dir } = weather;

  return (
    <div>
      <strong>Weather in {capital}</strong>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Temperature: {temperature}°C</p>
          <img src={weather_icons[0]} alt='Weather icon' />
          <p>Wind: {wind_speed} mph</p>
          <p>Wind direction: {wind_dir}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
