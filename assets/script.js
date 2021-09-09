setInterval(function () {
  //get the current day and time using moment.js
  var dayOne = moment().add(1, "days").format("dddd");
  var dayTwo = moment().add(2, "days").format("dddd");
  var dayThree = moment().add(3, "days").format("dddd");
  var dayFour = moment().add(4, "days").format("dddd");
  var dayFive = moment().add(5, "days").format("dddd");

  //gets a handle on the text with the id 'dayEl' in the html
  var dayOneEl = document.querySelector("#day-1");
  var dayTwoEl = document.querySelector("#day-2");
  var dayThreeEl = document.querySelector("#day-3");
  var dayFourEl = document.querySelector("#day-4");
  var dayFiveEl = document.querySelector("#day-5");
  //set the day text in the #dayEl html
  dayOneEl.innerText = dayOne;
  dayTwoEl.innerText = dayTwo;
  dayThreeEl.innerText = dayThree;
  dayFourEl.innerText = dayFour;
  dayFiveEl.innerText = dayFive;
  //run it every 1000 milliseconds
}, 1000);
var currentCityEl = document.querySelector(".current-city");
var cityTempEl = document.querySelector("#current-city-temp");
var cityWindEl = document.querySelector("#current-city-wind");
var cityHumidityEL = document.querySelector("#current-city-humidity");
var cityUvEl = document.querySelector("#current-city-uv");
var searchEl = document.querySelector("#search");
var submitButtonEl = document.querySelector("#submit-button");
var iconEl = document.querySelector("#weather-icon-0");
var weatherDescriptionEL = document.querySelector("#weather-description");
var searchHeadingEL = document.querySelector("#search-heading");
var firstSearchEL = document.querySelector(".mostRecent");
var latEl = document.querySelector("#lattitude");
var lonEl = document.querySelector("#longitude");
var fiveDaySubmitEl = document.querySelector("#five-day-submit");

//get a handle on the days of the week

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
    var { lat } = data.coord;
    var { lon } = data.coord;
    console.log("lattidue= " + lat + "," + "longitude= " + lon + "," + id);

    latEl.innerText = lat;
    lonEl.innerText = lon;
    currentCityEl.innerHTML = "Current Weather in " + name;
    cityTempEl.innerHTML = "Temp: " + temp + "°F";
    cityWindEl.innerHTML = "Wind: " + speed + " Miles/Hour";
    cityHumidityEL.innerHTML = "Humidity: " + humidity + "%";
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    weatherDescriptionEL.innerHTML = main;
  },
  fetchOhterStuff: function (lat, lon) {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayOtherStuff(data));
  },
  displayOtherStuff: function (data) {
    //var { uvi } = data.current;
    var { day } = data.daily[1].temp;
    var { humidity } = data.daily[1];
    var { wind_speed } = data.daily[1];
    console.log(data);
    console.log(
      "the temperature will be " +
        day +
        " degrees Fahrenheit.  The humidity will be " +
        humidity +
        "%.  The wind speed will be " +
        wind_speed +
        "mph."
    );

    for (var i = 1; i < 6; i++) {
      document.querySelector(
        `#weather-icon-${i}`
      ).src = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`;
      document.querySelector("#temp" + i).innerHTML =
        "Temp: " + data.daily[i].temp.day + "°F";
      document.querySelector("#humidity" + i).innerHTML =
        "Humidity: " + data.daily[i].humidity + "%";
      document.querySelector("#wind" + i).innerHTML =
        "Wind: " + data.daily[i].wind_speed + "mph";
    }

    cityUvEl.innerHTML = "UV Index: " + data.current.uvi;
  },
  search: function () {
    weather.fetchWeather(searchEl.value);
    var recentSearch1 = searchEl.value;
    localStorage.setItem("recentSearch", recentSearch1);
    firstSearchEL.innerHTML = recentSearch1;
  },
  searchLast: function () {
    weather.fetchWeather(firstSearchEL.innerText);
  },
  fiveDaySearch: function () {
    weather.fetchOhterStuff(latEl.innerText, lonEl.innerText);
  },
  //   fetchUvIndex: function (lat, lon) {
  //     fetch(
  //       "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  //         lat +
  //         "&lon=" +
  //         lon +
  //         "&appid=" +
  //         this.apiKey
  //     )
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   },
  displayUvIndex: function (data) {
    var { uvi } = data.current;
    cityUvEl.innerHTML = uvi;
    console.log(uvi);
  },
  uvIndexOnClick: function () {
    weather.fetchUvIndex(lat, lon);
    weather.displayUvIndex(data);
  },
};
submitButtonEl.addEventListener("click", weather.search);

fiveDaySubmitEl.addEventListener("click", weather.fiveDaySearch);
//temperature per day = daily.temp.day
// humidity per day = daily.humidity
// wind speed per day = daily.wind_speed
// daily weather icon = daily.weather.icon
firstSearchEL.addEventListener("click", weather.searchLast);
