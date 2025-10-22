// ---------WEATHER BUTTON---------

// When someone clicks the button "Check Weather," run the function getWeather()
document.getElementById("weatherButton").addEventListener("click", getWeather);

function getWeather() {
  // Coordinates for Charlotte
  const latitude = 35.2271;
  const longitude = -80.8431;

  const weatherCodes = {
    0: "Clear sky ☀️",
    1: "Mainly clear 🌤️",
    2: "Partly cloudy ⛅",
    3: "Overcast ☁️",
    61: "Light rain 🌦️",
    63: "Moderate rain 🌧️",
    65: "Heavy rain 🌧️",
    80: "Rain showers 🌧️",
    95: "Thunderstorm ⛈️",
  };

  // Grab the box <div id="weather">
  const weatherDiv = document.getElementById("weather");

  // Show the loading message
  weatherDiv.textContent = "Checking weather...";

  // Get the weather
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m,weathercode`
  )
    .then((response) => response.json()) // Turns raw data to readable data
    .then((data) => {
      // Get rid of the "Checking weather..." message
      weatherDiv.textContent = "";

      const numberOfHoursToShow = 8; // Show data for 8 hours
      for (let i = 0; i < numberOfHoursToShow; i++) {
        const temp = data.hourly.temperature_2m[i];
        const wind = data.hourly.windspeed_10m[i];
        const time = data.hourly.time[i];
        const code = data.hourly.weathercode[i];
        const description = weatherCodes[code];

        // Make a new p with the time, temp and wind speed and put in the white box
        const p = document.createElement("p");
        p.textContent = `${time} - ${description}, Temp: ${temp} °C, Wind: ${wind} km/h`;
        weatherDiv.appendChild(p);
      }
    })

    // If something goes wrong, show the message "Could not load the weather."
    .catch(() => {
      weatherDiv.textContent = "Could not load weather. Please try again later";
    });
}

// ----------AIR QUALITY BUTTON------------

// When someone clicks the button "Check Air Quality," run the function getAirQuality()
document
  .getElementById("airQualityButton")
  .addEventListener("click", getAirQuality);

function getAirQuality() {
  // Coordinates for Charlotte
  const latitude = 35.2271;
  const longitude = -80.8431;
  // Grab the box <div id="airQuality">
  const airDiv = document.getElementById("airQuality");

  // Show the message "Checking air quality..."
  airDiv.textContent = "Checking air quality...";

  // Get the air quality
  fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5`
  )
    .then((response) => response.json())
    .then((data) => {
      // // Get rid of the "Checking air quality..." message
      airDiv.textContent = "";

      const numberOfHoursToShow = 8; // Show data for 8 hours
      for (let i = 0; i < numberOfHoursToShow; i++) {
        const pm25 = data.hourly.pm2_5[i];
        const pm10 = data.hourly.pm10[i];
        const time = data.hourly.time[i];

        //Make a new p with the time and air quality and put in the white box
        const p = document.createElement("p");
        p.textContent = `${time} - PM2.5: ${pm25} µg/m³, PM10: ${pm10} µg/m³`;
        airDiv.appendChild(p);
      }
    })

    // If something goes wrong, show the error message
    .catch(() => {
      airDiv.textContent =
        "Could not load air quality. Please try again later.";
    });
}