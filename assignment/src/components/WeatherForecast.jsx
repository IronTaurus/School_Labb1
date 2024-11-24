import React, { useState, useEffect} from "react";
import '../CSS/WeatherForecast.css';




const WeatherForecast = () => {
  const APIkey = "79656390dff6fed4935e0fe63bb66ad4" 
  const cities = ['Gävle', 'Göteborg', 'Stockholm', 'Uppsala', 'Malmö', 'Linköping', 'Västerås', 'Örebro', 'Umeå', 'Norrköping', 'Östersund', 'Alfta']
  const [firstForecast, setForecast]= useState()
  const [currentCity, setCity]= useState("Gävle")
  const [cityMenu, openMenu]= useState(false)

    const getForecasts = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${APIkey}`
          );
          const result = await response.json();
          console.log(result)
          return result;
        } catch (error) {
          console.error(error);
        }
    };

    const getTodaysForecast = async () => {
        const forecasts = await getForecasts();
        const todaysForecast = forecasts.list[0];
        console.log(todaysForecast);
        return todaysForecast;
    };
    const setCurrentCity = (city) => {
      setCity(city);
      getTodaysForecast().then( res => setForecast(res))
    }

    useEffect(() => {
      getTodaysForecast().then( res => setForecast(res))
    },[])

    return(
    <>
    <div className="city-box" onMouseEnter={() => openMenu(true)} onMouseLeave={() => openMenu(false)}>
      <div className="current-city" >{currentCity}</div>
      <ul className={`cities-droplist ${cityMenu ? 'cities-open' : 'cities-closed'}`}>
          {cities.map((city, index) => <li key={index} className="city" onClick={()=> setCurrentCity(city)}>{city}</li>)}
      </ul>
    </div>
    
    {firstForecast ? <div className="weather-forecast">
      <img src={`http://openweathermap.org/img/wn/${firstForecast.weather[0].icon}@2x.png`} alt="weather_icon" className="wIcon"></img>
      <div className='temperatures'> The current weather is {firstForecast.weather[0].description}.</div>
      <div className='temperatures'>
        The temperature is from
        {/* Gives the temperature converted to Celcius from Kelvin */}
        <div className='temp min'>{parseFloat(firstForecast.main.temp_min -273.15).toFixed(2)+"°C"}.</div>
        to
        <div className='temp max'>{parseFloat(firstForecast.main.temp_max -273.15).toFixed(2)+"°C"} </div>   
      </div>
    </div> : <></>}
    </>
    )
    
    
}
export default WeatherForecast;