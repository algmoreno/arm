var searchBar = document.querySelector("#searchBar");
var searchButton = document.querySelector("#searchButton");
var middleColumn = document.querySelector("#middleColumn");
var favoritesContainer = document.querySelector("#favoritesContainer")
var topTenLi; 
var saveButton; 

var fetchMusic = function(artist) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${artist}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        displayArtist(data); 
    })
}

var searchArtist = function () {
    userSearch = searchBar.value; 
    fetchMusic(userSearch); 
}

var displayArtist = function (artistData) {
    middleColumn.innerHTML = "";
    console.log(artistData); 

    var image = document.createElement("img");
    image.setAttribute("src", artistData.data[0].artist.picture_medium);
    image.className = "artist-image"; 

    var artistNameBox = document.createElement("div");
    artistNameBox.className = "artist-name-box";
    
    var artist = document.createElement("h2"); 
    artist.textContent = artistData.data[0].artist.name; 
    artist.className= "artist-name"; 
    artist.id = "artistName"
    artistNameBox.append(artist);

    var topTenBox = document.createElement("div");
    topTenBox.className = "top-ten-box";

    var topTenHeading = document.createElement("h2");
    topTenHeading.textContent = "Top Ten Tracks";
    topTenHeading.className= "top-ten-heading"; 

    topTenBox.append(topTenHeading); 

    var topTenOl = document.createElement("ol");
    topTenOl.className = "top-ten-ol";

    for (var i = 0; i < 10; i++) {
    topTenLi = document.createElement("li");
    topTenLi.textContent = artistData.data[i].title;  
    topTenLi.className = "top-ten-li";
    topTenOl.append(topTenLi); 

    saveButton = document.createElement("button");
    saveButton.className = "save-button";
    topTenLi.append(saveButton); 

    saveButton.addEventListener("click", function(event){saveSong(event.target.parentElement.textContent, artist)}); 
    }

    topTenBox.append(topTenOl);

    middleColumn.append(image);
    middleColumn.append(artistNameBox);
    middleColumn.append(topTenBox)
}

var saveSong = function(song, artist) {

    var artistName = artist.textContent;

    favoriteSong = document.createElement("h3");
    favoriteSong.className = "favorite-song-text"
    favoriteSong.textContent = song + " - " +  artistName; 


    localStorage.setItem("song", JSON.stringify(song)); 


    favoritesContainer.append(favoriteSong);
    

    console.log(favoritesContainer.children[0].textContent)
}


searchButton.addEventListener("click", searchArtist); 

