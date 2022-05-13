import React from 'react';
import TabItem from './TabItem/TabItem';
import classes from './Tabs.module.css';

const Tabs = ({setButtonState, buttonState}) => {

    const tabs = [
        {
            value: "For the week",
            index: 8,
            isActive: buttonState === 8 ? true : false
        },
        {
            value: "For two weeks",
            index: 15,
            isActive: buttonState === 15 ? true : false
        }
    ]

    return(
        
        <div className={classes.tabs}>
            <div className={classes.tabs__wrapper}>
                {tabs.map( (tab, index) => <TabItem setButtonState={setButtonState} key={index} tab={tab} />)}
            </div>
        </div>  
    );
};

export default Tabs;
