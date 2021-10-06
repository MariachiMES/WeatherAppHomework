setInterval(function () {
  for (var i = 1; i < 6; i++) {
    document.querySelector(`#day-${i}`).innerText = moment()
      .add(i, "days")
      .format("dddd");
  }
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
var recentSearch = [];
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
    var { lat } = data.coord;
    var { lon } = data.coord;
    var { id } = data;
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

    console.log("lattidue= " + lat + "," + "longitude= " + lon + "," + id);
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
      .then((david) => this.displayOtherStuff(david));
  },
  displayOtherStuff: function (david) {
    console.log(david);

    var { icon, main } = david.current.weather[0];
    var { temp, humidity } = david.current;
    var { wind_speed } = david.current;
    var { day } = david.daily[1].temp;
    var { humidity } = david.daily[1];
    var { wind_speed } = david.daily[1];
    var { uvi } = david.current;

    console.log(david);
    console.log(
      "the temperature will be " +
        day +
        " degrees Fahrenheit.  The humidity will be " +
        humidity +
        "%.  The wind speed will be " +
        wind_speed +
        "mph."
    );
    currentCityEl.innerHTML = "Current Weather in " + searchEl.value;
    cityTempEl.innerHTML = "Temp: " + temp + "°F";
    cityWindEl.innerHTML = "Wind: " + wind_speed + " Miles/Hour";
    cityHumidityEL.innerHTML = "Humidity: " + humidity + "%";
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    weatherDescriptionEL.innerHTML = main;
    cityUvEl.innerHTML = uvi;

    for (var i = 1; i < 6; i++) {
      document.querySelector(
        `#weather-icon-${i}`
      ).src = `https://openweathermap.org/img/wn/${david.daily[i].weather[0].icon}.png`;
      document.querySelector("#temp" + i).innerHTML =
        "Temp: " + david.daily[i].temp.day + "°F";
      document.querySelector("#humidity" + i).innerHTML =
        "Humidity: " + david.daily[i].humidity + "%";
      document.querySelector("#wind" + i).innerHTML =
        "Wind: " + david.daily[i].wind_speed + "mph";
    }

    cityUvEl.innerHTML = david.current.uvi;
    console.log(uvi);
    var changeBgColor = function (uvi) {
      if (uvi <= 3) {
        cityUvEl.classList.remove("info");
        cityUvEl.classList.remove("uvRed");
        cityUvEl.classList.remove("uvOrange");
        cityUvEl.classList.add("uvGreen");
      } else if (uvi > 3 && uvi < 5) {
        cityUvEl.classList.remove("uvGreen");
        cityUvEl.classList.remove("uvRed");
        cityUvEl.classList.remove("info");
        cityUvEl.classList.add("uvOrange");
      } else if (uvi > 5) {
        cityUvEl.classList.remove("info");
        cityUvEl.classList.remove("uvOrange");
        cityUvEl.classList.remove("uvGreen");
        cityUvEl.classList.add("uvRed");
      }
    };
    changeBgColor(uvi);
  },
  search: function () {
    weather.fetchWeather(searchEl.value);
    recentSearch.push(searchEl.value);
    localStorage.setItem("recentSearch", recentSearch);
    for (var i = 0; i < recentSearch.length; i++) {
      var cityButton = document.createElement("button");
      cityButton.addEventListener(
        "click",
        weather.fetchWeather(recentSearch[i])
      );
      cityButton.innerHTML = recentSearch[i];
      console.log(recentSearch[i]);
    }
  },
  searchLast: function () {
    weather.fetchWeather(firstSearchEL.innerText);
  },
  fiveDaySearch: function () {
    weather.fetchOhterStuff(latEl.innerText, lonEl.innerText);
  },

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

firstSearchEL.addEventListener("click", weather.searchLast);

var displayDays = function () {
  for (var i = 0; i < 6; i++) {
    document.querySelector(`#day-${i}`).innerText =
      moment().add(i, "days").format("dddd") + " - ";
  }
};
