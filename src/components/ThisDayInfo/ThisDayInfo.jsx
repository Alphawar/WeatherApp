import React from 'react';
import classes from './ThisDayInfo.module.css';
import cloud from '../../assets/images/cloud.png';
import ThisDayInfoItem from './ThisDayInfoItem/ThisDayInfoItem';
import { getTempInC, getPressureInIoM, getWindDirection } from '../../functions/functions';

const ThisDayInfo = ({currentWeather}) => {

    const items = [{
        iconId: "temp",
        name: "Temperature",
        value: `${getTempInC(currentWeather?.main?.temp)}° - feels like ${getTempInC(currentWeather?.main?.feels_like)}°`
    },
    {
        iconId: "pressure",
        name: "Pressure",
        value: `${getPressureInIoM(currentWeather?.main?.pressure)} inches of mercury - ${getPressureInIoM(currentWeather?.main?.pressure) > 760 ? "High" : "Low"}` 
    },
    {
        iconId: "humidity",
        name: "Humidity",
        value: `${currentWeather?.main?.humidity}%`
    },
    {
        iconId: "wind",
        name: "Wind",
        value: `${currentWeather?.wind?.speed} meter/sec - ${getWindDirection(currentWeather?.wind?.deg)} direction`
    }]

    return(
        <div className={classes.thisDayInfo}>
            <div className={classes.thisDayInfo__items}>
                {items.map( (item, index) => <ThisDayInfoItem key={index} item={item}/>)}
            </div>
            <img className={classes.thisDayInfo__cloud_img} src={cloud} alt="cloud" />
        </div>
    );
};

export default ThisDayInfo;
