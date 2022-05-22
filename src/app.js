function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
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

function overviewTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#overview-city");
  cityElement.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  newIconElement = (response.data.weather[0].icon);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${newIconElement}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let temperatureElement = document.querySelector("#overview-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#overview-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let city = "stockholm";
let apiKey = "e82dee1dc88604a246e7660f6c7461c7";
let apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey +
  "&units=metric";

axios.get(apiURL).then(overviewTemperature);