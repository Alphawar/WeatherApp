import './App.css';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import PopUp from './components/PopUp/PopUp';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import { getCitiesAndCountries, getCityWeather } from './API/requests';
import {AnimatePresence} from 'framer-motion';

function App() {

  const [isPopUpActive, setIsPopUpActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [dailyWeekWeather, setDailyWeekWeather] = useState({});
  const [weeksDayWeather, setWeeksDayWeather] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [twoWeeksForecast, setTwoWeeksForecast] = useState(null);
  
  useEffect( () => {
    getCitiesAndCountries(setCities, setCurrentWeather, setCountries, setDailyWeekWeather, setChartData, setIsLoaded, setTwoWeeksForecast);
  }, [])

  useEffect( () => {
    if(selectedCity){
      getCityWeather(setCurrentWeather, setIsLoaded, cities, selectedCity, setDailyWeekWeather, setChartData, setTwoWeeksForecast);
    }
  }, [selectedCity])

  useEffect( () => {
    if(isPopUpActive){  
      document.body.style.overflowY = 'hidden'
    }else {
      document.body.style.overflowY = ''
    }
  }, [isPopUpActive])

  return (
    <>
        <AnimatePresence>
        {isPopUpActive && <PopUp 
          weeksDayWeather={weeksDayWeather} 
          setIsPopUpActive={setIsPopUpActive}
          currentWeather={currentWeather}
        />}
        </AnimatePresence>
        <div className="container">
          <Header 
            isLoaded={isLoaded}
            cities={cities} 
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry} 
            setSelectedCity={setSelectedCity}
          />
          {isLoaded ? <Loader /> :
            <HomePage 
              setIsPopUpActive={setIsPopUpActive}
              currentWeather={currentWeather}
              dailyWeekWeather={dailyWeekWeather}
              setWeeksDayWeather={setWeeksDayWeather}
              chartData={chartData}
              twoWeeksForecast={twoWeeksForecast}
              selectedCity={selectedCity}
              />
          }
        </div>
    </>
  );
}

export default App;
