function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}


function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday"
     ];
     let day = days[date.getDay()];

     if (minutes < 10) {
         minutes - `0$(minutes)`;
     }
     
     return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "6699b7b6dd40692473of31ft3a14835d";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
 axios.get(apiUrl).then(refreshWeather);

}


function handleSearchSubmit(event) {
  event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    searchCity(searchInput.value);
}

function displayForcast() {
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    let forcastHTML = "";

    days.forEach(function (day) {
        forcastHTML =
            forcastHTML +
            `
    <div class="weather-forcast-day">
        <div class="weather-forcast-date">${day}</div>
        <div class="weather-forcast-icon">⛅</div>
        <div class="weather-forcast-temperatures">
            <div class="weather-forcast-temperature">
                <strong>10°C</strong>
            </div>
            <div class="weather-forcast-temperature">
                <strong>3°C</strong> </div>
        </div>
    </div>
    `;
    });




    let forcastElement = document.querySelector("#forcast");
    forcastElement.innerHTML = forcastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
displayForcast();

