import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let parms = new URLSearchParams(search);
  let city = parms.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let data = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    return data.json();
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM


  for (let i = 0; i < adventures.length; i++) {
    
    let data = document.getElementById("data");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");
    let div5 = document.createElement("div");

    let img = document.createElement("img");
    let h51 = document.createElement("h6");
    let h52 = document.createElement("h6");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let a = document.createElement("a");
    let p3 = document.createElement("p");
    
    a.setAttribute("href","detail/?adventure=" + adventures[i].id);
    a.setAttribute("id",adventures[i].id);
    div1.setAttribute("class","col-6 col-lg-3 mb-4 position-relative");
    div2.setAttribute("class","activity-card");
    div2.setAttribute("id",adventures[i].id);
    div3.setAttribute("class","w-100 text-center p-2 d-md-flex justify-content-between");
    div5.setAttribute("class","w-100 text-center p-2 d-md-flex justify-content-between");
    div4.setAttribute("class","category-banner");

    p3.textContent = adventures[i].category;
    img.setAttribute("src",adventures[i].image);
    h51.textContent = adventures[i].name;
    h52.textContent = "Duration";
    p1.textContent = "₹" +  " " + adventures[i].costPerHead;
    p2.textContent = adventures[i].duration + " Hours";
    
    div5.append(h52);
    div5.append(p2);
  
    div4.append(p3);
    div1.append(div4);
    div1.append(a);
    div2.append(img);

    div3.append(h51);
    div3.append(p1);
    
    div1.append(div2);
    a.append(div4);
    a.append(div2);
    div1.append(div3);
    div2.append(div3);
    div2.append(div5);
    data.append(div1);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(low,high);
  let newList = [];
  if(low == -1 && high == -1){
    return list;
  }
  for(let i = 0; i < list.length; i++)
  {
    if(low <= list[i].duration && high >= list[i].duration)
    {
       newList.push(list[i]);
    }
  }
  if(newList.length == 0){
    return [];
  }
  return newList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newList = [];
  for(let i = 0; i < list.length; i++)
  {
    for(let j = 0; j < categoryList.length; j++)
    {
       if(list[i].category == categoryList[j]){
          newList.push(list[i]);
       }
    }
  }
  if(newList.length == 0){
    return list;
  }
  return newList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let newList = filterByCategory(list,filters.category);
  let low,high;
  if(filters.duration == "")
  {
    low = -1;
    high = -1;

  }else if(filters.duration[0] == '0'){
    low = 0;
    high = 2;

  }else if(filters.duration[0] == '2'){
    low = 2;
    high = 6;

  }else if(filters.duration[0] == '6')
  {
    low = 6;
    high = 12;

  }else
  {
    low = 12;
    high = 100;
  } 
  newList = filterByDuration(newList,low,high);
  console.log(newList);
  return newList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let selectedOldFilter = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return selectedOldFilter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

  let area = document.getElementById("category-list");
  let arr = filters.category;
  for(let i = 0; i < arr.length; i++)
  {   
      let div = document.createElement("div");
      div.setAttribute("class","category-filter");
      let p = document.createElement("p");
      p.textContent = arr[i];
      p.setAttribute("class","mb-0");
      div.append(p);
      area.append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
