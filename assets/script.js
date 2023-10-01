// ```
// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
console.log("i am in script.js")
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=34.7392&lon=112.0099&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial"
var newYorkWeather = "https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=74.0060&appid=3266c576b90d62fe56a4b62feab62ebd&units=imperial"


fetch(weatherApi)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.error(error);
    })



$(document).ready(function () {
    $('#newYorkBtn').click(functtion() {
      
    });
});




// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```
