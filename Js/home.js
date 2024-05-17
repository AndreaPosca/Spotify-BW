
// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//Dichiarazionii variabili utili 
const quantitàCard = 5;
const datiCard = [];

//Creo funzione che al caricamento del dom punta gli h4 con la classe ".homeCards"
//poi fa partire la funzione inserendo la card come parametro
document.addEventListener('DOMContentLoaded', function() {
    let name = document.querySelectorAll('.homeCards');
    creaCard(name)    
})

//per ogni elemento (dato che ci sono piu h4 che hanno la classe ".homeCards") prendo il testo all'interno
//creo un div e aggiungo la classe "cardContainer" e infine lo aggiungo alla fine del div che contiene l'h4 di partenza 
const creaCard = async (elements) => {
    console.log(elements)
    elements.forEach((element) => {
        //mi assicuro di togliere gli spazi per avitare problemi con nomi separati da spazio
        const artist = element.innerText.replace(/ /g, "&");
        console.log(artist)

        const cardContainer = document.createElement('div');
        cardContainer.classList.add(`row`);
        element.parentNode.appendChild(cardContainer);
        console.log(element.parentNode)
        //infine faccio partire la funzione della fetch della home, passandocome parametro,
        //il div che conterrà le card e l'elemento che contiene i dati da utilizzare
        fetchHome(artist, cardContainer)
    })
}

//funzione che fa la fetch, fa la ricerca per il nome dell'artista e trova gli album, traforma la risposta del server in json
//poi definisco un lunghezza dell'array poichè voglio definite card e non oltre
//creo un array vuoto (in cui inserri le informazioni per le card)
//recupero i dati corrispondenzi alla mia ricerca
//inoltre mi assicuro di non recuperare album uguali
const fetchHome = async(artist, divAlbum) => {
    let url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`;
    console.log(url)
    const datiCard = [];
    await fetch (url) 
        .then((response) => {return response.json()})
        .then((musica) => { 
            console.log(musica)
            //per ogni elemento legato alla ricerca
            musica.data.forEach((elemento) => {
                //se la lunghezza dell'array che contiene le informazioni è minore 5
                //allora aggiungi altro se verifica una seconda condizione
                
                if(datiCard.length < quantitàCard) {
                    //Seconda condizione: se almeno un elemento dell'array ha lo stesso id dell'elemento
                    //che stiamo iterando si passa al prossimo elemento, altrimenti viene aggiunto all'array
                    if (!datiCard.some(album => album.id === elemento.album.id)) {
                       datiCard.push(elemento.album);
                    }
                }                 
            })
            datiCard.forEach(album => {
                const col =document.createElement('div');
                col.classList.add('col', 'card');
                divAlbum.appendChild(col)

                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = album.cover_medium;
                col.append(img);
                
                const body = document.createElement('div');
                body.classList.add('card-body');
                col.appendChild(body);

                const title = document.createElement('h6');
                title.classList.add('card-title');
                body.appendChild(title);
                title.innerText = album.title

                const text = document.createElement('p');
                text.classList.add('card-text');
                body.appendChild(text)
                text.innerText = album.title
            })
        })
}
//DA CANCELLARE:
// let name = document.querySelectorAll('.homeCards');
// name.forEach(element => console.log(element.parentNode.innerHTML))


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