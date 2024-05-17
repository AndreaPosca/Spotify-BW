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

// Definisce la costante 'url' che contiene l'URL base per l'API di Strive School relativa agli artisti di Deezer.
const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

// Crea una nuova istanza di URLSearchParams con la query string dell'URL corrente.
const params = new URLSearchParams(window.location.search);

// Estrae il valore del parametro 'id' dalla query string dell'URL.
const id = params.get("id");



// Effettua una richiesta fetch all'URL composto dalla variabile 'url' e dall'ID dell'artista.
fetch(url + id, {
  // Imposta l'intestazione della richiesta per indicare che il contenuto è in formato JSON.
  headers: {
    "Content-Type": "application/json",
  }
})
// Gestisce la risposta della richiesta fetch.
.then((response) => {
  // Verifica se la risposta del server non è ok (stato non compreso tra 200-299).
  if (!response.ok) {
    // Se la risposta non è ok, lancia un errore con un messaggio.
    throw new Error("Risposta networks non andata a buon fine.");
  };
  // Restituisce la risposta convertita in formato JSON.
  return response.json();
})
// Elabora i dati dell'artista ottenuti dalla risposta JSON.
.then((artistaDettagli) => {
  // Aggiorna il titolo della pagina con il nome dell'artista.
  document.title = `Artista - ${artistaDettagli.name}`;
  
  // Richiama la funzione 'dettagliArtista' per visualizzare i dettagli dell'artista nel documento HTML.
  dettagliArtista(artistaDettagli);
  
  // Richiama la funzione 'topElenco' per visualizzare la tracklist dell'artista.
  topElenco(artistaDettagli.tracklist);
})
// Gestisce eventuali errori che si verificano durante il fetch o l'elaborazione della risposta.
.catch((error) => {
  // Logga l'errore nella console.
  console.error("Si è verificato un errore:", error);
});



// Definisce la funzione 'dettagliArtista' che riceve un oggetto 'artista' come parametro.
function dettagliArtista(artista) {
  // Seleziona l'elemento HTML con l'ID 'infoArtista' e lo assegna alla variabile 'infoArtista'.
  let infoArtista = document.getElementById("infoArtista");
  
  // Seleziona l'elemento HTML con l'ID 'background-artista' e lo assegna alla costante 'backgroundArtista'.
  const backgroundArtista = document.getElementById("background-artista");
  
  // Imposta l'immagine di sfondo dell'elemento 'background-artista' utilizzando la proprietà 'picture_big' dell'oggetto 'artista'.
  backgroundArtista.style.backgroundImage = `url("${artista.picture_big}")`;
  
  // Impedisce la ripetizione dell'immagine di sfondo.
  backgroundArtista.style.backgroundRepeat = "no-repeat";
  
  // Imposta la posizione verticale dell'immagine di sfondo.
  backgroundArtista.style.backgroundPositionY = "-150px";
  
  // Adatta l'immagine di sfondo per coprire l'intera larghezza del contenitore.
  backgroundArtista.style.backgroundSize = "100%";
  
  // Imposta il livello di sovrapposizione dell'elemento 'background-artista' in modo che si trovi sopra altri elementi con z-index inferiore.
  backgroundArtista.style.zIndex = "11";
  
  // Aggiorna il contenuto HTML dell'elemento 'infoArtista' con i dettagli dell'artista.
  infoArtista.innerHTML = `
    <div class="col-2">
      <img src="${artista.picture}" class="img-fluid mt-3" alt="${artista.name}">
    </div>
    <div class="col-10 mt-5">
      <span class="text-white fs-6"><i class="bi bi-patch-check text-primary"></i> Artista verificato</span>
      <h1 class="title">${artista.name}</h1>
      <div class="d-flex justify-content-start align-items-center mt-3">
        <img src="${artista.picture_small}" class="rounded-circle me-2" alt="${artista.name}">
        <p class="text-white m-0 fs-6 fw-bold">${artista.nb_fan} ascoltatori mensili</p>
      </div>
    </div>
  `;
}


/**
 * Definisce una funzione asincrona chiamata 'topElenco' che prende un parametro 'elenco'
*/
async function topElenco(elenco) {
  // Esegue una richiesta fetch all'URL fornito dal parametro 'elenco' e attende la risposta.
  const response = await fetch(elenco, {
    // Imposta l'intestazione della richiesta per indicare che il contenuto è in formato JSON.
    headers: {
      "Content-Type": "application/json",
    }
  });

  // Verifica se la risposta del server non è ok (stato non compreso tra 200-299).
  if (!response.ok) {
    // Se la risposta non è ok, lancia un errore con un messaggio.
    throw new Error("Risposta networks non andata a buon fine.");
  }

  // Restituisce la risposta convertita in formato JSON e attende il risultato.
  const canzoni = await response.json();

  // Richiama la funzione 'viewCanzoni' per visualizzare le canzoni ottenute nel documento HTML.
  viewCanzoni(canzoni);
}


/**
 * Visualizza la lista delle canzoni complete dell'album selezionato in forma tabellare
*/
function viewCanzoni(canzoni) {
  console.log(canzoni);
  const elencoCanzoni = document.getElementById("elencoCanzoni");

  let lista = 0;
  canzoni.data.forEach(canzone => {
    // Converto il tempo in minuti e secondi
    let tempo = (canzone.duration/60).toFixed(2).toString().split(".");
    let minuti = tempo[0];
    let secondi = tempo[1];
    //console.log(canzone.id);
    lista += 1;
    const content = document.createElement("tr");
    console.table(canzone);
    content.innerHTML = `
      <tr>
        <th scope="row">${lista}</th>
          <td class="d-flex justify-content-start align-items-center gap-4">
          <a href="./album.html?id=${canzone.album.id}">
            <img src="${canzone.album.cover_small}" class="img-fluid" alt="${canzone.album.title}">
          </a>
            <p class="link-title" id="${canzone.id}">${canzone.title}</p>
            <p>${canzone.title}</p>
          </td>
          <td>${canzone.rank}</td>
          <td>${minuti} min ${secondi} sec</td>
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


/**
 * Funzione avanzamento della barra progress in funzione del tempo di esecuzione della canzone
 * tradotta in html in funzione del suo width in %
*/
function updateProgressBar() {
  // Calcola la percentuale di avanzamento della canzone
  let progress = (audio.currentTime / audio.duration) * 100;
  // Aggiorna la larghezza della progress bar
  progressBar.style.width = progress + "%";
};


/**
 * Funzione cerca con attivazione della casella input nel document html
*/
const cerca = document.getElementById("cerca");
const inputCerca = document.getElementById("inputCerca");

cerca.addEventListener("click", () => {
  if (inputCerca.classList.contains("d-none")) {
    inputCerca.classList.remove("d-none");
  } else {
    inputCerca.classList.add("d-none");
  }
  
});




