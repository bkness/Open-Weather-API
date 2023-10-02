# open-weather-api
a weather api to give you a forecast based on where the user sets a location to




// ```
// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```
      <button id="newYorkBtn" class="btn btn-primary m-1" style="border-radius: 7px;">Los Angeles</button>
          <button id="newYorkBtn" class="btn btn-primary m-1" style="border-radius: 7px;">Chicago</button>
          <button id="newYorkBtn" class="btn btn-primary m-1" style="border-radius: 7px;">Phoenix</button>
          <button id="newYorkBtn" class="btn btn-primary m-1" style="border-radius: 7px;">Orlando</button>
        </div>

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