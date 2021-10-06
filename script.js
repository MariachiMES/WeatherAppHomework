var draggables = document.querySelectorAll(".activity-card");
var containers = document.querySelectorAll(".five-things-to-do");
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.0860468, lng: -79.4266274 },
    zoom: 10,
  });
}
var saveTrips = [];
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", (event) => {
    draggable.classList.remove("dragging");
    saveTrips.push(event.target.textContent);
    localStorage.setItem("saveTrips", saveTrips);
    console.log(event.target.textContent + " hello");
    console.log(saveTrips);
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    var afterElement = getDragAfterElement(container, e.clientY);
    var draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  var draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      var box = child.getBoundingClientRect();
      var offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

var displayDays = function () {
  for (var i = 0; i < 5; i++) {
    document.querySelector(`#day-${i}`).innerText =
      moment().add(i, "days").format("dddd") + " ";
  }
};

var apiKey = "116296867a8e5f7080e808d86644669a";

var fetchWeather = function (city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
};

var displayWeather = function (data) {
  var lat = data.city.coord.lat;
  var lon = data.city.coord.lon;

  for (var i = 0; i < 5; i++) {
    document.querySelector(`#temp-${i}`).innerText =
      " Temp: " + Math.floor(data.list[i].main.temp) + "°F";
    document.querySelector(`#icon-${i}`).src =
      "https://openweathermap.org/img/wn/" +
      data.list[i].weather[0].icon +
      ".png";
    displayDays();
  }

  fetchCityInfo(lon, lat);
  map.setCenter({ lat: lat, lng: lon });
};

var weatherSearch = function () {
  if (document.querySelector("#city-name").value != " ") {
    fetchWeather(document.querySelector("#city-name").value);
  }
};

var alternateTripApi =
  "5ae2e3f221c38a28845f05b60ade91485de3f230f12f105b7c087b90";

var tripApi = "5ae2e3f221c38a28845f05b627a67175ff5888a5fca032db41baf3b1";

function fetchCityInfo(lon, lat) {
  fetch(
    "https://api.opentripmap.com/0.1/en/places/radius?radius=20000&lon=" +
      lon +
      "&lat=" +
      lat +
      "&format=json&apikey=" +
      tripApi
  )
    .then((response) => response.json())
    .then((data) => displayPlaces(data));
}
var displayPlaces = function (data) {
  for (var i = 0; i < 10; i++) {
    document.querySelector(`#place-${i}`).innerText = data[i].name;
  }
};

document.querySelector("#go-time").addEventListener("click", weatherSearch);
var savedTrips = [];
displayStorage = function (savedTrips) {
  if (!savedTrips !== [""]) {
    var savedTrips = localStorage.getItem("saveTrips").split(",");
    for (var i = 0; i < 6; i++) {
      document.getElementById(`save-${i}`).textContent = savedTrips[i];
    }
  }
  return;
};

displayStorage(savedTrips);
