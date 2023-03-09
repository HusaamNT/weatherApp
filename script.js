const currentDay = document.getElementById('currentDay')
const cDTemp = document.getElementById('cDTemp')
const cDWind = document.getElementById('cDWind')
const cDHumidity = document.getElementById('cDHumidity')
const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')


searchButton.addEventListener("click", async function(event){
    event.preventDefault();
    var inputValue = searchInput.value;
    const location = await locationRetrival(inputValue);
    const { lat, lon } = location;
    await weatherRetrival(lat, lon)
})

async function locationRetrival(inputLocation){
    const response = await fetch( "http://api.openweathermap.org/geo/1.0/direct?q="+ inputLocation +"&appid=149603609ebf41d4d39209c578af7f8c")
   const data = await response.json()
    const lat = data[0].lat
    const lon = data[0].lon  
    return { lat, lon }
}


async function weatherRetrival(lat, lon){
    console.log("weather")
    const response = await fetch ("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=149603609ebf41d4d39209c578af7f8c")
    console.log(response)
    const data = await response.json()
    console.log(data.list[3])
    console.log(data.list[11])
    console.log(data.list[19])
    console.log(data.list[27])
    console.log(data.list[35])
}

async function searchWeather(){
    const location = await locationRetrival("london");
    const { lat, lon } = location;
    await weatherRetrival(lat, lon)
}

//searchWeather()

console.log()