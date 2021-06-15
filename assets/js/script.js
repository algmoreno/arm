var searchBar = document.querySelector("#searchBar");
var searchButton = document.querySelector("#searchButton");
// var imageArea= document.querySelector("#imageArea"); 
var middleColumn = document.querySelector("#middleColumn");
var topTenLi; 

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
    artistNameBox.append(artist);

    var topTenBox = document.createElement("div");
    topTenBox.className = "top-ten-box";

    var topTenHeading = document.createElement("h2");
    topTenHeading.textContent = "Top Ten Tracks";
    topTenHeading.className= "top-ten-heading"; 

    topTenBox.append(topTenHeading); 

    var topTenBoxUl = document.createElement("ol");
    topTenBoxUl.className = "top-ten-ol";

    for (var i = 0; i < 10; i++) {
    topTenLi = document.createElement("li");
    topTenLi.textContent = artistData.data[i].title;  
    topTenLi.className = "top-ten-li";
    topTenBoxUl.append(topTenLi); 
    }

    topTenBox.append(topTenBoxUl);
    console.log(topTenBoxUl)

    middleColumn.append(image);
    middleColumn.append(artistNameBox);
    middleColumn.append(topTenBox)
}

searchButton.addEventListener("click", searchArtist); 
