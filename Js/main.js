
async function getWeatherData(location) {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +
      location +
      "&aqi=no"
  )
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  if (response.error) {
    alert(response.error.message);
  } else {
    document.getElementById("temperature").innerHTML =
      response.current.temp_c + "°";
    document.getElementById("feelsLike").innerHTML =
      "Feels " + response.current.feelslike_c + "°";
    var image = document.getElementById("weatherIcon");
    if (response.current.condition.text === "Overcast") {
      image.src = "image/overcast.svg";
    } else if (response.current.condition.text === "Sunny") {
      image.src = "image/sunny.svg";
    } else if (response.current.condition.text === "Mist") {
      image.src = "image/mist.svg";
    } else if (response.current.condition.text === "Clear") {
      image.src = "image/clear.svg";
    } else {
      image.src = "image/icon3.png";
    }
  }
}
// on enter key
// document.addEventListener("keydown", (e) => {
//   if (e.key == "Enter") {
//     var loc = document.getElementById("location-input").value;
//     if (loc == null || loc == "") {
//       document.getElementById("temperature").innerHTML = "0°";
//       document.getElementById("feelsLike").innerHTML = "Feels 0°";
//     } else {
//       getWeatherData(loc);
//     }
//   }
// });

function open_menu() {
  var clicked = document.getElementById("drop-menu");
  if (clicked.style.display == "block") {
    clicked.style.display = "none";
  } else {
    clicked.style.display = "block";
  }
}

function createDropdownList() {
  var select = document.getElementById("location-input");
  var elmts = [
    "Kolkata",
    "London",
    "San Fransisco",
    "Mumbai",
    "Chennai",
    "Orissa",
    "Agra",
    "Bangalore",
    "Gujarat",
    "Hyderabad",
  ];
  for (var i = 0; i < elmts.length; i++) {
    var op = elmts[i];
    var el = document.createElement("li");
    el.textContent = op;
    // el.value = op;
    select.appendChild(el);
    // el.classList.add('location')
  }
}
createDropdownList();

var ele = document.querySelectorAll("#location-input li");
ele.forEach((element) => {
  element.addEventListener("click", () => {
    document.getElementById("location").innerHTML = element.textContent;
    var clicked = document.getElementById("drop-menu");
    clicked.style.display = "none";
    var loc = element.textContent;
    if (loc == null || loc == "") {
      document.getElementById("temperature").innerHTML = "0°";
      document.getElementById("feelsLike").innerHTML = "Feels 0°";
    } else {
      getWeatherData(loc);
    }
  });
});
