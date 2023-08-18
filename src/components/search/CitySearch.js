import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
//import { API_KEY } from '../../secret.js';
import Forecast from '../forecast/Forecast.js';
import CurrentWeather from '../current-weather/CurrentWeather.js';
import './CitySearch.css';

const CitySearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');

  const searchData = async (e) => {
    e.preventDefault(); // prevenim actiunea implicita a unei forme de a trimite un request
    setInputValue(''); // curatarea bara de cautare dupa apasarea butonului 
    try {
      setError('');
      const results = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(results.data); // colectam datele care vin de la API si le stocam in variabila weatherData
    } catch (error) {
      setError(error.response.data.message);
      setWeatherData([]);
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ maxWidth: '70%', margin: '0 auto' }}>
        <form onSubmit={(e) => searchData(e)}>
          <InputGroup className='m-5'>
            <Form.Control
              type='text'
              placeholder='Search for a city'
              aria-label='Search for a city'
              aria-describedby='basic-addon2'
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              className='search-input'
            />
            <Button type='submit' className='btn btn-dark'>
              Search
            </Button>
          </InputGroup>
        </form>
      </div>
      {error ? (
        <h3
          style={{ maxWidth: '60%', margin: '0 auto' }}
          className='error-message'
        >
          {error.toUpperCase()}
        </h3>
      ) : null}
      {weatherData.list && weatherData.list.length > 0 ? (
        <>
          <CurrentWeather
            weatherData={weatherData.list[0]}
            city={weatherData}
          />
          <Forecast weatherData={weatherData} />
        </>
      ) : null}
    </>
  );
};

export default CitySearch;
