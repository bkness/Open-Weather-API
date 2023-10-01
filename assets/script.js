document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener to the New York button
      var searchInput = document.getElementById('focusedInput');
        searchInput.addEventListener('click', function() {
            this.value = '';
        })

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

            var date = new Date(firstDayData.dt_txt).toLocaleDateString();
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

            var secondDayData = data.list[8];

            var date = new Date(secondDayData.dt_txt).toLocaleDateString();
            var temperature = secondDayData.main.temp;
            var windSpeed = secondDayData.wind.speed;
            var humidity = secondDayData.main.humidity;

            var dayTwoElement = document.getElementById('dayTwo');
            if (dayTwoElement) {
                dayTwoElement.innerHTML = `
                    <h3>${date}</h3>
                    <p>Temperature: ${temperature}°F</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }
            
            var thirdDayData = data.list[16];

            var date = new Date(thirdDayData.dt_txt).toLocaleDateString();
            var temperature = thirdDayData.main.temp;
            var windSpeed = thirdDayData.wind.speed;
            var humidity = thirdDayData.main.humidity;

            var dayThreeElement = document.getElementById('dayThree');
            if (dayThreeElement) {
                dayThreeElement.innerHTML = `
                    <h3>${date}</h3>
                    <p>Temperature: ${temperature}°F</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }
            
            var fourthDayData = data.list[24];

            var date = new Date(fourthDayData.dt_txt).toLocaleDateString();
            var temperature = fourthDayData.main.temp;
            var windSpeed = fourthDayData.wind.speed;
            var humidity = fourthDayData.main.humidity;

            var dayFourElement = document.getElementById('dayFour');
            if (dayFourElement) {
                dayFourElement.innerHTML = `
                    <h3>${date}</h3>
                    <p>Temperature: ${temperature}°F</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }
            var fifthDayData = data.list[32];

            var date = new Date(fifthDayData.dt_txt).toLocaleDateString();
            var temperature = fifthDayData.main.temp;
            var windSpeed = fifthDayData.wind.speed;
            var humidity = fifthDayData.main.humidity;

            var dayFiveElement = document.getElementById('dayFive');
            if (dayFiveElement) {
                dayFiveElement.innerHTML = `
                    <h3>${date}</h3>
                    <p>Temperature: ${temperature}°F</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }
        });
    });
});
