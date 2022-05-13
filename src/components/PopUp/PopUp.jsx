import React from 'react';
import classes from './PopUp.module.css';
import ThisDayInfoItem from '../ThisDayInfo/ThisDayInfoItem/ThisDayInfoItem';
import GenericSvgSelector from '../../assets/icons/GenericSvgSelector/GenericSvgSelector';
import { motion } from "framer-motion";
import { getTempInC, getPressureInIoM, getWindDirection, getProperTime } from '../../functions/functions';

const PopUp = ({setIsPopUpActive, weeksDayWeather, currentWeather}) => {

    const items = [{
        iconId: "temp",
        name: "Temperature",
        value: `${getTempInC(weeksDayWeather.temp.day)}° - feels like ${getTempInC(weeksDayWeather.feels_like.day)}°`
    },
    {
        iconId: "pressure",
        name: "Pressure",
        value: `${getPressureInIoM(weeksDayWeather.pressure)} inches of Mercury - ${getPressureInIoM(weeksDayWeather.pressure) > 760 ? "High" : "Low"}`
    },
    {
        iconId: "humidity",
        name: "Humidity",
        value: `${weeksDayWeather.humidity}%`
    },
    {
        iconId: "wind",
        name: "Wind",
        value: `${weeksDayWeather.wind_speed ? `${weeksDayWeather.wind_speed} meter/sec - ${getWindDirection(weeksDayWeather.wind_deg)} direction` : `No information yet`}`
    }]

    return(
        <>
                <div className={classes.background} onClick={() =>  setIsPopUpActive(false)}></div>
                    <motion.div 
                        className={classes.popUp}
                        initial={{y:"-100vh", scale: 0}} 
                        animate={{y: 0, scale: 1}}
                        exit={{y:"-100vh", scale: 0}} 
                    >
                        <div className={classes.day}>
                            <div className={classes.day__temp}>{`${getTempInC(weeksDayWeather.temp.day)}°`}</div>
                            <div className={classes.day__name}>{getProperTime(weeksDayWeather.dt, "day")}</div>
                            <div className={classes.day__icon}>
                                <img src={`http://openweathermap.org/img/wn/${weeksDayWeather.weather[0].icon}@2x.png`} alt={weeksDayWeather.weather[0].main} />
                            </div>
                            <div className={classes.day__time}>Time: <span>{getProperTime(weeksDayWeather.dt, 'time')}</span></div>
                            <div className={classes.day__city}>City: <span>{`${currentWeather.name}, ${currentWeather.sys.country}`}</span></div>
                            <div className={classes.day__weather}>{`${weeksDayWeather.weather[0].main} - ${weeksDayWeather.weather[0].description}`}</div>
                        </div>
                        <div className={classes.thisDayInfo}>
                            <div className={classes.thisDayInfo__items}>
                                {items.map( (item, index) => <ThisDayInfoItem key={index} item={item}/>)}
                            </div>
                        </div>
                        <div className={classes.popUp__close} onClick={() => setIsPopUpActive(false)}>
                            <GenericSvgSelector id="close" />
                        </div>
                    </motion.div>
        </>
    );
};

export default PopUp;