import React from 'react';
import classes from './TabItem.module.css';


const TabItem = ({ tab, setButtonState }) => {

    const { value, index, isActive } = tab;

    return(
        <div 
        onClick={() => {
            setButtonState(index)
        }} 
        className={isActive ? classes.active : classes.tabItem}>{value}</div>
    );
};

export default TabItem;
