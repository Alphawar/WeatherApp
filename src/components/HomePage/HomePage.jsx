import React from 'react';
import Days from '../Days/Days';
import ThisDay from '../ThisDay/ThisDay';
import ThisDayInfo from '../ThisDayInfo/ThisDayInfo';
import classes from './HomePage.module.css';
import HoursChart from '../HoursChart/HoursChart';


const HomePage = ({setIsPopUpActive, currentWeather, dailyWeekWeather, setWeeksDayWeather, chartData, twoWeeksForecast, selectedCity}) => {
    return (
        <div className={classes.homePage}>
            <div className={classes.wrapper}>
                <ThisDay currentWeather={currentWeather} />
                <ThisDayInfo currentWeather={currentWeather} />
            </div>
            <Days 
                setIsPopUpActive={setIsPopUpActive}
                dailyWeekWeather={dailyWeekWeather}
                setWeeksDayWeather={setWeeksDayWeather}
                twoWeeksForecast={twoWeeksForecast}
                selectedCity={selectedCity}
            />
            {chartData && <HoursChart chartData={chartData}/>}
        </div>  
    );
};

export default HomePage;