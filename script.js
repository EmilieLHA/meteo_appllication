const cleAPI = "TBD";

// Selection des éléments du DOM 

let logoMeteo = document.querySelector(".logo");

let ville = document.querySelector(".ville");
let meteo = document.querySelector(".meteo");
let temperatureActuelle = document.querySelector(".temperatureActuelle");

let heures = document.querySelectorAll(".heure");

let temperaturesParHeure = document.querySelectorAll(".temperatureParHeure");
let jours = document.querySelectorAll(".jour");

console.log(jours);

let temperaturesParJour = document.querySelectorAll(".temperatureParJour");

let conteneur = document.querySelector(".container");

// Geolocalisation

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(success, error, options);

    var options = {
        enableHighAccuracy : true,
        timeout: 5000,
        maximumAge: 0
    };
    
    function success(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        appelAPI(lat, lon);
    };

    function error(position) {
        alert("Veuillez activer la géolocalisation");
        let lat = 48.90882612473876;
        let lon = 2.3430534073065727;
        appelAPI(lat, lon);
    };

} else {
    let lat = 48.90882612473876;
    let lon = 2.3430534073065727;
    appelAPI(lat, lon);
};

// Appel API et renseignement des données

function appelAPI(lat, lon) {

    // Renseignement de la ville 

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${cleAPI}`)
    .then((reponseA) => {
        return reponseA.json();
    })
    .then((reponseB) => {
        ville.innerText = reponseB.name;
    })

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${cleAPI}&exclude=minutely,alerts&units=metric&lang=fr`;
    console.log(url);

    fetch(url)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {

        let resultatsAPI = data;

        // Renseignement ligne 2 

        meteo.innerText = resultatsAPI.current.weather[0].description;
        temperatureActuelle.innerText = `${Math.round(resultatsAPI.current.temp)}°C`;
        
        logoMeteo.src= `ressources/logo/${resultatsAPI.current.weather[0].icon}.svg`

        // Renseignement ligne 3 

        let heureActuelle = new Date().getHours();
        let heureSuivante = [];

        for (let i = 0; i < heures.length; i++) {
                heureSuivante[i] = heureActuelle + (i+1)*3;
                if (heureSuivante[i] > 24) {
                    heureSuivante[i]-=24;
                } 
                heures[i].innerText = `${heureSuivante[i]} h`;
                temperaturesParHeure[i].innerText= `${Math.round(resultatsAPI.hourly[i+1].temp)}°C`;
        }

        // Renseignement ligne 3 

        let tableauDesJours = [];

        for (let i = 0; i < 6; i++) {

            tableauDesJours[i] = new Date(resultatsAPI.daily[i+1].dt*1000).toLocaleString('fr-FR', {weekday: 'long'});

            jours[i].innerText = tableauDesJours[i].slice(0,3);

            temperaturesParJour[i].innerText = `${Math.round(resultatsAPI.daily[i+1].temp.day)}°C`;
        }

        // Affichage en fade

        conteneur.classList.add('fade-in');

    });
}
