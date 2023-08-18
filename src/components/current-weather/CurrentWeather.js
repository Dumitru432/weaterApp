import './CurrentWeather.css';

function CurrentWeather({ weatherData, city }) {
  return (
    <div className='weather'>
      <div className='top'>
        <div>
          <p className='city'>{city.city.name}, {city.city.country} </p>
          <p className='weather-description'>{weatherData.weather[0].description}</p>
        </div>
        <img
          alt='weather'
          className='weather-icon'
          src={`icons/${weatherData.weather[0].icon}.png`}
        />
      </div>
      <div className='bottom'>
        <p className='temperature'>{Math.round(weatherData.main.temp)}°C</p>
        <div className='details'>
          <div className='parameter-row'>
            <span className='parameter-label'>Details</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Feels like: </span>
            <span className='parameter-value'>
              {Math.round(weatherData.main.feels_like)} °C
            </span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Wind: </span>
            <span className='parameter-value'>{weatherData.wind.speed} m/s</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Humidity: </span>
            <span className='parameter-value'>{weatherData.main.humidity} %</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Pressure: </span>
            <span className='parameter-value'>{weatherData.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CurrentWeather;
