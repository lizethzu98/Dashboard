async function getMovie() {
    const url = 'https://api.themoviedb.org/3/movie/550'
    const http = new XMLHttpRequest()
const parametros = "?api_key=de504d06b064d118e6a5d2c79b8a7b00&language=es";
    http.open("GET", url)
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var resultado = JSON.parse(this.responseText)
            console.log(resultado.name)
        }
    }
    http.send(parametros);
}

var data = new FormData();
data.append('user', 'person');
data.append('pwd', 'password');
data.append('organization', 'place');
data.append('requiredkey', 'key');