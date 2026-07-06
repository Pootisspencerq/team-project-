const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const results = document.getElementById("results");

button.addEventListener("click", searchVideo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchVideo();
    }
});

async function searchVideo() {
    const url = input.value.trim();

    if (!url) {
        alert("Paste a TikTok link.");
        return;
    }

    results.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(
            `https://api.tikwmapi.com/?url=${encodeURIComponent(url)}&hd=1`,
            {
                method: "GET",
                headers: {
                    "x-tikwmapi-key": "f43999988a1733b02537278ac9f883a0"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const { code, msg, data } = await response.json();

        if (code !== 0 || !data) {
            results.innerHTML = `<h2>${msg || "Video not found."}</h2>`;
            return;
        }

        const videoUrl = data.hdplay || data.play;

        results.innerHTML = `
            <div class="card">
                <img src="${data.cover}" alt="Thumbnail">

                <div class="info">
                    <h2>${data.title || "Untitled"}</h2>
                    <p>👤 ${data.author.nickname}</p>
                    <p>⏱ ${data.duration}s</p>

                    <video controls width="100%" style="margin-top:15px;">
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>

                    <br><br>

                    <a href="${videoUrl}" target="_blank" class="download-btn">
                        Download HD Video
                    </a>

                    <br><br>

                    <a href="${data.music}" target="_blank" class="download-btn">
                        Download Music
                    </a>
                </div>
            </div>
        `;

    } catch (err) {
        console.error(err);

        results.innerHTML = `
            <h2>Request Failed</h2>
            <p>${err.message}</p>
        `;
    }
}