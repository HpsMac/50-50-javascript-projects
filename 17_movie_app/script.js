const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=api-key-here&page=1';
const IMG_PATH = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=api-key-here&query="';
// fill in api_key

const main = document.getElementById('main')
const form = document.getElementById('form');
const search = document.getElementById('search');


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}"
                alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                </div>
        `
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    }
    else { return 'red' }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)

        search.value = ''
    } else {
        window.location.reload();
    }
})


getMovies(API_URL)

// {
//     "page": 1,
//         "results": [{
//             "adult": false,
//             "backdrop_path": "/2Icjry0xdRSNxrtsBR1F47b9r3u.jpg",
//             "genre_ids": [28, 878, 27],
//             "id": 615656,
//             "original_language": "en",
//             "original_title": "Meg 2: The Trench", "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
//             "popularity": 4546.63,
//             "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
//             "release_date": "2023-08-02",
//             "title": "Meg 2: The Trench",
//             "video": false,
//              "vote_average": 6.9,
//             "vote_count": 894
//         }
//             ,