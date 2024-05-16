
// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//Dichiarazionii variabili utili 
let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=madonna";

document.addEventListener("DOMContentLoaded", function () {
    
fetchAlbum();
});

const fetchAlbum = async() => {
    await fetch (url)
    .then((response) => {
            return response.json();
    })
    .then ((musica) =>
    caricaInfo(musica)
    )
    .catch ((error) => console.error(error))
}

function caricaInfo (tracks) {
    console.log(tracks)
    console.log(tracks.data)
    const item = tracks.data;
            for (let i = 0; i<7; i++) {
                console.log(item[i])
            }
        }
    

