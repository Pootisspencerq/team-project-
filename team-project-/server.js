const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.static(__dirname));
app.use(cors());

app.get("/download", async (req, res) => {
    try {
        const url = req.query.url;

        if (!url) {
            return res.status(400).json({
                error: "URL is required"
            });
        }

        let videoUrl = null;
        let fileName = "video.mp4";

        // TikTok
        if (url.includes("tiktok.com")) {
            const response = await axios.get(
                `https://api.tikwmapi.com/?url=${encodeURIComponent(url)}&hd=1`,
                {
                    headers: {
                        "x-tikwmapi-key": "f43999988a1733b02537278ac9f883a0"
                    }
                }
            );

            const result = response.data;

            if (result.code !== 0) {
                return res.status(400).json(result);
            }

            videoUrl = result.data.hdplay || result.data.play;
            fileName = "tiktok-video.mp4";
        }

        // Instagram
        else if (url.includes("instagram.com")) {
            const response = await axios.post(
                "https://instagram120.p.rapidapi.com/api/instagram/links",
                { url },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-host": "instagram120.p.rapidapi.com",
                        "x-rapidapi-key": "1fcfd23dfdmshfa5cb595cb8d07fp1e51b7jsn259b091c1f03"
                    }
                }
            );

            const data = response.data;

            if (!Array.isArray(data) || data.length === 0) {
                return res.status(400).json({
                    error: "Invalid Instagram response",
                    response: data
                });
            }

            videoUrl = data[0]?.urls?.[0]?.url;

            if (!videoUrl) {
                return res.status(400).json({
                    error: "Video URL not found",
                    response: data
                });
            }

            fileName = "instagram-video.mp4";
        }

        // YouTube (Обычные видео и Shorts)
        else if (url.includes("youtube.com") || url.includes("youtu.be")) {
            let videoId = url.trim();
            
            try {
                const urlObj = new URL(videoId);
                if (urlObj.hostname.includes("youtu.be")) {
                    videoId = urlObj.pathname.slice(1);
                } else if (urlObj.pathname.startsWith("/shorts/")) {
                    videoId = urlObj.pathname.split("/")[2];
                } else {
                    videoId = urlObj.searchParams.get("v");
                }
            } catch (e) {
                console.error("Ошибка парсинга URL YouTube:", e);
            }

            const response = await axios.get(
                `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
                        "x-rapidapi-key": "50dd52e0b2msh675e82d018b5553p1eea82jsn588993dd9111"
                    }
                }
            );

            const data = response.data;
            console.log("YouTube response:", JSON.stringify(data, null, 2));

            // Универсальный поиск ссылки в ответе YouTube API
            videoUrl = data.url || 
                       data.link || 
                       (data.formats && data.formats[0] && data.formats[0].url) || 
                       (data.streamingData && data.streamingData.formats && data.streamingData.formats[0].url);

            if (!videoUrl) {
                return res.status(400).json({
                    error: "Video URL not found in YouTube response",
                    response: data
                });
            }

            fileName = "youtube-video.mp4";
        }

        // Pinterest (Видео или изображения)
        else if (url.includes("pinterest.com") || url.includes("pin.it")) {
            const response = await axios.get(
                `https://pinterest-video-and-image-downloader.p.rapidapi.com/pinterest?url=${encodeURIComponent(url)}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-host": "pinterest-video-and-image-downloader.p.rapidapi.com",
                        "x-rapidapi-key": "50dd52e0b2msh675e82d018b5553p1eea82jsn588993dd9111"
                    }
                }
            );

            const data = response.data;
            console.log("Pinterest response:", JSON.stringify(data, null, 2));

            videoUrl = data.data?.url || data.data?.thumbnail || data.video || data.url || data.image;

            if (!videoUrl) {
                return res.status(400).json({
                    error: "Media URL not found in Pinterest response",
                    response: data
                });
            }

            const isImage = data.type === "image" || videoUrl.includes(".png") || videoUrl.includes(".jpg");
            fileName = isImage ? "pinterest-image.png" : "pinterest-video.mp4";
        }

        else {
            return res.status(400).json({
                error: "Unsupported URL"
            });
        }

        const video = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
        });

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );

        if (fileName.endsWith(".png")) {
            res.setHeader("Content-Type", "image/png");
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            res.setHeader("Content-Type", "image/jpeg");
        } else {
            res.setHeader("Content-Type", "video/mp4");
        }

        video.data.pipe(res);

    } catch (error) {
        console.error("Download Error:");

        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        res.status(500).json({
            error: "Download failed"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});