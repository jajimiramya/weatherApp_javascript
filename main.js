const inputRef = document.querySelector('.search_field');
const buttonRef = document.querySelector('button[type="submit"]');
const tempRef = document.querySelector(".weather .temp");
const locationRef = document.querySelector(".weather .time_location p");
const timedateRef = document.querySelector(".weather .time_location span");
const conditionTextRef = document.querySelector(".weather .weather_condition span");
const conditionIconRef = document.querySelector(".weather .weather_condition p img");
const humidityRef = document.querySelector(".weather .humidity");
const windRef = document.querySelector(".weather .wind");
const forecastContainer = document.querySelector(".forecast");
const alertsContainer = document.querySelector(".weather-alerts");
const hourlyForecastContainer = document.querySelector(".hourly-forecast");

// 1. On submit get the location name
buttonRef.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(inputRef.value);
    fetchData(inputRef.value);
});

// 2. Make API call to server to get the weather details
function fetchData(location) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=3f7369f5585c4c24be4161128232812&q=${location}&days=7&aqi=no&alerts=yes`)
        .then(response => response.json())
        .then(data => {
            updateWeatherDetails(data);
            updateForecast(data.forecast.forecastday); // Update 7-day forecast
            
        })
        .catch(function(e) {
            console.log(e);
        });
}

// 3. Get information from response JSON, display the data into respective DOM elements
function updateWeatherDetails(obj) {
    const tempc = obj.current.temp_c;
    const locationname = obj.location.name;
    const datetime = obj.location.localtime;
    const conditionText = obj.current.condition.text;
    const conditionIcon = obj.current.condition.icon;
    const humidity = obj.current.humidity; 
    const windSpeed = obj.current.wind_kph; 
    tempRef.innerText = `${tempc}°C`;
    locationRef.innerText = locationname;
    timedateRef.innerText = datetime;
    conditionTextRef.innerText = conditionText;
    conditionIconRef.src = conditionIcon;
    humidityRef.innerText = `Humidity: ${humidity}%`;
    windRef.innerText = `Wind Speed: ${windSpeed} km/h`;
}

// Function to update the 7-day weather forecast
function updateForecast(forecast) {
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    forecast.forEach(day => {
        const date = day.date;
        const tempMax = day.day.maxtemp_c;
        const tempMin = day.day.mintemp_c;
        const condition = day.day.condition.text;
        const icon = day.day.condition.icon;

        // Create elements to display forecast data
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <p>Date: ${date}</p>
            <p>Condition: ${condition}</p>
            <p>Max Temp: ${tempMax}°C / Min Temp: ${tempMin}°C</p>
            <img src="${icon}" alt="${condition}">
        `;

        forecastContainer.appendChild(dayElement);
    });
}

