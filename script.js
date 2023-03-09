const currentDay = document.getElementById('currentDay')
const cDTemp = document.getElementById('cDTemp')
const cDWind = document.getElementById('cDWind')
const cDHumidity = document.getElementById('cDHumidity')
const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')
const hi = document.getElementById('hi')
const cityName = document.getElementById('cityName')


searchButton.addEventListener("click", async function(event){
    $("#hi").empty()
    $("#cityName").empty()
    event.preventDefault();
    var inputValue = searchInput.value;
    const location = await locationRetrival(inputValue);
    const { lat, lon } = location;
    await weatherRetrival(lat, lon);
})

async function locationRetrival(inputLocation){
    const response = await fetch( "http://api.openweathermap.org/geo/1.0/direct?q="+ inputLocation +"&appid=149603609ebf41d4d39209c578af7f8c")
   const data = await response.json()
    const lat = data[0].lat
    const lon = data[0].lon  
    return { lat, lon }
}


async function weatherRetrival(lat, lon){
    const response = await fetch ("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=149603609ebf41d4d39209c578af7f8c")
    const data = await response.json();
    console.log(data);
    // const day1 = (data.list[3])
    // const day1Temp = (data.list[3].main.temp) - 273;
    // const day1Humid = (data.list[3].main.humidity)
    // const day1Weather = (data.list[3].weather[0].main)
    // const day2 = (data.list[11]);
    // const day3 = (data.list[19]);
    // const day4 = (data.list[27]);
    // const day5 = (data.list[35]);

    const searchedCity = $(`<h1>${data.city.name}</h1>`);

    $("#cityName").append(searchedCity);

    const numbers = [3, 11, 19, 27, 35];
    const dayWeather = {};   

    for (let i = 0; i < numbers.length; i++) {
        dayWeather[`dayTemp${i}`]  = await data.list[numbers[i]].main.temp;
        dayWeather[`dayHumid${i}`]  = await data.list[numbers[i]].main.humidity;
        dayWeather[`dayWeather${i}`]  = await data.list[numbers[i]].weather[0].main;
        dayWeather[`date${i}`]  = await data.list[numbers[i]].dt_txt;
        const num = dayWeather[`dayTemp${i}`] - 273
        const roundedTemp = num.toFixed(1)
       const cards = $(`<div class="card-body">
            <h6 id= "currentDay" class="card-subtitle mb-2 text-muted">${dayWeather[`date${i}`]}</h6>
            <h5 id ="cDTemp" class="card-title">${roundedTemp} degrees</h5>
            <li id="cDWind" class="list-group-item">${dayWeather[`dayWeather${i}`]}</li>
            <li id="cDHumidity" class="list-group-item">Humidity: ${dayWeather[`dayHumid${i}`]}</li>
        </div>`);

    $("#hi").append(cards);
    }
}

async function searchWeather(){
    const location = await locationRetrival("london");
    const { lat, lon } = location;
    await weatherRetrival(lat, lon)
}