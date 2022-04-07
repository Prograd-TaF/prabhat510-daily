const apiKey = "cf6805e2a7f2ad8f94adccfd2c748343";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

getTrendingMovies();

function getMoviesByLanguage() {
  clearElements();
  const lang = getElementById("dd").value;
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&with_original_language=${lang}&page=1`;
  populateDom(url, "language");
}

function getTrendingMovies() {
  clearElements();
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  populateDom(url, "home");
}

function getPopularMovies() {
  clearElements();
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  populateDom(url, "popular");
}

function getUpcomingMovies() {
  clearElements();
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
  populateDom(url, "upcoming");
}

function getTrailor(id) {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
    )
    .then((res) => {
      if (res.data.results.length === 0) {
        alert("Trailor Not Found!!");
      } else {
        location.href = `https://www.youtube.com/embed/${res.data.results[0].key}`;
      }
    });
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getElementById(id) {
  return document.getElementById(id);
}

function clearElements() {
  removeAllChildNodes(getElementById("upcoming"));
  removeAllChildNodes(getElementById("popular"));
  removeAllChildNodes(getElementById("home"));
  removeAllChildNodes(getElementById("language"));
  removeAllChildNodes(getElementById("display-trailor"));
}

function populateDom(url, parentId) {
  axios.get(url).then((response) => {
    let totalItems = response.data.results.length;
    let i = 0;
    while (i < totalItems) {
      const movie = document.createElement("div");
      movie.className = "movie";
      const movie_name = document.createElement("p");
      const releaseDate = document.createElement("p");
      const movie_thumbnail = document.createElement("img");
      const movie_footer = document.createElement("div");

      movie_thumbnail.setAttribute(
        "src",
        imageBaseUrl + response.data.results[i].poster_path
      );

      movie_footer.innerHTML = `<img src=\'assets/like.png\' class="likes">  ${response.data.results[i].vote_count} <img src=\'assets/views.jpeg\' class="views">  ${response.data.results[i].id}`;
      movie_thumbnail.className = "movie-thumbnail";
      movie_name.textContent = response.data.results[i].title;
      releaseDate.textContent = response.data.results[i].release_date;
      const movie_id = response.data.results[i].id;

      movie.append(movie_name);
      movie.append(releaseDate);
      movie.append(movie_thumbnail);
      movie.append(movie_footer);
      getElementById(parentId).append(movie);
      console.log(response.data.results[i].poster_path);
      movie.style.cursor = "pointer";
      movie.addEventListener("click", () => {
        getTrailor(movie_id);
      });
      i++;
    }
    console.log(response.data);
  });
}
