var searchBar = document.querySelector("#searchBar");
var searchButton = document.querySelector("#searchButton");
var middleColumn = document.querySelector("#middleColumn");
var favoritesContainer = document.querySelector("#favoritesContainer")
var topTenLi; 
var saveButton; 

// fetch random images for JukeBox backgound
var getBgImage = function() {

function getRandomID(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  console.log(getRandomID(0, 22))
  var id = getRandomID(0, 20);
  console.log(id)
  fetch(
   'https://pixabay.com/api/?key=22067836-edc999cde81df27042e207bfa&q=music&category=backgrounds&image_type=illustration$orientation=horizontal'
  )
  //convert response to JSON
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    // use querySelctor to display ID
   var bgimg = response.hits[id].largeImageURL
   console.log ("Pic URL is: " + bgimg)
    var responseContainerEl = document.querySelector('.hero').style.background="url(" + bgimg + ") no-repeat";

  });
}

// this is the widget src atrrtibute prefix/suffix of the iframe src
const widgetSrcPrefix = 'https://widget.deezer.com/widget/dark/album/';
const widgetSrcSuffix =
  '?app_id=457142&autoplay=false&radius=true&tracklist=true';

// const apiURL = `https://api.deezer.com/user/2529`;
// const apiURL = `https://api.deezer.com/search?q=${artist}`;

var fetchMusic = function (artist) {
  fetch(`https://api.deezer.com/search?q=${artist}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayArtist(data);
    });
};

var searchArtist = function () {
  userSearch = searchBar.value;
  fetchMusic(userSearch);
};

var displayArtist = function (artistData) {
  middleColumn.innerHTML = '';
  console.log(artistData);

  var image = document.createElement('img');
  image.setAttribute('src', artistData.data[0].artist.picture_medium);
  image.className = 'artist-image';

  var artistNameBox = document.createElement('div');
  artistNameBox.className = 'artist-name-box';

  var artist = document.createElement('h2');
  artist.textContent = artistData.data[0].artist.name;
  artist.className = 'artist-name';
  artistNameBox.append(artist);

  var topTenBox = document.createElement('div');
  topTenBox.className = 'top-ten-box';

  var topTenHeading = document.createElement('h2');
  topTenHeading.textContent = 'Top Ten Tracks';
  topTenHeading.className = 'top-ten-heading';

  topTenBox.append(topTenHeading);

  var topTenOl = document.createElement('ol');
  topTenOl.className = 'top-ten-ol';

  for (var i = 0; i < 10; i++) {
    topTenLi = document.createElement('li');
    topTenLi.id = artistData.data[i].album.id;

    topTenLi.textContent = artistData.data[i].title;
    topTenLi.className = 'top-ten-li';
    topTenOl.append(topTenLi); 

    saveButton = document.createElement("button");
    saveButton.className = "save-button";
    topTenLi.append(saveButton); 

    saveButton.addEventListener("click", function(event){saveSong(event.target.parentElement.textContent, artist)}); 

    topTenLi.addEventListener('click', function (event) {
      console.log(event.path[0].id);
      document.getElementById('deezer-widget').src =
        widgetSrcPrefix + event.path[0].id + widgetSrcSuffix;
    });
  }

  topTenBox.append(topTenOl);

  middleColumn.append(image);
  middleColumn.append(artistNameBox);
  middleColumn.append(topTenBox);
};

var saveSong = function(song, artist) {

    var artistName = artist.textContent;

    favoriteSong = document.createElement("h3");
    favoriteSong.className = "favorite-song-text"
    favoriteSong.textContent = song + " - " +  artistName; 


    localStorage.setItem("song", JSON.stringify(song)); 


    favoritesContainer.append(favoriteSong);
    

    middleColumn.append(image);
    middleColumn.append(artistNameBox);
    middleColumn.append(topTenBox)


    var fetchLyrics = function(slyrics) {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${artist}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data){
            displayArtist(data); 
        })
    }
    
    console.log(favoritesContainer.children[0].textContent)
}

searchButton.addEventListener('click', searchArtist);

