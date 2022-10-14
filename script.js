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

function loaded() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("dashboardcontainer").style.display = "block";
  document.getElementById("h1title").textContent = "Weather for " + city.value;
}
