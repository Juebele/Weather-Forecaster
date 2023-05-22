
var APIKey = "fbc20a5a8f2b76012e2379e08523d2cf";
var city = 

// var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// This function pulls the wind.speed from the API and adds it to the webpage
async function getWindSpeed() {
    const response = await fetch(queryURL);
    const data = await response.json();
    console.log(response)
    const windSpeed = data.wind.speed;
    document.getElementById('windspeed').textContent = windSpeed;
    console.log(windSpeed);
  }
  
//   getWindSpeed();


// windspeed.then(windSpeed => console.log(windSpeed));

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// function getLocalStorage() {
//     document.getElementById("search-1").innerHTML = (searchHistory)[0];
//     document.getElementById("search-2").innerHTML = (searchHistory)[1];
//     document.getElementById("search-3").innerHTML = (searchHistory)[2];
//     document.getElementById("search-4").innerHTML = (searchHistory)[3];
//     document.getElementById("search-5").innerHTML = (searchHistory)[4];
//     }

function fetchCity() {

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    searchHistory.unshift(city);

    searchHistory.splice(5);

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    console.log(searchHistory);

    // localStorage.setItem("City", );
    // console.log(localStorage);

    city = document.getElementById("city-bar").value;
    console.log(city)

    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    
    fetch(cityURL)
    .then(function (response) {
        console.log(response);
        if (response.status === 200) {
            response.textContent = response.status;
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        document.getElementById("city-name").innerHTML = "Current weather in " + data["name"];
        document.getElementById("windspeed-span").innerHTML = "Current windspeed: " + data["wind"]["speed"] + " miles per hour";
        document.getElementById("weather-span").innerHTML = "Weather condition: " + data["weather"][0]["description"];
        document.getElementById("feels-span").innerHTML = "Feels like: " + ((data["main"]["feels_like"] - 273.15) * (9/5) + 32) + "F";
        let lat = data["coord"]["lat"];
        let lon = data["coord"]["lon"];
        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
        fetch(forecastURL)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                response.textContent = response.status;
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log (data["city"]);
            document.getElementById("forecast=1").innerHTML = "Day 1 Outlook: feels like " + ((data["list"][0]["main"]["feels_like"] - 273.15) * (9/5) + 32) + "F";
            document.getElementById("forecast=2").innerHTML = "Day 2 Outlook: feels like " + ((data["list"][8]["main"]["feels_like"] - 273.15) * (9/5) + 32) + "F";
            document.getElementById("forecast=3").innerHTML = "Day 3 Outlook: feels like " + ((data["list"][16]["main"]["feels_like"] - 273.15) * (9/5) + 32) + "F";
            document.getElementById("forecast=4").innerHTML = "Day 4 Outlook: feels like " + ((data["list"][24]["main"]["feels_like"] - 273.15) * (9/5) + 32) + "F";
            document.getElementById("forecast=5").innerHTML = "Day 5 Outlook: feels like " + ((data["list"][32]["main"]["feels_like"] - 273.15) * (9/5) + 32) + "F";
        });
        });
    };


        // window.onload = getLocalStorage()