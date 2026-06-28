const API_KEY = "YOUR_API_KEY";

const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const games = document.getElementById("games");

button.addEventListener("click", searchGames);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchGames();
    }
});

function searchGames() {

    const search = input.value.trim();

    if (!search) return;

    fetch(`https://api.rawg.io/api/games?search=${encodeURIComponent(search)}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {

            games.innerHTML = "";

            if (data.results.length === 0) {
                games.innerHTML = "<h2>Нічого не знайдено.</h2>";
                return;
            }

            data.results.forEach(game => {

                games.innerHTML += `
                    <div class="card">
                        <img src="${game.background_image}" alt="${game.name}">
                        <div class="info">
                            <h2>${game.name}</h2>
                            <p>⭐ Рейтинг: ${game.rating}</p>
                            <p>📅 Вихід: ${game.released}</p>
                        </div>
                    </div>
                `;

            });

        })
        .catch(error => console.error(error));
}