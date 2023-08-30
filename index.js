let dayName = document.getElementById("day-name")
let dayNumber = document.getElementById("today_date_day_number")
let month = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today-location")
let todayTemp = document.getElementById("today_temp")
let todayImg = document.getElementById("today_condition_img")
let todayCondition = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

let nextDayName = document.getElementsByClassName("next_day_name")
let nextDayImg = document.getElementsByClassName("next_condition_img")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextCondition = document.getElementsByClassName("next_condition_text")

let search = document.getElementById("search")




async function getWeatherData(cityName){
    let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=478bb6c14d6046e0b8c235544231608&q=${cityName}&days=3&aqi=no&alerts=no`)
    let weatherData = await weatherResponse.json()
    return weatherData
}

function displayTodayData(data){
    let todayDate = new Date()
    dayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    dayNumber.innerHTML = todayDate.getDate()
    month.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})

    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = Math.floor(data.current.temp_c)
    todayImg.setAttribute("src",data.current.condition.icon)
    todayCondition.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}

function displayNextData(data){
    let forecastData = data.forecast.forecastday
    for(let i = 0; i < 2; i++){
        let nextDate = new Date(forecastData[i+1].date)
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})

        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextDayImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextCondition[i].innerHTML = forecastData[i+1].day.condition.text
    }
}

async function startApp(city="cairo"){
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }

}

startApp()

search.addEventListener("input",function(){
    startApp(search.value)
})

