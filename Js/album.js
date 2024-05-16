// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062



/**
 * Javascript album.js
*/

// Url di esempio di album
const url = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const nomeArtista = document.getElementById("nomeArtista");


document.addEventListener("DOMContentLoaded", function() {
   
  // Fetch!
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((response) => {
    // Verifico la risposta del server
    if (!response.ok) {
    throw new Error("Risposta networks non andata a buon fine.");
  };
  // Restituisce la risposta in formato json
  return response.json();
  })
  // Convertiamo in json la response
  .then((album) => {
    // Visualizzo nel title del document html il titolo del libro
    document.title = `Album - ${album.title}`;
    
    visualizzaTitolo(album);
    listaCanzoniAlbum(album);
  });
});

/**
 * Visualizza il titolo nella hero del document html
 */
function visualizzaTitolo(album) {
  console.log(album);
  const visualizzaTitolo = document.getElementById("visualizzaTitolo");
  console.log(visualizzaTitolo)

  visualizzaTitolo.innerHTML = `
    <div class="col-2">
	   	<img src="${album.cover}" class="img-fluid mt-3">
	  </div>
	  <div class="col-10 mt-5">
	    <span class="text-white">ALBUM</span>
	    <h1 class="title">${album.title}</h1>
	    <div class="d-flex justify-content-start align-items-center mt-3">
	      <img src="${album.artist.picture}" class="rounded-circle me-2" alt="${album.artist.name}" id="picturArtist">
	      <p class="text-white m-0">${album.artist.name} • ${album.release_date} • ${album.nb_tracks} brani, ${album.duration} min </p>
	    </div>
	  </div>
  ` 
};


/**
 * Visualizza la lista delle canzoni complete dell'album selezionato in forma tabellare
 */
function listaCanzoniAlbum(album) {
  console.log(album.tracks.data);
  const elencoCanzoni = document.getElementById("elencoCanzoni");
  
  let lista = 0;
  album.tracks.data.forEach(canzone => {
    lista += 1;
    const content = document.createElement("tr");
    console.table(canzone);
    content.innerHTML = `
    <tr>
      <th scope="row">${lista}</th>
        <td>
          <p>${canzone.title}</p>
          <p>${canzone.album.title}</p>
        </td>
        <td>${canzone.rank}</td>
        <td>${canzone.duration}</td>
    </tr>
    `
  elencoCanzoni.appendChild(content);
  });

};