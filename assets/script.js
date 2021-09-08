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
var dayOneIconEL = document.querySelector("#weather-icon-1");
var dayOneTempEL = document.querySelector("#temp1");
var dayOneWindEl = document.querySelector("#wind1");
var dayOneHumidityEl = document.querySelector("#humidity1");

var dayTwoIconEL = document.querySelector("#weather-icon-2");
var dayTwoTempEL = document.querySelector("#temp2");
var dayTwoWindEl = document.querySelector("#wind2");
var dayTwoHumidityEl = document.querySelector("#humidity2");

var dayThreeIconEL = document.querySelector("#weather-icon-3");
var dayThreeTempEL = document.querySelector("#temp3");
var dayThreeWindEl = document.querySelector("#wind3");
var dayThreeHumidityEl = document.querySelector("#humidity3");

var dayFourIconEL = document.querySelector("#weather-icon-4");
var dayFourTempEL = document.querySelector("#temp4");
var dayFourWindEl = document.querySelector("#wind4");
var dayFourHumidityEl = document.querySelector("#humidity4");

var dayFiveIconEL = document.querySelector("#weather-icon-5");
var dayFiveTempEL = document.querySelector("#temp5");
var dayFiveWindEl = document.querySelector("#wind5");
var dayFiveHumidityEl = document.querySelector("#humidity5");

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
    currentCityEl.innerHTML = name;
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
    cityUvEl.innerHTML = "UV Index: " + data.current.uvi;
    dayOneIconEL.src =
      "https://openweathermap.org/img/wn/" +
      data.daily[1].weather[0].icon +
      ".png";
    dayOneTempEL.innerHTML = "Temp: " + data.daily[1].temp.day + "°F";
    dayOneHumidityEl.innerHTML = "Humidity: " + data.daily[1].humidity + "%";
    dayOneWindEl.innerHTML = "Wind: " + data.daily[1].wind_speed + "mph";

    dayTwoIconEL.src =
      "https://openweathermap.org/img/wn/" +
      data.daily[2].weather[0].icon +
      ".png";
    dayTwoTempEL.innerHTML = "Temp: " + data.daily[2].temp.day + "°F";
    dayTwoHumidityEl.innerHTML = "Humidity: " + data.daily[2].humidity + "%";
    dayTwoWindEl.innerHTML = "Wind: " + data.daily[2].wind_speed + "mph";

    dayThreeIconEL.src =
      "https://openweathermap.org/img/wn/" +
      data.daily[3].weather[0].icon +
      ".png";
    dayThreeTempEL.innerHTML = "Temp: " + data.daily[3].temp.day + "°F";
    dayThreeHumidityEl.innerHTML = "Humidity: " + data.daily[3].humidity + "%";
    dayThreeWindEl.innerHTML = "Wind: " + data.daily[3].wind_speed + "mph";

    dayFourIconEL.src =
      "https://openweathermap.org/img/wn/" +
      data.daily[4].weather[0].icon +
      ".png";
    dayFourTempEL.innerHTML = "Temp: " + data.daily[4].temp.day + "°F";
    dayFourHumidityEl.innerHTML = "Humidity: " + data.daily[4].humidity + "%";
    dayFourWindEl.innerHTML = "Wind: " + data.daily[4].wind_speed + "mph";

    dayFiveIconEL.src =
      "https://openweathermap.org/img/wn/" +
      data.daily[5].weather[0].icon +
      ".png";
    dayFiveTempEL.innerHTML = "Temp: " + data.daily[5].temp.day + "°F";
    dayFiveHumidityEl.innerHTML = "Humidity: " + data.daily[5].humidity + "%";
    dayFiveWindEl.innerHTML = "Wind: " + data.daily[5].wind_speed + "mph";
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
