let zip = document.getElementById("intake");
let submittedDiv = document.getElementById("submitted");
let displayArea = document.getElementById("weatherDisplay");
let tempCheck = document.getElementById("celcius");
let fetchCode = 'https://api.weatherapi.com/v1/current.json?key=4e70f1b2081d4584835181836241104&q=';
let searchCode = 'http://api.weatherapi.com/v1/search.json?key=4e70f1b2081d4584835181836241104&q=';
let celcius = false;


function retrieval() {
    let city = zip.value;
    if (city === "") {
        city = "guantanamo, cuba";
    }
    code = fetchCode + city;
    fetch(code,  {
        mode: 'cors'
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');            
        }
        return response.json();
    })
    .then(function(data) {
        // Process the retrieved data here   location
        graphicalDisplay(data);
       
    })
    .catch(function(error) {
        // Handle errors here  
        console.error('There was a problem with the fetch operation:', error);
    });
    
}

function graphicalDisplay(data) {
    console.log(data);
    let cityBase = document.createElement("div");
    cityBase.className = "displayCard";
    let loc = document.createElement("div");
    loc.className = "displayLocation";
    loc.textContent = data.location.name + ", " + data.location.region + ", " + data.location.country;
    let locTime = document.createElement("div");
    locTime.className = "info";
    locTime.textContent = data.location.localtime;
    cityBase.appendChild(loc);
    cityBase.appendChild(locTime);
    displayArea.appendChild(cityBase);
    let weatherBase = document.createElement("div");
    weatherBase.className = "weatherCard";
    let curCon = document.createElement("div");
    curCon.className = "info";
    curCon.textContent = data.current.condition.text;
    let feels = document.createElement('div');
    feels.className = "info";
    if (celcius) {
        feels.textContent = "Feeling like: " + data.current.feelslike_c + "°c";
    } else {
        feels.textContent = "Feeling like: " + data.current.feelslike_f + "°f";
    }
    let temp = document.createElement('div');
    temp.className = "info";
    if (celcius) {
        temp.textContent = "Actually: " + data.current.temp_c + "°c";
    } else {
        temp.textContent = "Actually: " + data.current.temp_f + "°f"; 
    }
    let wind = document.createElement('div');
    wind.className = "info";
    if (celcius) {
        wind.textContent = "Wind: " + data.current.wind_kph +"kph, towards " + data.current.wind_dir;
    } else {
        wind.textContent = "Wind: " + data.current.wind_mph + "mph, towards " + data.current.wind_dir; 
    }
    
    weatherBase.appendChild(curCon);
    weatherBase.appendChild(feels);
    weatherBase.appendChild(temp);
    weatherBase.appendChild(wind);
    displayArea.appendChild(weatherBase);
       
}


tempCheck.addEventListener('click', function(){    
    if (celcius) {
        tempCheck.textContent = "Fahrenheit";
        celcius = false;
    } else {
        tempCheck.textContent = "Celsius";
        celcius = true;
    }    
});

submittedDiv.addEventListener('click', function() {   
    displayArea.innerHTML = "";
    retrieval();
});
