
// Home page 
// https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

// Album
// https://striveschool-api.herokuapp.com/api/deezer/album/75621062

// Artist
// https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

//Dichiarazionii variabili utili 

document.addEventListener('DOMContentLoaded', function() {
    let name = document.querySelectorAll('.homeCards');
    creaCard(name)    
})

const creaCard = async (elements) => {
    console.log(elements)
    elements.forEach((element) => {
        const artist = element.innerText;
        console.log(artist)

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card1');
        element.appendChild(cardContainer);
        console.log(element)
        fetchHome(artist)
    })
}

const fetchHome = async(artist) => {
    
    let url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`;
    console.log(url)
    await fetch (url) 
        .then((response) => {return response.json()})
        .then((musica) => {
            const quantitàCard = 5;
            const datiCard = [];
            console.log(musica);
            musica.data.forEach((elemento) => {
                console.log(elemento.album.title)
                if(datiCard.length < quantitàCard) {
                    if (!datiCard.some(album => album.id === elemento.album.id)) {
                       datiCard.push(elemento.album);
                    console.log([...datiCard]) 
                    }
                }
        })
        })
}