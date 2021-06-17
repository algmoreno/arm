var searchBar = document.querySelector('#searchBar');
var searchButton = document.querySelector('#searchButton');
// var imageArea= document.querySelector("#imageArea");
var middleColumn = document.querySelector('#middleColumn');
var topTenLi;

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

  var topTenBoxUl = document.createElement('ol');
  topTenBoxUl.className = 'top-ten-ol';

  for (var i = 0; i < 10; i++) {
    topTenLi = document.createElement('li');
    topTenLi.id = artistData.data[i].album.id;
    // We grabbed the album id from the api endopoint
    // then we set the LI element's id attribute to the id of that album
    topTenLi.textContent = artistData.data[i].title;
    topTenLi.className = 'top-ten-li';
    // added an on click event listener that grabs that album id from the element that was clicked on,
    // then we grabbed the deezer-widget ifram and change it's src attribute to the album that we want

    topTenLi.addEventListener('click', function (event) {
      // console.log(event);
      console.log(event.path[0].id);
      document.getElementById('deezer-widget').src =
        widgetSrcPrefix + event.path[0].id + widgetSrcSuffix;
    });
    topTenBoxUl.append(topTenLi);
  }

  topTenBox.append(topTenBoxUl);
  console.log(topTenBoxUl);

  middleColumn.append(image);
  middleColumn.append(artistNameBox);
  middleColumn.append(topTenBox);
};

searchButton.addEventListener('click', searchArtist);