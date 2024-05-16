// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062



/**
 * Javascript artista.js
 * 
*/

const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/75621062";

const nomeArtista = document.getElementById("nomeArtista");


document.addEventListener("DOMContentLoaded", function () {
   
  
  // Fetch!
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      console.log(response);
      // Verifico la risposta del server
      if (!response.ok) {
      throw new Error("Risposta networks non andata a buon fine.");
    };
    // Restituisce la risposta in formato json
    return response.json();
    })
    // Convertiamo in json la response
    .then((artista) => {
      // Visualizzo nel title del document html il titolo del libro
      document.title = `Artista - ${artista.name}`;
      // Richiamo la funzione che andrà a visualizzare il libro selezionato con id nel mio document html
      dettagliArtista(artista);
    });

    const dettagliArtista = (artista) => {
      let infoArtista = document.getElementById("infoArtista");
      console.log(artista);
      infoArtista.innerHTML = `
        <div class="col-2" >
          <img src="${artista.picture}" class="img-fluid mt-3" alt="${artista.name}">
        </div>
        <div class="col-10 mt-5">
          <span class="text-white">Artista verificato</span>
          <h1 class="title">${artista.name}</h1>
          <div class="d-flex justify-content-start align-items-center mt-3">
            <img src="${artista.picture_small}" class="rounded-circle me-2" alt="${artista.name}">
            <p class="text-white m-0">${artista.nb_fan} ascoltatori mensili</p>
          </div>
        </div>
      `
    };

});









