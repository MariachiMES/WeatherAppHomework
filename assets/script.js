var currentCityEl = document.querySelector(".current-city");
var cityTempEl = document.querySelector("#current-city-temp");
var cityWindEl = document.querySelector("#current-city-wind");
var cityHumidityEL = document.querySelector("#current-city-humidity");
var cityUvEl = document.querySelector("#current-city-uv");
var searchEl = document.querySelector("#search");
var submitButtonEl = document.querySelector("#submit-button");
var iconEl = document.querySelector("#weather-icon");
var weatherDescriptionEL = document.querySelector("#weather-description");

// var apiKey = "bc3a571ec5865457fb6b52d6cce74452";

// function getCurrentWeatherApi(city) {
//   var requestUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&units=imperial&appid=" +
//     apiKey;

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (currentWeather) {
//       console.log(currentWeather);

//       //Loop over the data to generate a table, each table row will have a link to the shit
//       //   for (var i = 0; i < currentWeather.length; i++) {
//       //     var createTableRow = document.createElement("tr");
//       //     var tableData = document.createElement("td");
//       //     var link = document.createElement("a");

//       //     link.textContent = currentWeather[i].html_url;
//       //     link.href = currentWeather[i].html_url;
//       //     tableData.appendChild(link);
//       //     createTableRow.appendChild(tableData);
//       //     tableBody.appendChild(createTableRow);
//       //   }
//     });
//}
var apiKey = "bc3a571ec5865457fb6b52d6cce74452";
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
    var { lon, lat } = data.coord;

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
    cityUvEl.innerHTML = "WHY ISN'T THIS WORKING??!!!";
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    weatherDescriptionEL.innerHTML = main;
  },
  //   fetchUvi: function (lat,lon) {
  //     fetch(
  //         "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&" + lon + "={lon}&exclude={part}&appid={API key} +
  //         city +
  //         "&units=imperial&appid=" +
  //         this.apiKey
  //     )
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
};
clickOnWeather = function () {
  submitButtonEl.addEventListener("click", fetchWeather(searchEl));
};
