export const getTempInC = temp => {
    return Math.round(temp - 273)
}

export const getProperTime = (timestamp, indicator) => {
    const data = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    switch(indicator){
      case "time": 
        return `${data.getHours()}:${data.getMinutes() > 10 ? data.getMinutes() : `0${data.getMinutes()}`}`;
      case "day": 
        return days[data.getDay()];
      case "dayNumber": 
        return data.getDay() + 1;
      case "month":
        return `${month[data.getMonth()]}`
      default:
        break;
    }
}

export  const getPressureInIoM = hpa => {
    return Math.round(hpa / 1.3332239)
}

export const getWindDirection = deg => {
    const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"]
    return directions[Math.floor(deg / 45)]
}