const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const movies = document.getElementById("movies");

button.addEventListener("click", searchVideo);

async function searchVideo() {
    const url = input.value.trim();

    if (!url) return;

    movies.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(
            `https://api.tikwmapi.com/?url=${encodeURIComponent(url)}`
        );

        const data = await response.json();

        if (data.code !== 0) {
            movies.innerHTML = "<h2>Video not found.</h2>";
            return;
        }

        const video = data.data;

        movies.innerHTML = `
            <div class="card">
                <img src="${video.cover}" alt="Thumbnail">
                <div class="info">
                    <h2>${video.title}</h2>
                    <p>👤 ${video.author.nickname}</p>
                    <a href="${video.play}" target="_blank">Watch Video</a>
                </div>
            </div>
        `;
    } catch (err) {
        console.error(err);
        movies.innerHTML = "<h2>Something went wrong.</h2>";
    }
}