
const APIKey = "a4af8bd3c9453f28d775a17a4db79327";
const APIKeyOpenCage = "44188c039a434944afbe3ebfd7112f4d";
var lat;
var lon;
var cityHistory = localStorage.getItem("cityhistory");
if (cityHistory === null) {
    cityHistory = [];

}
else {
    console.log(cityHistory);
    cityHistory = JSON.parse(cityHistory);
for (let index = 0; index < cityHistory.length; index++) {
    let city = cityHistory[index];
    $("#cityhistory").prepend(`<li class="list-group-item">${city}</li>`);
    
}
}

//     lat = position.coords.latitude;
//     lon = position.coords.longitude;

// });/ navigator.geolocation.getCurrentPosition(function (position) {
//
var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var n = weekday[d.getDay()];
console.log(n);

//need a loop to iterate through the days of the week for the five day forecast

document.getElementById("btn").addEventListener("click", query);

function query() {
    document.getElementById("weatherresponse").style.display = "";
    var city = document.getElementById("citysearch").value;
    cityHistory.push(city);
    localStorage.setItem("cityhistory", JSON.stringify(cityHistory));
    $("#cityhistory").prepend(`<li class="list-group-item">${city}</li>`);
    var queryURLLatLng = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=" + APIKeyOpenCage;
    $.ajax({
        url: queryURLLatLng,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURLLatLng);
            console.log(response);

            lat = response.results[0].geometry.lat;
            lon = response.results[0].geometry.lng;
            var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url: queryURLUV,
                method: "GET"
            })
                .then(function (response) {
                    console.log(queryURLUV);
                    console.log(response);
                    $(".UV").html("UV Index: " + response.value);

                });
        });
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    console.log(city);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $(".city").html("<h1>" + response.name + " Weather Details</h1>");

            $(".temp").text("Temperature (F): " + response.main.temp);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $("#day").text(n);
            $("h3").text("5-Day Forecast for " + city);

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });



    var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURLFive,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURLFive);
            console.log(response);
            $(".card-title1").text(weekday[(d.getDay() + 1) % 7]);
            $(".card-title2").text(weekday[(d.getDay() + 2) % 7]);
            $(".card-title3").text(weekday[(d.getDay() + 3) % 7]);
            $(".card-title4").text(weekday[(d.getDay() + 4) % 7]);
            $(".card-title5").text(weekday[(d.getDay() + 5) % 7]);

            //$("#icon1").attr("src", response.list[0].weather[0].icon + ".png");
            $("#icon1").attr("src", "partly cloudy.png");
            $("#temp1").text("Temperature (F): " + response.list[0].main.temp);
            $("#hum1").text("Humidity: " + response.list[0].main.humidity);

            $("#icon2").attr("src", "partly cloudy.png");
            $("#temp2").text("Temperature (F): " + response.list[1].main.temp);
            $("#hum2").text("Humidity: " + response.list[1].main.humidity);

            $("#icon3").attr("src", "partly cloudy.png");
            $("#temp3").text("Temperature (F): " + response.list[2].main.temp);
            $("#hum3").text("Humidity: " + response.list[2].main.humidity);

            $("#icon4").attr("src", "partly cloudy.png");
            $("#temp4").text("Temperature (F): " + response.list[3].main.temp);
            $("#hum4").text("Humidity: " + response.list[3].main.humidity);

            $("#icon5").attr("src", "partly cloudy.png");
            $("#temp5").text("Temperature (F): " + response.list[4].main.temp);
            $("#hum5").text("Humidity: " + response.list[4].main.humidity);

            console.log("Temperature: " + response.list[0].main.temp);
            console.log("Humidity: " + response.list[0].main.humidity);

        });
}







