window.YouTubeAPI = {
    key: "50dd52e0b2msh675e82d018b5553p1eea82jsn588993dd9111",

    async getVideo(videoIdOrUrl) {
        let videoId = videoIdOrUrl.trim();
        
        // Если это полная ссылка, вытаскиваем ID правильно
        if (videoId.includes("youtube.com") || videoId.includes("youtu.be")) {
            try {
                const urlObj = new URL(videoId);
                if (urlObj.hostname.includes("youtu.be")) {
                    videoId = urlObj.pathname.slice(1);
                } else {
                    videoId = urlObj.searchParams.get("v");
                }
            } catch (e) {
                console.error("Ошибка парсинга URL YouTube:", e);
            }
        }

        console.log("Отправляем запрос для YouTube ID:", videoId);

        const response = await fetch(
            `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
                    "x-rapidapi-key": this.key
                }
            }
        );

        const data = await response.json();
        console.log("Ответ от YouTube API:", data);
        
        return data;
    }
};