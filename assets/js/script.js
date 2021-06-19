var searchBar = document.querySelector("#searchBar");
var searchButton = document.querySelector("#searchButton");
var middleColumn = document.querySelector("#middleColumn");
var favoritesContainer = document.querySelector("#favoritesContainer")
var topTenLi; 
var saveButton; 
var playButton;
var plusSign; 
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

    var songArr = JSON.parse(localStorage.getItem("playlist")) || []; 
    var check = songArr.includes(song + " - " +  artistName)
        
        if (!check) {
    
    favoriteSong = document.createElement("h3");
    favoriteSong.className = "favorite-song-text"
    favoriteSong.textContent = song + " - " +  artistName; 

    

    songArr.push(favoriteSong.textContent);
    localStorage.setItem("playlist", JSON.stringify(songArr));  

    favoritesContainer.append(favoriteSong);
    
    }

    else {
        alert("This song is already in your playlist!");
    }
    // console.log(favoritesContainer.children[0].textContent)
}

var songArr = JSON.parse(localStorage.getItem("playlist")) || []; 
for(var i=0; i<songArr.length; i++) {
    var favoriteSong = document.createElement("h3");
    favoriteSong.className = "favorite-song-text"
    favoriteSong.textContent = songArr[i]; 

    favoritesContainer.append(favoriteSong);

}   
    

searchButton.addEventListener('click', searchArtist);
