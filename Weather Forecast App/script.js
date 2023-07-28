document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const locationInput = document.getElementById("locationInput");
    const weatherData = document.getElementById("weatherData");
    const errorText = document.getElementById("errorText");
  
    const apiKey = "YOUR_API_KEY";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  
    // Function to fetch weather data from the API
    async function fetchWeatherData(location) {
      try {
        const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  
    // Function to display weather information on the page
    function displayWeatherInfo(weather) {
      weatherData.textContent = `${weather.name}, ${weather.sys.country}: ${weather.main.temp}°C, ${weather.weather[0].description}`;
      errorText.textContent = "";
    }
  
    // Function to display an error message
    function displayError(message) {
      weatherData.textContent = "";
      errorText.textContent = message;
    }
  
    // Event listener for the form submission
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const location = locationInput.value.trim();
  
      if (location === "") {
        displayError("Please enter a location.");
        return;
      }
  
      const weather = await fetchWeatherData(location);
  
      if (weather) {
        displayWeatherInfo(weather);
      } else {
        displayError("Failed to fetch weather data. Please try again later.");
      }
    });
  });
  