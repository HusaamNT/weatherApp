// const currentDay = document.getElementById('currentDay')
// const cDTemp = document.getElementById('cDTemp')
// const cDWind = document.getElementById('cDWind')
// const cDHumidity = document.getElementById('cDHumidity')
// const searchInput = document.getElementById('searchInput')
// const searchButton = document.getElementById('searchButton')

// searchInput.addEventListener("input", function(){
//     var inputValue = this.value;
//     console.log(inputValue)
// })

async function locationRetrival(inputLocation){
    console.log("location")
    const response = await fetch( "http://api.openweathermap.org/geo/1.0/direct?q="+ inputLocation +"&appid=149603609ebf41d4d39209c578af7f8c")
    console.log(response)
    const lat = response.lat
    const lon = response.lon
    console.log(lat)
    console.log(lon)    
    return { lat, lon }
}


async function weatherRetrival(lat, lon){
    console.log("weather")
    const response = await fetch ("api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=149603609ebf41d4d39209c578af7f8c")
    console.log(response)
}

async function searchWeather(){
    console.log("hello")
    const location = await locationRetrival("london");
    const { lat, lon } = location;
    await weatherRetrival(lat, lon)
}

searchWeather()
