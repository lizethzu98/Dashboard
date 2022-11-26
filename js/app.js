async function getMovie() {
    const url = "https://api.themoviedb.org/3/movie/550?api_key=de504d06b064d118e6a5d2c79b8a7b00&language=es"
    const http = new XMLHttpRequest()

    http.open("GET", url)
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var resultado = JSON.parse(this.responseText)
            console.log(resultado)
        }
    }
    http.send();
}


async function getTrending() {
    const url = "https://api.themoviedb.org/3/trending/all/day?api_key=de504d06b064d118e6a5d2c79b8a7b00&language=es"
    const http = new XMLHttpRequest()
    var titulo;
    var poster;
    var fecha;
    var calificacion;
    var imgUrl = 'https://www.themoviedb.org/t/p/w440_and_h660_face/';


    http.open("GET", url)
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            respuesta.results.forEach(pelicula => {

                if (pelicula.media_type == 'tv') {
                    titulo = pelicula.name;
                    poster = imgUrl + pelicula.poster_path;
                    fecha = pelicula.first_air_date;
                    calificacion = pelicula.vote_average;

                } else {
                    titulo = pelicula.title;
                    poster = imgUrl + pelicula.poster_path;
                    fecha = pelicula.release_date;
                    calificacion = pelicula.vote_average;
                }


                const contenedorPeliculas = document.querySelector('#peliculas');

                const divCard = document.createElement("div");
                divCard.classList.add("card");
                
                const imgPelicula = document.createElement('img');
                imgPelicula.classList.add("card-img-top");
                imgPelicula.setAttribute("src", poster);
                
                const divCardBody = document.createElement("div");
                divCardBody.classList.add("card-body");
                
                const cardTitle = document.createElement('h5');
                cardTitle.classList.add("card-title");
                
                const textoPelicula = document.createTextNode(titulo);


                //agregar a html
                cardTitle.appendChild(textoPelicula);
                divCardBody.appendChild(cardTitle);
                divCard.appendChild(imgPelicula);
                divCard.appendChild(divCardBody);
                contenedorPeliculas.appendChild(divCard);

            });


        }
    }
    http.send();
}


function ejercicio(){
    var horas = 15;
    var sueldoPorHora = 1;
    var sueldoTotal = 0;
    var hrsExt = 0;
    var hrsRest = 0

    if (horas<=8){
        sueldoTotal=horas*sueldoPorHora;
    }else {
        if (horas<=11){
        hrsExt = horas-8;
        sueldoTotal= (sueldoPorHora * 8)+([sueldoPorHora*hrsExt]*2);
        }
        else{
            hrsExt = horas-8;
            hrsRest = hrsExt-3;
            hrsExt = 3;
            sueldoTotal = (8*sueldoPorHora)+([sueldoPorHora*hrsExt]*2)+([hrsRest*sueldoPorHora]*3);
        }
    }


    console.log(sueldoTotal);
    
}