import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './forecast.css';
import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
function Forecast({ weatherData }) {
  const [data, setData] = useState(weatherData);

  useEffect(() => {
    setData(weatherData);
  }, [weatherData]);

  const groupedForecast =
    data.list && data.list.length > 0
      ? data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000);

          // Specify the desired date format: 'MM/DD/YYYY'
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(date);
          if (!acc[formattedDate]) {
            acc[formattedDate] = [];
          }

          acc[formattedDate].push(item);
          return acc;
        }, {})
      : {};

  function downloadForecastData(data) {
    let csvContent =
      'Date,Time,Temperature (°C),Description,Pressure (hPa),Humidity (%),Wind speed (m/s),Feels like (°C)\n';

    Object.entries(data).forEach(([date, forecastItems]) => {
      forecastItems.forEach((item) => {
        const time = new Date(item.dt * 1000).toLocaleTimeString();
        const temperature = item.main.temp;
        const description = item.weather[0].description;
        const pressure = item.main.pressure;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;
        const feelsLike = Math.round(item.main.feels_like);

        csvContent += `${date},${time},${temperature},${description},${pressure},${humidity},${windSpeed},${feelsLike}\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'weather_forecast.csv';
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Accordion
        allowZeroExpanded
        style={{
          margin: '0 auto',
          maxWidth: '90vw',
        }}
      >
        {Object.keys(groupedForecast).map((date) => (
          <AccordionItem key={date}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div
                  className='daily-item'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <label className='day'>
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </label>
                  <label className='description'></label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <table className='weather-table'>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Temperature (°C)</th>
                    <th>Description</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                    <th>Wind speed</th>
                    <th>Feels like</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {groupedForecast[date].map((item, index) => (
                    <tr key={index}>
                      <td>{new Date(item.dt * 1000).toLocaleTimeString()}</td>
                      <td>{item.main.temp}</td>
                      <td>{item.weather[0].description}</td>
                      <td>{item.main.pressure} hPa</td>
                      <td>{item.main.humidity} %</td>
                      <td>{item.wind.speed} m/s</td>
                      <td>{Math.round(item.main.feels_like)} °C</td>
                      <td>
                        <img
                          src={`icons/${item.weather[0].icon}.png`}
                          alt='weather'
                          className='icon-small'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type='submit'
          className='btn btn-dark'
          onClick={() => downloadForecastData(groupedForecast)}
          style={{
            marginRight: '90px',
            maxWidth: '90vw',
          }}
        >
          Download Data
        </Button>
      </div>
    </>
  );
}
export default Forecast;
