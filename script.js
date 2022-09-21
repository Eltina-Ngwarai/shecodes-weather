let now = new Date();
let h3 = document.querySelector(".date-time");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h3.innerHTML = `${day} ${month} ${date} (${hours}:${minutes})`;

function convertToCelcius() {
  let header = document.querySelector("#header");
  header.innerHTML = "⛅16°C";
}

function updateWeatherData(response) {
  console.log(response);
  let header = document.querySelector("#header");
  header.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;

  // change real feel
  let realTemp = document.querySelector("#realTemp");
  realTemp.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  // change humidity
  let actualHumidity = document.querySelector("#actualHumidity");
  actualHumidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  // change wind
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}km/hr`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let searchInput = document.querySelector("#search-city");

  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

let searchButton = document.querySelector("#submit");
searchButton.addEventListener("click", searchCity);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);
