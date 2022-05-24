const weatherIcons = {
    "Rain" : "wi wi-day-rain",
    "Clouds" : "wi wi-day-cloudy",
    "Clear" : "wi wi-day-sunny",
    "Snow" : "wi wi-day-snow",
    "Mist" : "wi wi-day-fog",
    "Drizzle" : "wi wi-day-sleet",
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true){
    let ville;
if (withIP){
 const ip = await fetch("https://api.ipify.org?format=json")
    .then(resultat => resultat.json())
    .then(json => json.ip)
   
  ville = await fetch("http://api.ipstack.com/"+ ip +"?access_key=f25cdfd552cabed5c24eb79b7f16a489")
    .then(resultat => resultat.json())
    .then(json => json.city)
}else {
        ville = document.querySelector("#ville").textContent
    }  
   const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=1db0425d0a9ff248166860512c9931d0&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)
    







  setTimeout(displayweatherfunction(meteo),1000)
console.log(meteo)

}
async function displayweatherfunction(data){
   const name = data.name
   const temperature = data.main.temp
   const conditions = data.weather[0].main
   const description = data.weather[0].description
   const lat = data.coord.lat
   const lon = data.coord.lon
   let timezone = data.timezone  
   timezone = timezone / 3600
   console.log("dans fonction",timezone)
 
   
   
   document.querySelector("#ville").textContent = name
   document.querySelector("#timezone").textContent = timezone
   document.querySelector("#temperature").textContent = Math.round(temperature)
   document.querySelector("#conditions").textContent = capitalize(description)
   document.querySelector("i.wi").className = weatherIcons[conditions]
   document.body.className = conditions.toLowerCase()
   console.log(lat)
   console.log(lon)
   const timez = await fetch (`http://api.timezonedb.com/v2.1/get-time-zone?key=A9DZ6712JGWD&format=json&by=position&lat=${lat}&lng=${lon}`)
     .then(resultat => resultat.json())
     .then(json =>myConvertH(json.formatted))
     console.log(timez)
     document.querySelector("#dateheure").textContent = timez
    
}
const ville = document.querySelector("#ville");


ville.addEventListener("click" , () =>{
    ville.contentEditable = true;
})

ville.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 ){
        e.preventDefault();
        ville.contentEditable = false;
        main(false)
    }
})
main()
function pause(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

 async function myConvertH(strD) {while(true){
    await pause(1000);

     return new Date(strD).getHours()+"h" + new Date(strD).getMinutes() +"m" }}
