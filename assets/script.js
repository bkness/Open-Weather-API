document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('focusedInput');
    var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

    // Add event listener to the search button to handle form submission
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Grab the city name from the search input
        var cityName = searchInput.value.trim();
        if (cityName) {
            // Fetch weather data for the searched city
            fetchWeatherData(cityName);
            // Clear the search input
            searchInput.value = '';
            // Display forecast elements
            document.querySelectorAll('.forecast-container, .col-md-2, h2').forEach(function (element) {
                element.style.display = 'block';
            });
            // Save the searched city to local storage if not already saved
            if (!savedCities.includes(cityName)) {
                savedCities.push(cityName);
                localStorage.setItem('savedCities', JSON.stringify(savedCities));
                // Re-render saved cities with the new addition
                renderSavedCities();
            }
        }
    });

    function renderSavedCities() {
        var forecastsContainer = document.getElementById('forecasts');
        forecastsContainer.innerHTML = '';
        savedCities.forEach(function (city) {
            // Create city buttons
            var cityButton = document.createElement('button');
            cityButton.classList.add('btn', 'btn-secondary', 'm-1');
            cityButton.textContent = city;
            cityButton.addEventListener('click', function () {
                // Fetch weather data when a saved city button is clicked
                fetchWeatherData(city);
                // Display forecast elements
                document.querySelectorAll('.forecast-container, .col-md-2, h2').forEach(function (element) {
                    element.style.display = 'block';
                });
            });
            forecastsContainer.appendChild(cityButton);
        });
    }

    // Render saved cities on page load
    renderSavedCities();

    // Event listener to clear the search field text when user clicks on the input field
    searchInput.addEventListener('click', function () {
        this.value = '';
    });

    // Function to fetch weather data for a given city
    function fetchWeatherData(cityName) {
        var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial`;
        var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial`;

        fetch(currentWeatherApi)
            .then(response => response.json())
            .then(data => {
                var cityNameDate = dayjs(data.dt * 1000).format('MMMM D, YYYY h:mm A');
                document.getElementById('currentCityNameDate').textContent = `${data.name} ${cityNameDate}`;
                document.getElementById('currentTemp').textContent = `Temperature: ${data.main.temp}°F`;
                document.getElementById('currentWindSpeed').textContent = `Wind Speed: ${data.wind.speed} mph`;
                document.getElementById('currentHumidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('currentCondition').textContent = `Condition: ${data.weather[0].main}`;

                var iconCode = data.weather[0].icon;
                var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
                document.getElementById('conditionIcon').src = iconUrl;
            })
            .catch(error => console.error('Error fetching current weather:', error));

        fetch(fiveDayForecast)
            .then(response => response.json())
            .then(data => {
                // Function to set forecast data
                function setForecastData(dayIndex, dayElementId, iconElementId) {
                    var dayData = data.list[dayIndex];
                    var date = new Date(dayData.dt_txt).toLocaleDateString();
                    var temperature = dayData.main.temp;
                    var windSpeed = dayData.wind.speed;
                    var humidity = dayData.main.humidity;
                    var iconCode = dayData.weather[0].icon;
                    var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
                    var dayElement = document.getElementById(dayElementId);
                    if (dayElement) {
                        dayElement.innerHTML = `
                            <h3>${date}</h3>
                            <img class="forecast-icon" id="${iconElementId}" src="${iconUrl}" alt="Weather Icon">
                            <p>Temperature: ${temperature}°F</p>
                            <p>Wind Speed: ${windSpeed} mph</p>
                            <p>Humidity: ${humidity}%</p>
                        `;
                    }
                }

                setForecastData(0, 'dayOne', 'dayOneIcon');
                setForecastData(8, 'dayTwo', 'dayTwoIcon');
                setForecastData(16, 'dayThree', 'dayThreeIcon');
                setForecastData(24, 'dayFour', 'dayFourIcon');
                setForecastData(32, 'dayFive', 'dayFiveIcon');
            })
            .catch(error => console.error('Error fetching 5-day forecast:', error));
    }
});
