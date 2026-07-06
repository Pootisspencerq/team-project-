const API_KEY = "8d01732a80fc4398c695de574494d8c7";

const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const movies = document.getElementById("movies"); // You can rename this to "movies"

button.addEventListener("click", searchMovies);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchMovies();
    }
});

async function searchMovies() {
    const search = input.value.trim();

    if (!search) return;

    movies.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`

        );

        const data = await response.json();

        movies.innerHTML = "";

        if (!data.results || data.results.length === 0) {
            movies.innerHTML = "<h2>No movies found.</h2>";
            return;
        }

        data.results.forEach(movie => {
            const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image";

            movies.innerHTML += `
                <div class="card">
                    <img src="${poster}" alt="${movie.title}">
                    <div class="info">
                        <h2>${movie.title}</h2>
                        <p>⭐ Rating: ${movie.vote_average}</p>
                        <p>📅 Release: ${movie.release_date || "Unknown"}</p>
                        <p>${movie.overview || "No description available."}</p>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        movies.innerHTML = "<h2>Something went wrong.</h2>";
    }
}