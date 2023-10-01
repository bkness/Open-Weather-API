document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener to the New York button
    document.getElementById('newYorkBtn').addEventListener('click', function () {
        // Show the forecast containers
        document.querySelectorAll('.forecast-container, .col-md-2, .h3').forEach(function (element) {
            element.style.display = 'block';
        });

        // Current weather API URL
        var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=New York&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";
        var fiveDayForcast = "https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";

        // Fetch current weather data
        fetch(currentWeatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            document.getElementById('currentCityNameDate').textContent = data.name + " " + data.dt;
            document.getElementById('currentTemp').textContent = "Temperature: " + data.main.temp + "°F";
            document.getElementById('currentWindSpeed').textContent = "Wind Speed: " + data.wind.speed + " mph";
            document.getElementById('currentHumidity').textContent = "Humidity: " + data.main.humidity + "%";
        })
        .catch(function (error) {
            console.error('Error fetching current weather:', error);
        });

        // Fetching 5 day forecast
        fetch(fiveDayForcast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Handle the 5 day forecast data
            console.log(data);

            var firstDayData = data.list[0];

            var date = firstDayData.dt_txt;
            var temperature = firstDayData.main.temp;
            var windSpeed = firstDayData.wind.speed;
            var humidity = firstDayData.main.humidity;

            var dayOneElement = document.getElementById('dayOne');
            if (dayOneElement) {
                dayOneElement.innerHTML = `
                    <h3>${date}</h3>
                    <p>Temperature: ${temperature}°F</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }
        });
    });
});
