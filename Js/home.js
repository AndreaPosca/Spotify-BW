
// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//Dichiarazionii variabili utili 


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
        const divAlbum = cardContainer.classList.add(`col-12`);
        element.parentNode.appendChild(cardContainer);
        console.log(element.parentNode)
        //infine faccio partire la funzione della fetch della home, passandocome parametro,
        //il div che conterrà le card e l'elemento che contiene i dati da utilizzare
        fetchHome(artist, divAlbum)
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
    await fetch (url) 
        .then((response) => {return response.json()})
        .then((musica) => {
            const quantitàCard = 5;
            const datiCard = [];
            console.log(musica);
            //per ogni elemento legato alla ricerca
            musica.data.forEach((elemento) => {
                console.log(elemento.album.title)
                //se la lunghezza dell'array che contiene le informazioni è minore 5
                //allora aggiungi altro se verifica una seconda condizione
                if(datiCard.length < quantitàCard) {
                    //Seconda condizione: se almeno un elemento dell'array ha lo stesso id dell'elemento
                    //che stiamo iterando si passa al prossimo elemento, altrimenti viene aggiunto all'array
                    if (!datiCard.some(album => album.id === elemento.album.id)) {
                       datiCard.push(elemento.album);
                       //console di controllo per verificare che sia andato tutto a buon fine
                    console.log([...datiCard]) 
                    }
                }
        })
        })
}