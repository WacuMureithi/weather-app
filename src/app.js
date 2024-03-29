function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours <= 9) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}  ${hours}:${minutes}`;

}

function formatDay(timestamp){

  let date= new Date(timestamp *1000)
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

  return days[day];

}

function displayforecast(response){

  let forecast = (response.data.daily);

  let forecastElement= document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

 forecast.forEach(function(forecastDay, index){

  if (index < 6) {
  forecastHTML =

    forecastHTML +
    `
        <div class="col-2">
            <div class="weather-forecast-day">
                         ${formatDay(forecastDay.dt)}
            </div>
            
            <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="50">
            </div>

            <div class="weather-forecast-temperature">
              <span id="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
              |
              <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
      </div>
  `;

  }})
  ;

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML ;

  }

function getForecast(coordinates){

  let apiKey = "e82dee1dc88604a246e7660f6c7461c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayforecast);
}

function changeWeatherData(response) {

 let iconElement = document.querySelector("#icon");
  newIconElement = (response.data.weather[0].icon);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${newIconElement}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let dateElement = document.querySelector("#date");
  
  let temperatureElement = document.querySelector("#overview-temperature");
  
  let descriptionElement = document.querySelector("#overview-description");
  
  let humidityElement = document.querySelector("#humidity");
  
  let windElement = document.querySelector("#wind");
 
  let cityElement = document.querySelector("#overview-city");

  celsiusTemp = response.data.main.temp;

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  
 
  

  getForecast(response.data.coord)

}

function search(city){
let apiKey = "e82dee1dc88604a246e7660f6c7461c7";
let apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey +
  "&units=metric";
  axios.get(apiURL).then(changeWeatherData);
}

function handleSubmit(event) {
event.preventDefault()
let cityInputElement= document.querySelector("#city-input")
search(cityInputElement.value);

}

function convertFarenheit(event) {
event.preventDefault()

let temperatureElement = document.querySelector("#overview-temperature")
//add active when celsius is active
celsiusLink.classList.remove("active")
farenheitLink.classList.add("active");
let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(farenheitTemp)

}

function convertCelsius(event) {
  event.preventDefault();
  let celsiusTemperatureElement = document.querySelector("#overview-temperature");
  //add active when celsius is active
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  celsiusTemperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let formElement =document.querySelector("#search-form")
let farenheitLink =document.querySelector("#farenheit-link")
let celsiusLink = document.querySelector("#celsius-link");

formElement.addEventListener("submit", handleSubmit);
farenheitLink.addEventListener("click", convertFarenheit);
celsiusLink.addEventListener("click", convertCelsius);

search("Cape Town");





  




    




