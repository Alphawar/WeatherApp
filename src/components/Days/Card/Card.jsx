import React from 'react';
import classes from './Card.module.css';

const Card = ({ day, setIsPopUpActive, setWeeksDayWeather, twoWeeksForecast, dailyWeekWeather, buttonState }) => {

    const {dayName, dayInfo, iconId, tempDay, tempNight, info, index} = day
    
    return(
        <div className={classes.card} onClick={() => {
            setIsPopUpActive(true)
            setWeeksDayWeather(dailyWeekWeather?.daily?.slice(1, 8).concat(twoWeeksForecast?.list?.slice(8, buttonState))[index])
        }}>
            <div className={classes.card__day}>{dayName}</div>
            <div className={classes.card__dayInfo}>{dayInfo}</div>
            <div className={classes.card__icon}>
                <img src={`http://openweathermap.org/img/wn/${iconId}@2x.png`} alt={day.info} />
            </div>
            <div className={classes.card__tempDay}>{tempDay}</div>
            <div className={classes.card__tempNight}>{tempNight}</div>
            <div className={classes.card__info}>{info}</div>
        </div>
    );
};

export default Card;


