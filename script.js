form = document.getElementById("form");
city = document.getElementById("inputfield1");
button = document.getElementById("clickbutton");
body = document.getElementById("body");

function clearContent() {
  document.getElementById("searchcontainer").innerHTML = "";
  console.log(city.value);
  document.getElementById("loader").style.display = "block";
  setTimeout(loaded, 2000);
}

let hi = hi;

function uppercaseLetters(word) {
  const str = word;

  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
}

units = "metric";

function loaded() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city.value +
      "&APPID=c9550dd3b34836e2644d01163fc26300&units=" +
      units
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.main.temp);
      console.log(data.main.humidity);
      console.log(data.wind.speed);
      console.log(data.weather[0].description);
      document.getElementById("h1title").textContent =
        "Weather for " + uppercaseLetters(city.value) + ", " + data.sys.country;
      document.getElementById("loader").style.display = "none";
      document.getElementById("dashboardcontainer").style.display = "block";
      document.getElementById("weatherh1").textContent =
        Math.floor(data.main.temp) + "\u00B0";
      document.getElementById("humiditypercent").textContent =
        Math.floor(data.main.humidity) + "%";
      document.getElementById("humiditytext").textContent =
        "The Humidity is making it feel like " +
        Math.floor(data.main.feels_like) +
        "\u00B0";
      let weatherimg =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      document.getElementById("weatherp").textContent = uppercaseLetters(
        data.weather[0].description
      );
      document.getElementById("weatherimg").src = weatherimg;
    })

    .catch((err) => location.reload());
}

function isclicked() {
  let x = document.getElementById("toggle").checked;

  if (x == false) {
    units = "metric";
    loaded();
  } else {
    units = "imperial";
    loaded();
  }
}
