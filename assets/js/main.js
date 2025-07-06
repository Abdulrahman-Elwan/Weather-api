let dataWeather = document.getElementById("dataWeather");
let valueInputSearch = document.getElementById("inputSearch");
let btnFindLocation = document.getElementById("findLocation");
var content = ``;
var selectedCity ;

valueInputSearch.addEventListener('input', () => {
    let myHttpSearch = new XMLHttpRequest()
    myHttpSearch.open('GET' , `https://api.weatherapi.com/v1/search.json?key=086035bdb54f41ee84b83802250307&q=${valueInputSearch.value}`);
    myHttpSearch.send();

    myHttpSearch.addEventListener('load' , ()=>{
        let myHttpSearchJSON = JSON.parse(myHttpSearch.response);
        console.log(myHttpSearchJSON[0]);
        selectedCity = valueInputSearch.value;
        if(selectedCity.length >= 3 ){
            weather();
        }else{
            knowLocation()
        }
    });
});
function knowLocation(){
    let myHttpLocation = new XMLHttpRequest();
    myHttpLocation.open('GET' , 'https://api.weatherapi.com/v1/timezone.json?key=086035bdb54f41ee84b83802250307&q=LOCATION');
    myHttpLocation.send();
    myHttpLocation.addEventListener('load' , ()=>{
        dataJsonlocation = JSON.parse(myHttpLocation.response);
        selectedCity = dataJsonlocation.location.name;
        weather();
    });
}
function renderCurrentWeather(){
    let myHttp = new XMLHttpRequest();
    myHttp.open('GET', `http://api.weatherapi.com/v1/current.json?key=086035bdb54f41ee84b83802250307&q=${selectedCity}`);
    myHttp.send();
    myHttp.addEventListener('load', () => {
        let apiVal = JSON.parse(myHttp.response);
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let d = new Date();

        let cartona = `
            <div class="col-md-4 d-flex">
                <div class="weather-card h-100 w-100 d-flex flex-column">
                    <div class="day d-flex justify-content-between text-white text-opacity-75">
                        <span class="day text-end">${days[(d.getDay() + 1) % 7]}</span>
                        <span class="day text-end">${(d.getDay())}${month[d.getMonth()]}</span>
                    </div>
                    <div class="dataWeather pt-5 ps-4 pb-4 flex-grow-1 d-flex flex-column justify-content-between">
                        <div class="d-flex flex-column align-items-start">
                            <h2 class="text-white text-opacity-75 fs-4">${apiVal.location.name}</h2>
                            <span
                                class="temp fw-bold text-white my-3">${apiVal.current.temp_c}<sup>o</sup>C</span>
                            <span><img src="${apiVal.current.condition.icon}" width="100px"
                                    alt="sun"></span>
                            <span class="text-info mb-3 fs-5">${apiVal.current.condition.text}</span>
                        </div>
                        <div class="d-flex gap-4 mt-3">
                            <div>
                                <img src="assets/image/icon-umberella.png" alt="umberella">
                                <span
                                    class="fs-6 fw-bold text-light text-opacity-75">${apiVal.current.humidity}%</span>
                            </div>
                            <div>
                                <img src="assets/image/icon-wind.png" alt="wind">
                                <span
                                    class="fs-6 fw-bold text-light text-opacity-75">${apiVal.current.wind_kph}km/h</span>
                            </div>
                            <div>
                                <img src="assets/image/icon-compass.png" alt="compass">
                                <span
                                    class="fs-6 fw-bold text-light text-opacity-75">${apiVal.current.wind_dir}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        content += cartona;
    })
}
function renderForecastWeather(){
    let tomoroMyHttp = new XMLHttpRequest()
    tomoroMyHttp.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=086035bdb54f41ee84b83802250307&&q=${selectedCity}&days=7`);
    tomoroMyHttp.send();
    tomoroMyHttp.addEventListener('load', () => {
        let apiVal2 = JSON.parse(tomoroMyHttp.response);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let d = new Date();

        let cartona = `
            <div class="col-md-4 d-flex grid2">
                <div class="weather-card h-100 w-100 d-flex flex-column">
                    <div
                        class="day d-flex justify-content-center align-items-center text-white text-opacity-75">
                        <span class="day">${days[(d.getDay() + 2) % 7]}</span>
                    </div>
                    <div class="dataWeather_2 pt-5 ps-4 pb-4 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                        <span>
                            <img src="${apiVal2.forecast.forecastday[0].day.condition.icon}" alt="sun" width="80px">
                        </span>
                        <span class="temp-high fw-bold text-white fs-4 mt-4">${apiVal2.forecast.forecastday[0].day.maxtemp_c}<sub>o</sub>C</span>
                        <span class="temp-low fw-bold text-white text-opacity-50 mt-1 mb-3">${apiVal2.forecast.forecastday[0].day.mintemp_c}<sub>o</sub></span>
                        <span class="text-info mb-3 fs-5">${apiVal2.forecast.forecastday[0].day.condition.text}</span>
                    </div>
                </div>
            </div>

            <div class="col-md-4 d-flex">
                <div class="weather-card h-100 w-100 d-flex flex-column">
                    <div class="day d-flex justify-content-center align-items-center text-white text-opacity-75">
                        <span class="day">${days[(d.getDay() + 3) % 7]}</span>
                    </div>
                    <div class="dataWeather pt-5 ps-4 pb-4 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                        <span><img src="${apiVal2.forecast.forecastday[1].day.condition.icon}" alt="sun" width="80px"></span>
                        <span class="temp-high fw-bold text-white fs-4 mt-4">${apiVal2.forecast.forecastday[1].day.maxtemp_c}<sub>o</sub>C</span>
                        <span class="temp-low fw-bold text-white text-opacity-50 mt-1 mb-3">${apiVal2.forecast.forecastday[1].day.mintemp_c}<sub>o</sub></span>
                        <span class="text-info mb-3 fs-5">${apiVal2.forecast.forecastday[1].day.condition.text}</span>
                    </div>
                </div>
            </div>
        `
        content += cartona;
        dataWeather.innerHTML = content;
    });
}
function weather() {
    content = ``;
    renderCurrentWeather();
    renderForecastWeather();
};
knowLocation();
