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
var contador = 0 ;
var contador1 = 0 ;

    http.open("GET", url)
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            respuesta.results.forEach(pelicula => {

                if (pelicula.media_type == 'tv') {
                    titulo = pelicula.name;
                    poster = imgUrl + pelicula.poster_path;
                    fecha = pelicula.first_air_date;
                } else {
                    titulo = pelicula.title;
                    poster = imgUrl + pelicula.poster_path;
                    fecha = pelicula.release_date;
                    
                }

                $('div.show-peliculas').append(`<div class='card pelicula' style='width: 15rem !important;'>
                <img class='rounded poster'
                    src='${poster}'
                    alt='Card image cap'>
                <div class='card-body'>
                    <div class='row'>
                        <div class='col-sm-9 texto-peli'>
                            <h5 class='card-title'>${titulo}</h5>
                            <p class='card-text'>${fecha}</p>
                        </div>
                        <div class='col-sm-3 cal${contador1}' id='cal${contador1}' style='padding: 0 !important;'>
                        </div>
                    </div>
                </div>`);

                $(function () {
                    calificacion = Number.parseInt(pelicula.vote_average*10,10);
                    
                    $('#cal'+contador).append(`<svg class='radial-progress' data-percentage='${calificacion}' viewBox='0 0 80 80'>
                        <circle class='incomplete' cx='40' cy='40' r='35'></circle>
                        <circle class='complete' cx='40' cy='40' r='35'></circle>
                        <text class='percentage' x='50%' y='57%' transform='matrix(0, 1, -1, 0, 80, 0)'>${calificacion}%</text>
                        </svg>`);
                        contador++;
                });
                contador1++;
            });

            $(function () {
                // Remove svg.radial-progress .complete inline styling
                $('svg.radial-progress').each(function (index, value) {
                    $(this).find($('circle.complete')).removeAttr('style');
                });

                // Activate progress animation on scroll
                $(window).scroll(function () {
                    $('svg.radial-progress').each(function (index, value) {
                        // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
                        if (
                            $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
                            $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
                        ) {
                            // Get percentage of progress
                            percent = $(value).data('percentage');
                            // Get radius of the svg's circle.complete
                            radius = $(this).find($('circle.complete')).attr('r');
                            // Get circumference (2πr)
                            circumference = 2 * Math.PI * radius;
                            // Get stroke-dashoffset value based on the percentage of the circumference
                            strokeDashOffset = circumference - ((percent * circumference) / 100);
                            // Transition progress for 1.25 seconds
                            $(this).find($('circle.complete')).animate({ 'stroke-dashoffset': strokeDashOffset }, 1250);
                        }
                    });
                }).trigger('scroll');

            });

        }
    }
    http.send();
}


function ejercicio() {
    var horas = 15;
    var sueldoPorHora = 1;
    var sueldoTotal = 0;
    var hrsExt = 0;
    var hrsRest = 0

    if (horas <= 8) {
        sueldoTotal = horas * sueldoPorHora;
    } else {
        if (horas <= 11) {
            hrsExt = horas - 8;
            sueldoTotal = (sueldoPorHora * 8) + ([sueldoPorHora * hrsExt] * 2);
        }
        else {
            hrsExt = horas - 8;
            hrsRest = hrsExt - 3;
            hrsExt = 3;
            sueldoTotal = (8 * sueldoPorHora) + ([sueldoPorHora * hrsExt] * 2) + ([hrsRest * sueldoPorHora] * 3);
        }
    }


    console.log(sueldoTotal);

}