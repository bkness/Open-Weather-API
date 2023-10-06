document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('focusedInput');
    // using local storage to save city search information to a savedCities
    var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
    // here i am creating a function and and element by my id suggestions in the html
    function renderSavedCities() {
        suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = '';
        //here im using the forEach funtion as a loop to create multiple buttons when a city is searched and the save into local storage - it will then load onto the page as a button the user can click
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
    // renders saved cities to page on load
    renderSavedCities()

    var searchInput = document.getElementById('focusedInput');
    searchInput.addEventListener('click', function () {
        this.value = '';
    })

    // event listener for form submission
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // prevent the form from actually submitting

        var cityName = searchInput.value;
        fetchWeatherData(cityName);

        // shows all of my forecast contianers with the block display
        document.querySelectorAll('.forecast-container, .col-md-2, h2').forEach(function (element) {
            element.style.display = 'block';
        });
        //saving searched cities to local storage
        if (!savedCities.includes(cityName)) {
            savedCities.push(cityName);
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            renderSavedCities();
        }        

    });

    function fetchWeatherData(cityName) {
        var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";
        var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";

        // fetch current weather data using a function that we turned into a json so we can pull and use data from the array returned
        fetch(currentWeatherApi)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var cityNameDate = dayjs(data.dt * 1000).format('MMMM D, YYYY h:mm A'); // here i used day js to show time in a readable form to the user
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

        // Fetching 5 day forecast
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
            })
            .catch(function (error) {
                console.error('Error fetching 5-day forecast:', error);
            });
    }
});



