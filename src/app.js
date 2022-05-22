function overviewTemperature(response) {
console.log(response.data)

let cityElement = document.querySelector("#overview-city");
    cityElement.innerHTML= (response.data.name);

let temperatureElement =document.querySelector("#overview-temperature");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);

let descriptionElement = document.querySelector("#overview-description");
    descriptionElement.innerHTML = (response.data.weather[0].main);

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = (response.data.main.humidity);

let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "e82dee1dc88604a246e7660f6c7461c7";
let apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  "lisbon" +
  "&appid=" +
  apiKey +"&units=metric";

  
  axios.get(apiURL).then(overviewTemperature)