let long;
let lat;
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(proxy + api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;
          const timezone = data.timezone;
          createDOMElements(temperature, summary, timezone);
          convertToCelsius(temperature);
          setIcons(icon, document.querySelector(".icon"));
          temperatureSection.addEventListener("click", function () {
            changeTemperature(temperature);
          });
        });
    });
  }
});

function convertToCelsius(temperature) {
  let celsius = (temperature - 32) * (5 / 9);
  return celsius;
}

function createDOMElements(temperature, summary, timezone) {
  temperatureDegree.textContent = temperature;
  temperatureDescription.textContent = summary;
  locationTimezone.textContent = timezone;
}

function changeTemperature(temperature) {
  if (temperatureSpan.textContent === "F") {
    temperatureSpan.textContent = "C";
    temperatureDegree.textContent = Math.floor(convertToCelsius(temperature));
  } else {
    temperatureSpan.textContent = "F";
    temperatureDegree.textContent = temperature;
  }
}

function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
