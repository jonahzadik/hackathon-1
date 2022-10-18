form = document.getElementById("form");
city = document.getElementById("inputfield1");
button = document.getElementById("clickbutton");
body = document.getElementById("body");

function clearContent() {
  document.getElementById("searchcontainer").innerHTML = "";
  document.getElementById("loader").style.display = "block";
  setTimeout(loaded, 2000);
}

function uppercaseLetters(word) {
  const string = word;
  const str = string.toLowerCase();

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
        "\u00B0.";
      let weatherimg =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      document.getElementById("weatherp").textContent = uppercaseLetters(
        data.weather[0].description
      );
      document.getElementById("weatherimg").src = weatherimg;

      if (units === "metric") {
        document.getElementById("windspeedh1").textContent =
          Math.round(data.wind.speed * 10) / 10;
        document.getElementById("windsmallertext").textContent =
          "Meters per Second";
      } else {
        document.getElementById("windspeedh1").textContent =
          Math.round(data.wind.speed * 10) / 10;
        document.getElementById("windsmallertext").textContent =
          "Miles per Hour";
      }
      document.getElementById("winddegh1").textContent = data.wind.deg;
      document.getElementById("suntext1").textContent = epochToJSDate(
        data.sys.sunrise
      );
      document.getElementById("suntext2").textContent = epochToJSDate(
        data.sys.sunset
      );
      let backgroundpick = document.getElementById("backgroundpicker").value;
      document.getElementById("body").style.backgroundColor = backgroundpick;
    })

    .catch((err) => {
      invalidCity();
    });
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

function doRefresh() {
  location.reload();
}

function epochToJSDate(ts) {
  const currentDate = new Date(ts * 1000);
  let str3 = currentDate.toTimeString();
  let splitStr = str3.split(" ");
  return splitStr[0] + " " + splitStr[1];
}

function invalidCity() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("popup").style.display = "block";
}
