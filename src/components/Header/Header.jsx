import React, { useEffect, useRef, useState } from 'react';
import classes from './Header.module.css';
import GenericSvgSelector from '../../assets/icons/GenericSvgSelector/GenericSvgSelector';
import Select, { createFilter } from 'react-select';

const Header = ({isLoaded, cities, countries, selectedCountry, setSelectedCountry, setSelectedCity}) => {

    const [theme, setTheme] = useState('light');
    const [countriesOptions, setCountriesOptions] = useState([]);
    const [citiesOptions, setCitiesOptions] = useState([]);

    const CityValue = useRef();

    useEffect( () => {
        const countriesOptionsArray = countries.map( el => {return {value: el.code, label: el.name}})
        setCountriesOptions(countriesOptionsArray)
    }, [countries])

    useEffect( () => {
        const citiesOptionsArray = cities.filter( el => el.country === selectedCountry?.value).map( el => {return {value: el.id, label: el.name}})
        setCitiesOptions(citiesOptionsArray)
    }, [selectedCountry])

      const colorStyles = {
        control: styles => ({
            ...styles, 
            backgroundColor: "var(--card-background-default)",
            width: '194px',
            height: '37px',
            border: 'none',
            borderRadius: "10px",
            zIndex: 100
        }),
        singleValue: styles => ({
            ...styles,
            color: "var(--text-color-default)",
        }),
        menu: styles => ({
            ...styles,
            width: "max-content",
            minWidth: "100%",
            backgroundColor: "var(--body-background-default)",
            color: "var(--text-color-default)",
            zIndex: 99999
        }),
        option: styles => ({
            ...styles,
            backgroundColor: "var(--body-background-default)",
            color: "var(--text-color-default)"
        }),
        dropdownIndicator: (styles, state) => ({
            ...styles,
            transition: '0.3s',
            transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
        }),
        input: styles => ({
            ...styles,
            color: "var(--text-color-default)"
        }),
        container: styles => ({
            ...styles,
            borderRadius: '10px'
        })
    }

    const toggleTheme = () => {
        setTheme( theme === 'light' ? 'dark' : 'light');
    }

    useEffect( () => {
        const root = document.querySelector(':root');

        const components = [
            'body-background', 
            'components-background', 
            'card-background', 
            'card-shadow',    
            'text-color'
        ]

        components.forEach( component => {
            root.style.setProperty(
                `--${component}-default`,
                `var(--${component}-${theme})`)
        })
    }, [theme])


    return(
        <header className={classes.header}>
            <div className={classes.wrapper}>
                <div className={classes.logo}>
                    <GenericSvgSelector id="header__logo"/>
                </div>
                <div className={classes.title}>React Weather</div>
            </div>
            <div className={classes.wrapper}>
                <div className={classes.changeTheme} onClick={toggleTheme}>
                    <GenericSvgSelector id="header__changeTheme"/>
                </div>
                <Select 
                    filterOption={createFilter({ignoreAccents: false})}
                    placeholder="Select country"
                    className={classes.CountrySelect}
                    isDisabled={isLoaded}
                    hideSelectedOptions='true' 
                    options={countriesOptions}
                    styles={colorStyles}
                    onChange={e => {
                        setSelectedCountry(e)
                        CityValue.current.setValue('', '', citiesOptions)
                        setSelectedCity(null);
                    }}
                    />
                <Select 
                    ref={CityValue}
                    filterOption={createFilter({ignoreAccents: false})}
                    placeholder="Select city"
                    className={classes.CitySelect}
                    isDisabled={!selectedCountry || isLoaded}
                    hideSelectedOptions='true' 
                    options={citiesOptions}
                    styles={colorStyles}
                    onChange={e => setSelectedCity(e)}
                    />
            </div>
        </header>
    );
};

export default Header;