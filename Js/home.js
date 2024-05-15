
// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//Dichiarazionii variabili utili 
let url = "https://striveschool-api.herokuapp.com/api/deezer/album/";

document.addEventListener("DOMContentLoaded", function () {
    
    console.log(fetchAlbum());
});

const fetchAlbum = async() => {
    await fetch (url)
    .then((response) => {
            return response.json();
        })
        
}
    