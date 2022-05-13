import axios from "axios"
import { getProperTime, getTempInC } from '../functions/functions';

const API_KEY = '2d79197c67c305b9d53fe8eaa931670a'
const currentWeather = `https://api.openweathermap.org/data/2.5/weather`;
const dailyForecast = `https://api.openweathermap.org/data/2.5/onecall`;
const historyWeather = `https://api.openweathermap.org/data/2.5/onecall/timemachine`;
const twoWeeksWeather = 'https://api.openweathermap.org/data/2.5/forecast/daily'


// http://openweathermap.org/img/wn/10d@2x.png img url

export const getCitiesAndCountries = async (setCities, setCurrentWeather, setCountries, setDailyWeekWeather, setChartData, setIsLoaded, setTwoWeeksForecast) => {
    setIsLoaded(true)
    setTimeout( async () => {
        navigator.geolocation.getCurrentPosition( async pos => {    
            const responseCurrent = await axios.get(`${currentWeather}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${API_KEY}`);
            setCurrentWeather(responseCurrent.data);
            const responseCurrentWeek = await axios.get(`${dailyForecast}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`);
            setDailyWeekWeather(responseCurrentWeek.data);
            const responseHourly = await axios.get(`${dailyForecast}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`)
            const responseHistory = await axios.get(`${historyWeather}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&dt=${responseCurrent.data.dt}&appid=${API_KEY}`)
            setChartData({
                labels: responseHourly.data.hourly.filter( el => getProperTime(el.dt, 'dayNumber') === (new Date().getDay() + 2)).map( el => getProperTime(el.dt, 'time')),
                datasets: [{
                    label: 'Today',
                    data: responseHistory.data.hourly.concat(responseHourly.data.hourly.filter( el => getProperTime(el.dt, 'dayNumber') === (new Date().getDay() + 1))).map( el => getTempInC(el.temp)),
                    tension: 0.3,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    pointRadius: 5,
                    pointHoverRadius: 10
                },
                {
                    label: 'Tomorrow',
                    data: responseHourly.data.hourly.filter( el => getProperTime(el.dt, 'dayNumber') === (new Date().getDay() + 2)).map( el => getTempInC(el.temp)),
                    tension: 0.3,
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    pointRadius: 5,
                    pointHoverRadius: 10
                }]
            })
            const responseTwoWeeks = await axios.get(`${twoWeeksWeather}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&cnt=17&appid=${API_KEY}`)
            setTwoWeeksForecast(responseTwoWeeks.data)
        }, err => console.log(`ERROR OCCURRED (error code: ${err.code}): ${err.message}`));
        const responseCities = await axios.get('city.list.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        setCities(responseCities.data)
        const responseCountries = await axios.get('countries.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        setCountries(responseCountries.data)
        setIsLoaded(false) 
    }, 4000)
} 

export const getCityWeather = async (setCurrentWeather, setIsLoaded, cities, selectedCity, setDailyWeekWeather, setChartData, setTwoWeeksForecast) => {
    setIsLoaded(true)
    setTimeout( async () => {
        const city = cities.filter( el => el.id === selectedCity?.value)
        const response = await axios.get(`${currentWeather}?lat=${city[0]?.coord?.lat}&lon=${city[0]?.coord?.lon}&appid=${API_KEY}`);
        setCurrentWeather(response.data);
        const responseCurrentWeek = await axios.get(`${dailyForecast}?lat=${city[0]?.coord?.lat}&lon=${city[0]?.coord?.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`)
        setDailyWeekWeather(responseCurrentWeek.data)
        const responseHourly = await axios.get(`${dailyForecast}?lat=${city[0]?.coord?.lat}&lon=${city[0]?.coord?.lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`)
        const responseHistory = await axios.get(`${historyWeather}?lat=${city[0]?.coord?.lat}&lon=${city[0]?.coord?.lon}&dt=${response.data.dt}&appid=${API_KEY}`)
        setChartData({
            labels: responseHourly.data.hourly.filter( el => getProperTime(el.dt, 'dayNumber') === (new Date().getDay() + 2)).map( el => getProperTime(el.dt, 'time')),
            datasets: [{
                label: 'Today',
                data: responseHistory.data.hourly.concat(responseHourly.data.hourly.filter( el => getProperTime(el.dt, 'dayNumber') === (new Date().getDay() + 1))).map( el => getTempInC(el.temp)),
                tension: 0.1,
                borderColor: 'red',
                backgroundColor: 'red',
                pointRadius: 5,
                pointHoverRadius: 10
            },
            {
                label: 'Tomorrow',
                data: responseHourly.data.hourly.filter( el => getProperTime(el.dt, 'dayNumber') === (new Date().getDay() + 2)).map( el => getTempInC(el.temp)),
                tension: 0.1,
                borderColor: 'orange',
                backgroundColor: 'orange',
                pointRadius: 5,
                pointHoverRadius: 10
            }]
        })
        const responseTwoWeeks = await axios.get(`${twoWeeksWeather}?lat=${city[0]?.coord?.lat}&lon=${city[0]?.coord?.lon}&cnt=17&appid=${API_KEY}`)
        setTwoWeeksForecast(responseTwoWeeks.data)
        setIsLoaded(false)
    }, 2000)
}
