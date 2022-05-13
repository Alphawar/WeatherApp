import React from 'react';
import classes from './ThisDayInfoItem.module.css';
import IndicatorSvgSelector from '../../../assets/icons/IndicatorSvgSelector/IndicatorSvgSelector';

const ThisDayInfoItem = ({ item }) => {

    const {iconId, name, value} = item;

    return(
        <div className={classes.item}>
            <div className={classes.indicator}>
                <IndicatorSvgSelector id={iconId}/>
            </div>
            <div className={classes.indicatorName}>{name}</div>
            <div className={classes.indicatorValue}>{value}</div>
        </div>
    );
};

export default ThisDayInfoItem;
