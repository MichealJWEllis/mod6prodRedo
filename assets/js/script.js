let openZip = {
    apiKey: "d6e060c4dc0aa83b1279941ee7300f2b",
    fetchLatLon: function (zip) {
        fetch("https://api.openweathermap.org/geo/1.0/zip?zip="
            + zip
            + "&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.fetchWeather(data));
    },
    fetchWeather: function (data) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="
            + data.lat
            + "&lon="
            + data.lon
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        this.fetchFiveDay(data)
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        // console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".feel").innerText = "Feels Like: " + feels_like + "°F";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
        document.querySelector(".search-bar").value = "";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchLatLon(document.querySelector(".search-bar").value)

    },
    fetchFiveDay: function(data){
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat="
        + data.lat
        +"&lon="
        + data.lon
        +"&units=imperial&appid="
        + this.apiKey
        )
        
    }

};

document.querySelector(".search button").addEventListener("click", function () {
    openZip.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        openZip.search();
    }
})



