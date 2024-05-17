// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//ID artista iniziale 75621062

/**
 * Javascript artista.js
 * 
*/

const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");


// Fetch!
fetch(url + id, {
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
  .then((artistaDettagli) => {
    
    document.title = `Artista - ${artistaDettagli.name}`;
    // Richiamo la funzione che andrà a visualizzare il libro selezionato con id nel mio document html
    dettagliArtista(artistaDettagli);
    topElenco(artistaDettagli.tracklist);
});



function dettagliArtista(artista) {
  let infoArtista = document.getElementById("infoArtista");
  // console.log(artista);
  infoArtista.innerHTML = `
    <div class="col-2">
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


async function topElenco(elenco) {
  // console.log(elenco);

  const response = await fetch(elenco, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  // Verifico la risposta del server
  if (!response.ok) {
    throw new Error("Risposta networks non andata a buon fine.");
  };
  // Restituisce la risposta in formato json
  const canzoni = await response.json();
  // Richiamo la funzione visualizza tutti i prodotti nel document html
  viewCanzoni(canzoni);
};


/**
 * Visualizza la lista delle canzoni complete dell'album selezionato in forma tabellare
*/
function viewCanzoni(canzoni) {
  console.log(canzoni);
  const elencoCanzoni = document.getElementById("elencoCanzoni");

  let lista = 0;
  canzoni.data.forEach(canzone => {
    //console.log(canzone.id);
    lista += 1;
    const content = document.createElement("tr");
    console.table(canzone);
    content.innerHTML = `
      <tr>
        <th scope="row">${lista}</th>
          <td>
            <p class="link-title" id="${canzone.id}">${canzone.title}</p>
            <p>${canzone.title}</p>
          </td>
          <td>${canzone.rank}</td>
          <td>${canzone.duration}</td>
      </tr>
    `
    elencoCanzoni.appendChild(content);

    const linkTitle = document.getElementById(`${canzone.id}`);
    //const CanzoneInProduzione = document.getElementById("CanzoneInProduzione");
    
    const branoDaRiprodurre = document.getElementById("bra")

    linkTitle.addEventListener(("click"), () => {

      //console.log(canzone);
      console.log(linkTitle.textContent);
      const titoloRiproduzione = document.getElementById("titoloRiproduzione");
      const titoloRiproduzioneAlbum = document.getElementById("titoloRiproduzioneAlbum");
      const viewAlbumRiproduzione = document.getElementById("viewAlbumRiproduzione");
      const sfBiHeart = document.getElementById("sf-bi-heart");
      
      titoloRiproduzione.textContent = `${canzone.title}`;
      // titoloRiproduzioneAlbum.textContent = `${canzone.album.title}`;
      
      viewAlbumRiproduzione.innerHTML = `
        <img src="${canzone.album.cover_small}" class="img-fluid" id="imageRiproduzione" alt="${canzone.album.title}">
      `
      sfBiHeart.classList.remove("d-none");

      brano.textContent = `${canzone.preview}`;
    })
  });
};


/**
 * Funzione di lettura brano musicale mp3 selezionato dalla lista delle canzoni
*/
let audio = new Audio();
let isPlay = false;
const progressBar = document.getElementById("progress-bar");

//funzioni utili alla barra di riproduzione
function togglePlayPause() {
  const playPrimario = document.getElementById("play-primario");
  const controlPlay = document.getElementById("sf-btn-control-play");
  if (!isPlay) {
    const mp3 = document.getElementById("brano").textContent;
    // Imposta il percorso del file MP3
    audio.src = mp3;
    // Avvia la riproduzione del file MP3
    audio.play();
    // Cambia il testo del bottone in "Pausa"
    playPrimario.innerHTML = `<i class="bi bi-pause fs-4 text-white"></i>`;
    controlPlay.innerHTML = `<i class="bi bi-pause"></i>`;
    // document.querySelector('button').innerText = 'Pausa';
    isPlay = true;
    // Aggiorna la progress bar mentre la canzone viene riprodotta
    audio.addEventListener("timeupdate", updateProgressBar);
    // Aggiungi un ascoltatore per l'evento "ended" per ripristinare il pulsante a "Play" quando la canzone è terminata
    audio.addEventListener("ended", function() {
      playPrimario.innerHTML = `<i class="bi bi-play fs-4 text-white"></i>`;
      controlPlay.innerHTML = `<i class="bi bi-play"></i>`;
      isPlay = false;
      // Rimuovi l'ascoltatore per l'aggiornamento della progress bar quando la canzone è terminata
      audio.removeEventListener("timeupdate", updateProgressBar);
      // Resetta la progress bar
      progressBar.style.width = "0%";
    });
  } else {
    // Interrompi la riproduzione del file MP3
    audio.pause();
    // Cambia il testo del bottone in "Play"
    playPrimario.innerHTML = `<i class="bi bi-play fs-4 text-white"></i>`;
    controlPlay.innerHTML = `<i class="bi bi-play"></i>`;
    isPlay = false;
    
  }
};



function updateProgressBar() {
  // Calcola la percentuale di avanzamento della canzone
  let progress = (audio.currentTime / audio.duration) * 100;
  // Aggiorna la larghezza della progress bar
  progressBar.style.width = progress + "%";
};


const cerca = document.getElementById("cerca");
const inputCerca = document.getElementById("inputCerca");

cerca.addEventListener("click", () => {
  if (inputCerca.classList.contains("d-none")) {
    inputCerca.classList.remove("d-none");
  } else {
    inputCerca.classList.add("d-none");
  }
  
});




