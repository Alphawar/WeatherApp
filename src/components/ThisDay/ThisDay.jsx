import React from 'react';
import classes from './ThisDay.module.css';
import { getTempInC, getProperTime } from '../../functions/functions';

const ThisDay = ({currentWeather}) => {
    return(
        <div className={classes.thisDay}>
            <div className={classes.thisDay__top}>
            <div className={classes.thisDay__wraper_top}>
                <div className={classes.thisDay__temp}>{`${getTempInC(currentWeather?.main?.temp)}°`}</div>
                <div className={classes.thisDay__day}>{getProperTime(currentWeather?.dt, 'day')}</div>
            </div>
            {currentWeather?.weather?.length  && (
                <div className={classes.thisDay__img}>
                    <img src={`http://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`} alt={currentWeather?.weather[0]?.main} />
                </div>
            )}
            </div>
            <div className={classes.thisDay__bottom}>
                {currentWeather?.weather?.length && <div className={classes.thisDay__weather}>{`${currentWeather?.weather[0]?.main} - ${currentWeather?.weather[0]?.description}`}</div>}
                <div className={classes.thisDay__time}>
                    Time: <span>{getProperTime(currentWeather?.dt, 'time')}</span>
                </div>
                <div className={classes.thisDay__city}>
                    City: <span>{`${currentWeather?.name}, ${currentWeather?.sys?.country}`}</span>
                </div>
            </div>
        </div>
    );
};

export default ThisDay;
