//personal API key
var apiKey = "a70bff98f001640ddb34c21af870b158";

//function retrieves and displays weather and forecast data
var getWeather = function(currentCity) {
    //this API is needed to retrieve city lat and lon data
    var firstApi = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + apiKey;

    //fetches data from first API
    fetch(firstApi)
        //API fetch passes response
        .then(function(response) {
            //if only triggers if user input is valid
            if (response.ok) {
                //translate response into data we can use
                response.json().then(function(data) {
                    //*in southern accent* latitude and longitude are needed for second API "onecall", "data" is from fetch response, "coord" is the coordinate "folder", lat and lon are the location values  
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    //where we get our actual weather data
                    var secondApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey;
                    //fetches data from second API
                    fetch(secondApi)
                        //API fetch passes response
                        .then(function(response) {
                            //translate response into data we can use
                            response.json().then(function(data) {
                                console.log(data)
                                //gets current date
                                var date = new Date(data.current.dt * 1000);
                                var month = date.getMonth()+1;
                                var day = date.getDate();
                                var year = date.getFullYear();

                                //weather data variables
                                var temp = data.current.temp;
                                var wind = data.current.wind_speed;
                                var humidity = data.current.humidity;
                                var uv = data.current.uvi;
                                //weather is an array and the [0] is the current index 
                                var weatherImg = data.current.weather[0].icon;
                                var weatherImgAlt = data.current.weather[0].description;

                                $("#currentCity").text(currentCity);
                                $("#currentDate").text(month + "/" + day + "/" + year);
                                $("#weatherImg").attr("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
                                $("#weatherImg").attr("alt", weatherImgAlt);
                                $("#temp").text("Temp: " + temp + " \xB0F");
                                $("#wind").text("Wind: " + wind + "MPH");
                                $("#humidity").text("Humidity: " + humidity + "%");
                                $("#uv").text("UV: " + uv);

                                //uv color
                                $("#uv").addClass("badge");
                                if (uv < 4) {
                                    $("#uv").removeClass("bg-danger");
                                    $("#uv").removeClass("bg-warning");
                                    $("#uv").addClass("bg-success");
                                } else if (uv > 7) {
                                    $("#uv").removeClass("bg-success");
                                    $("#uv").removeClass("bg-warning");
                                    $("#uv").addClass("bg-danger");
                                } else {
                                    $("#uv").removeClass("bg-danger");
                                    $("#uv").removeClass("bg-success");
                                    $("#uv").addClass("bg-warning");
                                };
                                
                                //reset forecast
                                $("#forecastSection").empty();

                                //5 day forecast loop
                                for (i = 1; i < 6; i++) {
                                    var forecastDate = new Date(data.daily[i].dt * 1000);
                                    var month = forecastDate.getMonth()+1;
                                    var day = forecastDate.getDate();
                                    var year = forecastDate.getFullYear();

                                    //weather data variables
                                    var temp = Math.floor(data.daily[i].temp.day);
                                    var wind = Math.floor(data.daily[i].wind_speed);
                                    var humidity = data.daily[i].humidity;
                                    //weather is an array and the [0] is the current index 
                                    var weatherImg = data.daily[i].weather[0].icon;
                                    var weatherImgAlt = data.daily[i].weather[0].description;
                                     
                                    //forecast cards
                                    var fcCardEl = document.createElement("div");
                                    var fcBodyEl = document.createElement("div");
                                    var fcDateEl = document.createElement("h3");
                                    var fcTempEl = document.createElement("p");
                                    var fcWindEl = document.createElement("p");
                                    var fcHumidityEl = document.createElement("p");
                                    var fcImgEl = document.createElement("img")

                                    //forecast classes and attributes
                                    $(fcCardEl).addClass("card text-center mt-5 mb-5 bg-dark text-light border-light");
                                    $(fcBodyEl).addClass("card-body");
                                    $(fcDateEl).addClass("card-title");
                                    $(fcTempEl).addClass("card-text")
                                    $(fcWindEl).addClass("card-text");
                                    $(fcHumidityEl).addClass("card-text");
                                    $(fcImgEl).addClass("card-img-top border border-light bg-primary");
                                    $(fcImgEl).attr("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
                                    $(fcImgEl).attr("alt", weatherImgAlt);

                                    //forecast data population
                                    fcDateEl.innerHTML = month + "/" + day + "/" + year;
                                    fcTempEl.innerHTML = "Temp: " + temp + "\xB0F";
                                    fcWindEl.innerHTML = "Wind: " + wind + "MPH";
                                    fcHumidityEl.innerHTML = "Humidity: " + humidity + "%";

                                    //forecast elements appended
                                    $(fcBodyEl).append(fcDateEl, fcTempEl, fcWindEl, fcHumidityEl);
                                    $(fcCardEl).append(fcImgEl, fcBodyEl);
                                    $("#forecastSection").append(fcCardEl);
                                };
                            });
                        });
                });
            }else {
                alert("Invalid Entry!")
            }
        });
}

//search history array
var searchHistory = JSON.parse(localStorage.getItem("history")) || [];

//search city function
$("#searchBtn").on("click", function() {
    var search = $("#searchedCity").val();
    var historyItem = document.createElement("li");
    var deleteBtn = document.createElement("button");
    var index = searchHistory.length



    getWeather(search);
    $("#searchCity").val("")
});
