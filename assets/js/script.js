var apiKey = "a70bff98f001640ddb34c21af870b158"

var getWeather = function(currentCity) {
    var firstApi = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + apiKey

    fetch(firstApi)
        .then(function(response) {
            response.json().then(function(data) {
                var lat = data.coord.lat
                var lon = data.coord.lon
                console.log(lat, lon)
            })
        })
}

$("#searchBtn").on("click", function() {
    var search = $("#searchedCity").val()
    getWeather(search);
});