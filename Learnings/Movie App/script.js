const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=91320956282c5a0bc4903731df539ef3&language=en-US&page=1'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=91320956282c5a0bc4903731df539ef3&query="'

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
prev.disabled = true

let num = 1;

getMovies(API_URL + num);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovie(data.results);
}

function showMovie(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.classList.add('col-sm-3');


        movieEl.innerHTML = `
                <img src = "${IMAGE_PATH + poster_path}">
                    <div class = "movie-info" >
                        <h3>${title}</h3> 
                        <span class="${getMovieRating(vote_average)}"> ${vote_average} </span> 
                    </div> 
                    <div class="overview" >
                        <h3>Overview</h3>
                        ${overview}
                    </div> 
        `
        main.appendChild(movieEl)
    });
}

function getMovieRating(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchValue = search.value;
    if (searchValue && searchValue !== "") {
        getMovies(SEARCH_URL + searchValue);
        search.value = "";
    } else {
        window.location.reload()
    }
})

next.addEventListener("click", function () {
    num += 1;
    prev.disabled = false
    getMovies(API_URL + num);
})

prev.addEventListener("click", function () {
    if (num > 1) {
        num -= 1;
        getMovies(API_URL + num);
    } else {
        prev.disabled = true
    }
})