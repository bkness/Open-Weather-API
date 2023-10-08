// retrieving dom elements and using local storage to make a element savedCities and access it later
document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('focusedInput');
    var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

    document.getElementById('suggestions').addEventListener('click', function (event) {
        var target = event.target;
        // saving searched data 
        if (target && target.tagName === 'button') {
            // fetches weatehr data for the selected city 
            var cityName = target.textContent;
            fetchWeatherData(cityName);
        }
    });
    // rendering saved cities from local storage as a button that the user can use later for convenience 
    function renderSavedCities() {
        suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = '';

        savedCities.forEach(function (city) {
            // creating city buttons 
            var cityButton = document.createElement('button');
            cityButton.classList.add('btn', 'btn-secondary', 'm-1');
            cityButton.textContent = city;
            cityButton.addEventListener('click', function () {
                // fetching weather data when a saved city button is clicked
                fetchWeatherData(city);
                // displays forecast elements 
                document.querySelectorAll('.forecast-container, .col-md-2, h2').forEach(function (element) {
                    element.style.display = 'block';
                });
            });
            suggestionsContainer.appendChild(cityButton);
        });
    }
    // rendering savd cities with the new adition
    renderSavedCities();
    // event listener to clear the search field text when user clicks on the form 
    searchInput.addEventListener('click', function () {
        this.value = '';
    });
    // event listener to handle my form submit 
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        // grabbing city name from search input \ 
        var cityName = searchInput.value;
        // fetching weather data for searched city 
        fetchWeatherData(cityName);
        
        searchInput.value = '';

        // display forecast elements 
        document.querySelectorAll('.forecast-container, .col-md-2, h2').forEach(function (element) {
            element.style.display = 'block';
        });
        // saving the searched city to local storage 
        if (!savedCities.includes(cityName)) {
            savedCities.push(cityName);
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            // re renders saved cities with the new adition 
            renderSavedCities();
        }
    });
    // fetches a 5 day forecast and current foecast weather data for given city 
    function fetchWeatherData(cityName) {
        var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";
        var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial";
        // fetching data from my apis then turning it into a json so its object data can be accessed and used effectively
        fetch(currentWeatherApi)
            .then(function (response) {
                return response.json();
            })
            // returnes the json arrat 
            .then(function (data) {
                console.log(data);
                // taking element ids and displaying them to our html ids 
                var cityNameDate = dayjs(data.dt * 1000).format('MMMM D, YYYY h:mm A');
                document.getElementById('currentCityNameDate').textContent = data.name + " " + cityNameDate;
                document.getElementById('currentTemp').textContent = "Temperature: " + data.main.temp + "°F";
                document.getElementById('currentWindSpeed').textContent = "Wind Speed: " + data.wind.speed + " mph";
                document.getElementById('currentHumidity').textContent = "Humidity: " + data.main.humidity + "%";
                document.getElementById('currentCondition').textContent = "Condition: " + data.weather[0].main;

                // here i am able to call on the icon data to add the appropriate icon to the current forecast where i have it defined in the html 
                var iconCode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                document.getElementById('conditionIcon').src = iconUrl;
            })
            .catch(function (error) {
                console.error('Error fetching current weather:', error);
            });
        // here i created an element and appended it to forecastHeader to get my retrieved data to respond appropriately
        function showForecastHeading() {
            var forecastHeading = document.createElement('h2');
            forecastHeading.textContent = '5 Day Forecast';
            document.getElementById('forecastContainer').appendChild(forecastHeading);
        }
        // here i created a fetch for my 5 day response json so i can access the correct object properties data and display it to my html containers   
        fetch(fiveDayForecast)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // Here I added some code functions to get icon data to display to each day in the 5 day forecast
                var day1Code = data.list[0].weather[0].icon;
                var day1Icon = "http://openweathermap.org/img/w/" + day1Code + ".png";
                document.getElementById('dayOneIcon').src = day1Icon

                var day2Code = data.list[8].weather[0].icon;
                var day2Icon = "http://openweathermap.org/img/w/" + day2Code + ".png";
                document.getElementById('dayTwoIcon').src = day2Icon

                var day3Code = data.list[16].weather[0].icon;
                var day3Icon = "http://openweathermap.org/img/w/" + day3Code + ".png";
                document.getElementById('dayThreeIcon').src = day3Icon

                var day4Code = data.list[24].weather[0].icon;
                var day4Icon = "http://openweathermap.org/img/w/" + day4Code + ".png";
                document.getElementById('dayFourIcon').src = day4Icon

                var day5Code = data.list[32].weather[0].icon;
                var day5Icon = "http://openweathermap.org/img/w/" + day5Code + ".png";
                document.getElementById('dayFiveIcon').src = day5Icon

                // this is a dayjs method in which i can make the time format readable for the user
                var cityNameDate = dayjs(data.dt * 1000).format('MMMM D, YYYY h:mm A');
                var firstDayData = data.list[0];
                var date = new Date(firstDayData.dt_txt).toLocaleDateString(); // accessing locla storage i can display the users time accurately for current forecast
                var temperature = firstDayData.main.temp;
                var windSpeed = firstDayData.wind.speed;
                var humidity = firstDayData.main.humidity;
                // creating a variable and array that can display data retrieved from the api directly into the html 
                var dayOneElement = document.getElementById('dayOne');
                if (dayOneElement) {
                    dayOneElement.innerHTML = `
                        <h3>${date}</h3>
                        <img class="forecast-icon" id="dayOneIcon" src="${day1Icon}" alt="Weather Icon">
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
                            <img class="forecast-icon" id="dayTwoIcon" src="${day2Icon}" alt="Weather Icon">
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
                            <img class="forecast-icon" id="dayThreeIcon" src="${day3Icon}" alt="Weather Icon">
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
                            <img class="forecast-icon" id="dayFourIcon" src="${day4Icon}" alt="Weather Icon">
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
                            <img class="forecast-icon" id="dayFiveIcon" src="${day5Icon}" alt="Weather Icon">
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
