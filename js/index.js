// Coordinates for Charlotte
const latitude = 35.2271;
const longitude = -80.8431;

// Fetch current weather from Open-Meteo
fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
)
  .then((response) => response.json())
  .then((data) => {
    const weather = data.current_weather;
    const temperature = weather.temperature;
    const windspeed = weather.windspeed;

    // Display the weather
    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = `
      <p><strong>Temperature:</strong> ${temperature} °C</p>
      <p><strong>Wind Speed:</strong> ${windspeed} km/h</p>
    `;
  })
  .catch((error) => {
    console.error("Error fetching weather:", error);
    document.getElementById("weather").textContent =
      "Failed to load weather data.";
  });
