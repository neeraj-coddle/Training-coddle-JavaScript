const WEATHER_API_KEY = "50abc938f18876b31b6c290b606e3f75";
const UNSPLASH_API_KEY = "j_NH9t0o_-n70zJjNJQdoOWFHS4LHYgxZQUOJSuP0Fs";

//  1. 
//  A. B. 
function fetchData() {
  const city = document.getElementById("cityName").value;
  const date = document.getElementById("departureDate").value;
  const loading = document.getElementById("loading");
  const list_view = document.getElementById("list_view");
  

  if (!city || !date) return;

  if (new Date(date) < new Date()) return;

  loading.style.display = "block";

  Promise.all([
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + WEATHER_API_KEY + "&units=metric"
    ).then(res => res.json()),

    fetch(
      "https://api.unsplash.com/search/photos?query=" + city + "&client_id=" + UNSPLASH_API_KEY
    ).then(res => res.json())
  ]).then(data => {
    loading.style.display = "none";

    let weather = data[0];
    let image = data[1];
  

    console.log(data);
    console.log(image);
    

    list_view.innerHTML = `
      <h3>${weather.name}, ${weather.sys.country}</h3>
      <p>Temperature: ${weather.main.temp} °C</p>
      <img src="${image.results[0].urls.small}" width="200">
      <br><br>
      <button onclick="saveTrip('${weather.name}','${weather.sys.country}','${date}','${weather.main.temp}')"> Save to My Trips </button>
    `;
  });
}

function clearlist() {
    list_view.innerHTML = " "; 
    document.getElementById("cityName").value = "";
    document.getElementById("departureDate").value = ""; 
}

//  2. 
//  A. 
class Trip {
  constructor(id, city, country, departureDate, weatherSnapshot) {
    this.id = id;
    this.city = city;
    this.country = country;
    this.departureDate = departureDate;
    this.weatherSnapshot = weatherSnapshot;
    // this.dayLeft = weatherSnapshot; 
  }

  getCountdown() {
    let today = new Date();
    let tripDate = new Date(this.departureDate);
    let diff = tripDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

//  B. 
class TravelManager {
  constructor() {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];

    this.trips = savedTrips.map(
    trip => new Trip(trip.id, trip.city, trip.date)
  );
  }

  addTrip(trip) {
    this.trips.push(trip); 
    // this.trips.push(trip.getCountdown()); 
    this.save();
    console.log(this.trips);
  }

  deleteTrip(id) {
    this.trips = this.trips.filter(trip => trip.id !== id);
    this.save(); 
  }

  save() {
    localStorage.setItem("trips", JSON.stringify(this.trips));
  }
}

let manager = new TravelManager();

function saveTrip(city, country, date, temp) {
  let trip = new Trip(
    Date.now(),
    city,
    country,
    date,
    { temperature: temp }
  );

  manager.addTrip(trip);
  showTrips();
}

function showTrips() {
  let tripsbox = document.getElementById("trips");
  tripsbox.innerHTML = "";

  manager.trips.forEach(trip => {
    tripsbox.innerHTML += `
      <div>
        <h4>${trip.city}, ${trip.country}</h4>
        <p>Days left: ${trip.getCountdown()}</p>
        <button onclick="confirmDelete(${trip.id})"> Cancel Trip </button>
      </div>
    `;
  });
}

let tripToDelete = null;

function confirmDelete(id) {
  tripToDelete = id;
  document.getElementById("deletebox").style.display = "block";
}

function deleteTrip() {
  manager.deleteTrip(tripToDelete);
  closedeletebox();
  showTrips();
}

function closedeletebox() {
  document.getElementById("deletebox").style.display = "none";
}

// 

let theme = false;

function toggleTheme() {
  if (theme) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    theme = false;
  } else {
    document.body.style.backgroundColor = "#63718D";
    document.body.style.color = "white";
    theme = true;
  }
}

function debounce(fun,delay) {
  let timer;

  return function() {
    clearTimeout(timer); 

    timer = setTimeout(() =>{
      fun();
    },delay); 
  }
}; 

const dbSearch= debounce(fetchData,500);

document.getElementById("cityName").addEventListener("input",dbSearch); 

showTrips(); 