
// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//Dichiarazionii utili 
const quantitàCard = 5; //quantità di card visibili nella home
const datiCard = [];    //array in cui passo gli elementi per fare la verifica
const search = document.getElementById('search');
const cardsContainer = document.getElementById('main-head');
const genresContainer = document.getElementById('genres-container');
const cerca = document.getElementById("cerca");
const inputCerca = document.getElementById("inputCerca");
const containerMain = document.getElementById('main-cards')

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
                const artistID = elemento.artist.id;
                if(datiCard.length < quantitàCard) {
                    //Seconda condizione: se almeno un elemento dell'array ha lo stesso id dell'elemento
                    //che stiamo iterando si passa al prossimo elemento, altrimenti viene aggiunto all'array
                    if (!datiCard.some(album => album.id === elemento.album.id)) {
                       datiCard.push(elemento.album);
                    }
                }                 
            })
            //per ogni elemento (album)
            datiCard.forEach(album => {
                //creo le parti della card
                const col =document.createElement('div');
                col.classList.add('col', 'card', 'display-card');
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
                text.innerText = album.title;


                //al click sull'album trova l'id dell'album w lo manda come paramemtro alla funzione soecifica
                col.addEventListener('click', function () {
                    paginaSpecificaAlbum(album.id)
                })
            })
        })
}

//inserisco nel link l'id dell'album
function paginaSpecificaAlbum(id) {
    console.log(id)
    const albumString = JSON.stringify(id);
    const codedAlbum = encodeURIComponent(albumString)
    window.location.href = './album.html?id=' + codedAlbum;
}

/**
 * Funzione cerca con attivazione della casella input nel document html
*/

cerca.addEventListener("click", function () {
    inputCerca.classList.toggle("d-none");
    cardsContainer.classList.add("d-none");
    genresContainer.classList.remove('d-none');
    const displayCards = document.querySelectorAll('.display-card');
    displayCards.forEach(card => card.classList.add('d-none'));
    const displayCTitles = document.querySelectorAll('titleCArdGeneri');
    displayCTitles.forEach(card => card.classList.add('d-none'));
});


const pop = document.getElementById('pop');
const rock = document.getElementById('rock');
const rap = document.getElementById('rap');
const elettronica = document.getElementById('elettronica');
const metal = document.getElementById('metal');
const reggaeton = document.getElementById('reggaeton');

pop.addEventListener('click', function () {
    display(pop);
});

rock.addEventListener('click', function () {
    display(rock);
});

rap.addEventListener('click', function () {
    display(rap);
});

elettronica.addEventListener('click', function() {
    display(elettronica);
});

metal.addEventListener('click', function () {
    display(metal);
});

reggaeton.addEventListener('click', function() {
    display(reggaeton);
});

function display (name) {
    console.log(name)
    console.log(name.children[1])

    const div = name.children[1].children;
    console.log(div);
    genresContainer.classList.add('d-none');
    for (i=0; i<div.length ; i++) {
        const artistName = div[i].children[0].innerText;

        const cardNew = document.createElement('div');
        const cardContainer = document.createElement('div');
        cardContainer.id = "nuovocontainer";
        cardContainer.classList.add('row', 'g-3');

        const title = document.createElement('h4')
        title.innerText = artistName;
        title.classList.add('col-12', 'titleCArdGeneri')

        containerMain.appendChild(cardNew);
        cardNew.appendChild(title);
        cardNew.appendChild(cardContainer);

        fetchHome(artistName, cardContainer);
    }    


    const titleCards = document.querySelectorAll('.titleCArdGeneri');
    console.log(titleCards);

//     titleCards.forEach(title => {
//         const artistID = 
//         title.addEventListener('click', function () {
//             paginaSpecificaArtista(artistID);
//         });
//     });
// 
}