var currentCityEl = document.querySelector(".current-city");
var cityTempEl = document.querySelector("#current-city-temp");
var cityWindEl = document.querySelector("#current-city-wind");
var cityHumidityEL = document.querySelector("#current-city-humidity");
var cityUvEl = document.querySelector("#current-city-uv");
var searchEl = document.querySelector("#search");
var submitButtonEl = document.querySelector("#submit-button");
var iconEl = document.querySelector("#weather-icon1");
var weatherDescriptionEL = document.querySelector("#weather-description");
var searchHeadingEL = document.querySelector("#search-heading");
var firstSearchEL = document.querySelector(".mostRecent");

//get a handle on the days of the week
var dayOneIconEL = document.querySelector("#weather-icon2");
var dayOneTempEL = document.querySelector("#temp1");
var dayOneWindEl = document.querySelector("#wind1");
var dayOneHumidityEl = document.querySelector("#humidity1");

//pull from local storage
var firstSearch = localStorage.getItem("recentSearch");
firstSearchEL.innerHTML = firstSearch;
// var apiKey = "bc3a571ec5865457fb6b52d6cce74452";
let weather = {
  apiKey: "bc3a571ec5865457fb6b52d6cce74452",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    var { name } = data;
    var { icon, main } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    var { id } = data;
    var { lat, lon } = data.coord;
    console.log(id + "," + lat + "," + lon);

    console.log(
      "the weather in " +
        name +
        " is " +
        temp +
        " °F, with " +
        humidity +
        "% humidity and wind speeds of " +
        speed +
        " Mph." +
        icon +
        main
    );
    currentCityEl.innerHTML = name;
    cityTempEl.innerHTML = "Temp: " + temp + "°F";
    cityWindEl.innerHTML = "Wind: " + speed + " Miles/Hour";
    cityHumidityEL.innerHTML = "Humidity: " + humidity + "%";
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    weatherDescriptionEL.innerHTML = main;
  },
  search: function () {
    weather.fetchWeather(searchEl.value);
    var recentSearch1 = searchEl.value;
    localStorage.setItem("recentSearch", recentSearch1);
    console.log("hello");

    weather.uvIndexOnClick(weather.lat, weather.lon);
  },
  fetcyUvIndex: function (lat, lon) {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        this.apiKey
    )
      .then((uvResp) => uvResp.json())
      .then((uvData) => this.displayUvIndex(uvData));
  },
  displayUvIndex: function (uvData) {
    var { uvi } = uvData.current;
    cityUvEl.innerHTML = uvi;
    console.log(uvi);
  },
  uvIndexOnClick: function () {
    weather.fetchUvIndex(lat, lon);
    weather.displayUvIndex(unData);
  },
};
submitButtonEl.addEventListener("click", weather.search);
firstSearchEL.innerText = firstSearch;
firstSearchEL.addEventListener("click", event);
