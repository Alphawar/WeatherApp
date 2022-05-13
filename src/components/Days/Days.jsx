import React, { useEffect, useState } from 'react';
import Card from './Card/Card';
import classes from './Days.module.css';
import Tabs from './Tabs/Tabs';
import { getProperTime, getTempInC } from '../../functions/functions';

const Days = ({setIsPopUpActive, dailyWeekWeather, setWeeksDayWeather, twoWeeksForecast, selectedCity}) => {

    const [buttonState, setButtonState] = useState(8);

    useEffect( () => {
        setButtonState(8)
    }, [selectedCity])

    let days = []
    if(twoWeeksForecast?.list?.length){
        days = dailyWeekWeather?.daily?.slice(1, 8).concat(twoWeeksForecast?.list?.slice(8, buttonState)).map( (el, index) => {
            return {
               dayName: `${getProperTime(el.dt, 'day')}`,
               dayInfo: `${new Date(el.dt * 1000).getDate()} ${getProperTime(el.dt, 'month')}`,
               iconId: `${el.weather[0].icon}`,
               tempDay: `${getTempInC(el.temp.day)}°`,
               tempNight: `${getTempInC(el.temp.night)}°`,
               info: `${el.weather[0].main}`,
               index
             }
           })
    }

    return(
        <>
            <Tabs buttonState={buttonState} setButtonState={setButtonState}/>
            <div 
            className={buttonState === 8 ? `${classes.days}` : `${classes.days} ${classes.days_active}`}>
                {days?.map( (day, index) => 
                    <Card dailyWeekWeather={dailyWeekWeather} twoWeeksForecast={twoWeeksForecast} setWeeksDayWeather={setWeeksDayWeather} setIsPopUpActive={setIsPopUpActive} key={index} day={day}/>)
                }
            </div>
        </>
    );
};

export default Days;

