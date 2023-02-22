import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    console.log(config.backendEndpoint);
    let cities = await fetch(`${config.backendEndpoint}/cities`);
    return cities.json();
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let data = document.getElementById("data");
  let div = document.createElement("div");
  let innerDiv = document.createElement("div");
  let textDiv = document.createElement("div");
  let a = document.createElement("a");
  a.setAttribute("href", "pages/adventures/?city=" + id);
  a.setAttribute("id", id);
  let img = document.createElement("img");
  let h3 = document.createElement("h4");
  let p = document.createElement("p");
  div.setAttribute("class", "col-6 col-sm-6 col-lg-3");
  div.setAttribute("style", "margin-bottom: 30px");
  innerDiv.setAttribute("class", "tile");
  textDiv.setAttribute("class", "tile-text text-center");
  div.append(a);
  a.append(innerDiv);
  innerDiv.append(textDiv);
  textDiv.append(h3);
  textDiv.append(p);
  img.setAttribute("src", image);
  img.setAttribute("alt", id);
  innerDiv.append(img);
  h3.textContent = city;
  p.textContent = description;
  data.append(div);
}

export { init, fetchCities, addCityToDOM };
