document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('focusedInput');
    var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

    document.getElementById('suggestions').addEventListener('click', function (event) {
        var target = event.target;

        if (target && target.tagName === 'BUTTON') {
            var cityName = target.textContent;
            fetchWeatherData(cityName);
        }
    });

    function renderSavedCities() {
        suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = '';

        savedCities.forEach(function (city) {
            var cityButton = document.createElement('button');
            cityButton.classList.add('btn', 'btn-secondary', 'm-1');
            cityButton.textContent = city;
            cityButton.addEventListener('click', function () {
                fetchWeatherData(city);
            });
            suggestionsContainer.appendChild(cityButton);
        });
    }

    renderSavedCities();

    searchInput.addEventListener('click', function () {
        this.value = '';
    });

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        var cityName = searchInput.value;
        fetchWeatherData(cityName);

        document.querySelectorAll('.forecast-container, .col-md-2, h2').forEach(function (element) {
            element.style.display = 'block';
        });

        if (!savedCities.includes(cityName)) {
            savedCities.push(cityName);
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            renderSavedCities();
        }
    });

    function fetchWeatherData(cityName) {
        var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";
        var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";

        fetch(currentWeatherApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var cityNameDate = dayjs(data.dt * 1000).format('MMMM D, YYYY h:mm A');
                document.getElementById('currentCityNameDate').textContent = data.name + " " + cityNameDate;
                document.getElementById('currentTemp').textContent = "Temperature: " + data.main.temp + "°F";
                document.getElementById('currentWindSpeed').textContent = "Wind Speed: " + data.wind.speed + " mph";
                document.getElementById('currentHumidity').textContent = "Humidity: " + data.main.humidity + "%";
                document.getElementById('currentCondition').textContent = "Condition: " + data.weather[0].main;

                var iconCode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                document.getElementById('conditionIcon').src = iconUrl;
            })
            .catch(function (error) {
                console.error('Error fetching current weather:', error);
            });

        function showForecastHeading() {
            var forecastHeading = document.createElement('h2');
            forecastHeading.textContent = '5 Day Forecast';
            document.getElementById('forecastContainer').appendChild(forecastHeading);
        }

        fetch(fiveDayForecast)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                var cityNameDate = dayjs(data.dt * 1000).format('MMMM D, YYYY h:mm A');
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
                date = new Date(secondDayData.dt_txt).toLocaleDateString(); 
                temperature = secondDayData.main.temp; 
                windSpeed = secondDayData.wind.speed; 
                humidity = secondDayData.main.humidity;
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
                date = new Date(thirdDayData.dt_txt).toLocaleDateString(); 
                temperature = thirdDayData.main.temp;
                windSpeed = thirdDayData.wind.speed;
                humidity = thirdDayData.main.humidity;
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
                date = new Date(fourthDayData.dt_txt).toLocaleDateString(); 
                temperature = fourthDayData.main.temp; 
                windSpeed = fourthDayData.wind.speed;
                humidity = fourthDayData.main.humidity; 
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
                date = new Date(fifthDayData.dt_txt).toLocaleDateString(); 
                temperature = fifthDayData.main.temp; 
                windSpeed = fifthDayData.wind.speed;
                humidity = fifthDayData.main.humidity; 
                var dayFiveElement = document.getElementById('dayFive');
                if (dayFiveElement) {
                    dayFiveElement.innerHTML = `
                            <h3>${date}</h3>
                            <p>Temperature: ${temperature}°F</p>
                            <p>Wind Speed: ${windSpeed} mph</p>
                            <p>Humidity: ${humidity}%</p>
                        `;
                }
            })
            .catch(function (error) {
                console.error('Error fetching 5-day forecast:', error);
            });
    }
});
