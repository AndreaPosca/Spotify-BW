# EPICODE - BuildWeek n. 3
#### data: 13.05.2024



Ricostruire una copia dell'applicazione Spotify, in aspetto e - parzialmente in funzionalità.
Ricreare l'app il più fedelmente possibile.


### Gruppo di Lavoro

* Andrea Posca
* Gabriele de Matteis
* Ilaria Montella
* Gianluca Chiaravalloti
* Genesis Miranda


### Impostazione del lavoro

Pagine da creare:
* Homepage
* Pagina artista
* Pagina album


### API-Homepage

Sulla homepage, vengono mostrate una serie di album a scelta (viene rispettato lo stile e l'UI) usando quest endpoint:

```
Endpoint: https://striveschool-api.herokuapp.com/api/deezer/search?q=(query)

Example: https://striveschool-api.herokuapp.com/api/deezer/search?q=queen

```


### API-Album page

* Quando l'utente clicca su un album, dovrebbe essere trasportato alla pagina corrispondente.
* Sarà presente una pagina (album.html), e popolata dinamicamente tramite l'id dell'album
* (utilizzo di URLSearchParams)

```
Endpoint: https://striveschool-api.herokuapp.com/api/deezer/album/{id}

Example: https://striveschool-api.herokuapp.com/api/deezer/album/75621062

```


### API-Artist

* Quando un utente clicca sul nome di un artista, dovrebbe essere trasportato alla pagina corrispondente.
* Sarà presente una pagina (album.html), e popolata dinamicamente tramite l'id dell'album su cui l'utente ha cliccato.

```
Endpoint: https://striveschool-api.herokuapp.com/api/deezer/artist/{id}

Example: https://striveschool-api.herokuapp.com/api/deezer/artist/75621062

```





