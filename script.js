document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;

    if (value === "")
        return;
    console.log(value);

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0ac19d0005fb92e8d68e37df09509633";
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);

            let results = "";
            results += '<div class="row tempContainer"><div class="col"><h2 class="city-name">' + json.name + "</h2></div>";
            results += '<div class="col"><div class="col"></div><div class="col"></div></div>';
            results += '<div class="w-100"></div><div class="col"><div class="row tempContainer"><div class="col">';

            for (let i = 0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h1 class="temp-number">' + json.main.temp + " &deg;F</h1>"
            results += "<p>"

            for (let i = 0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";
            results += '</div></div></div>';
            results += '<div class="col tempContainer">';

            results += "<h4>Additional info</h4>";
            results += "<p>Wind speed</p>";

            results += json.wind.speed;

            results += '</div></div>';

            document.getElementById("mainCityCard").innerHTML = results;


        });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=0ac19d0005fb92e8d68e37df09509633";
    fetch(url2)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let forecast = "";
            for (let i = 0; i < json.list.length; i++) {
                forecast += '<div class="col"><div class="weather-card one"><div class="top"><div class="wrapper"><div class="mynav"><a><span'; 
                forecast += 'class="lnr lnr-chevron-left"></span></a><a><span class="lnr lnr-cog"></span></a></div><h3 class="location">';

                forecast += moment(json.list[i].dt_txt).format('MMMM Do YYYY, h a');
                forecast += '</h3><h1 class="heading">';
                
                forecast += json.list[i].weather[0].main;
                forecast += '</h1><p class="temp"><span class="temp-value">';

                forecast += Math.round(json.list[i].main.temp); 
                forecast += '&deg;F</span></p><h3 class="location">Feels like ';

                forecast += Math.round(json.list[i].main.feels_like);
                forecast += ' &deg;F</h3></div></div>';

                forecast += '<div class="bottom"><div class="wrapper"><ul class="forecast"><a href="javascript:;"><span class="lnr lnr-chevron-up go-up"></span></a><li class="active"><span class="infoLabel">Additional Info</span></li><li><span class="infoLabel">Humidity</span><span class="lnr lnr-cloud condition"><span class="temp">';

                // forecast += moment(json.list[i].dt_txt).format('MMMM Do YYYY, h a');

                forecast += json.list[i].main.humidity;
                forecast += '<span class="deg">%</span></span></li><li><span class="infoLabel">Pressure</span><span class="lnr lnr-cloud condition"><span class="temp">';

                forecast += json.list[i].main.pressure;
                forecast += '<span class="deg">%</span></span></li></ul></div></div></div></div>';
                
                // forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'

            }
            console.log(forecast);
            document.getElementById("forecastResults").innerHTML = forecast;
        });
});