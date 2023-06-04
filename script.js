let url =
  "https://api.nasa.gov/planetary/apod?api_key=5e5ISXg0fzccF4iO8MK47l7y4SRGSlIxn5Q2GSD3";

fetch(url)
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    console.log(data);
    let imgDiv = document.getElementById("current- image-container");

    let frame = document.getElementById("myFrame");

    frame.src = `${data.hdurl}`;
  });

const btn = document.getElementById("btn");
btn.addEventListener("click", getImage);

// get new image based on date//////
// let dateArray = [];
// localStorage.setItem("Dates", JSON.stringify(dateArray));

function getImage(e) {
  e.preventDefault();
  let date = document.getElementById("search-date").value;
  console.log("date", date);
  saveSearch(date);
  getImageOfTheDay(date);

  addSearchToHistory(date);
}

function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("Dates")) || [];
  searches.push(date);
  localStorage.setItem("Dates", JSON.stringify(searches));
}

function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = "javascript:void(0)";
  link.textContent = date;
  link.addEventListener("click", function () {
    // Fetch and display the image for the clicked date
    getImageOfTheDay(date);
  });
  li.appendChild(link);
  searchHistory.appendChild(li);
}

function getImageOfTheDay(date) {
  let url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=5e5ISXg0fzccF4iO8MK47l7y4SRGSlIxn5Q2GSD3`;
  fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      let frame = document.getElementById("myFrame");

      frame.src = `${data.hdurl}`;
    });
}
