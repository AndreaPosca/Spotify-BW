
// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//Dichiarazionii variabili utili 
let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

document.addEventListener("DOMContentLoaded", function () {
    fetchAlbum()
});

const fetchAlbum = async() => {
    await fetch (url)
    .then((response) => {
            return response.json();
    })
    .then ((musica) =>
        popola(musica)
    )
    .catch ((error) => console.error(error))
}
const card = document.getElementById('contenutoCard')
function popola(datiCanzoni) {
    for(i=0; i<7; i++) {
  console.log(datiCanzoni[i]);
}
// const title = document.createElement('h4');
// title.innerText = datiCanzoni.title; //da controllare come è scritto nell'oggeto il titolo generico

// const img = document.createElement()
//Funzione di popolamento HOME
}
