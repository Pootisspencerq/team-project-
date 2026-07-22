const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static(__dirname));

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

        /*
        =================================
        TIKTOK
        =================================
        */

        if (url.includes("tiktok.com")) {
            const response = await axios.get(
                `https://api.tikwmapi.com/?url=${encodeURIComponent(url)}&hd=1`,
                {
                    headers: {
                        "x-tikwmapi-key": "f43999988a1733b02537278ac9f883a0"
                    },
                    timeout: 60000
                }
            );

            const result = response.data;

            if (result.code !== 0) {
                return res.status(400).json(result);
            }

            videoUrl =
                result.data.hdplay ||
                result.data.play;

            fileName = "tiktok-video.mp4";
        }

        /*
        =================================
        INSTAGRAM
        =================================
        */

        else if (url.includes("instagram.com")) {
            const response = await axios.post(
                "https://instagram120.p.rapidapi.com/api/instagram/links",
                {
                    url
                },
                {
                    headers: {
                        "Content-Type": "application/json",

                        "x-rapidapi-host":
                            "instagram120.p.rapidapi.com",

                        "x-rapidapi-key":
                            "1fcfd23dfdmshfa5cb595cb8d07fp1e51b7jsn259b091c1f03"
                    },

                    timeout: 60000
                }
            );

            const data = response.data;

            if (
                !Array.isArray(data) ||
                data.length === 0
            ) {
                return res.status(400).json({
                    error: "Invalid Instagram response"
                });
            }

            const media =
                data[0]?.urls?.[0];

            if (!media?.url) {
                return res.status(400).json({
                    error: "Media URL not found"
                });
            }

            videoUrl = media.url;

            const ext =
                media.extension?.toLowerCase();

            if (
                ext === "jpg" ||
                ext === "jpeg"
            ) {
                fileName =
                    "instagram-photo.jpg";
            }

            else if (ext === "png") {
                fileName =
                    "instagram-photo.png";
            }

            else {
                fileName =
                    "instagram-video.mp4";
            }
        }

        /*
        =================================
        YOUTUBE + YOUTUBE SHORTS
        =================================
        */

        else if (
            url.includes("youtube.com") ||
            url.includes("youtu.be")
        ) {
            let videoId;

            try {
                const urlObj =
                    new URL(url);

                /*
                youtu.be/VIDEO_ID
                */

                if (
                    urlObj.hostname ===
                    "youtu.be"
                ) {
                    videoId =
                        urlObj.pathname
                            .split("/")
                            .filter(Boolean)[0];
                }

                /*
                youtube.com/shorts/VIDEO_ID
                */

                else if (
                    urlObj.pathname
                        .startsWith("/shorts/")
                ) {
                    videoId =
                        urlObj.pathname
                            .split("/")[2];
                }

                /*
                youtube.com/watch?v=VIDEO_ID
                */

                else {
                    videoId =
                        urlObj.searchParams
                            .get("v");
                }

            } catch (error) {
                return res.status(400).json({
                    error: "Invalid YouTube URL"
                });
            }

            if (!videoId) {
                return res.status(400).json({
                    error:
                        "Could not extract YouTube video ID"
                });
            }

            console.log(
                "YouTube ID:",
                videoId
            );

            const response =
                await axios.get(
                    "https://ytstream-download-youtube-videos.p.rapidapi.com/dl",
                    {
                        params: {
                            id: videoId
                        },

                        headers: {
                            "x-rapidapi-host":
                                "ytstream-download-youtube-videos.p.rapidapi.com",

                            "x-rapidapi-key":
                                "50dd52e0b2msh675e82d018b5553p1eea82jsn588993dd9111"
                        },

                        timeout: 60000
                    }
                );

            const data =
                response.data;

            console.log(
                "YouTube response:",
                JSON.stringify(
                    data,
                    null,
                    2
                )
            );

            /*
            Пошук URL у різних форматах API
            */

            videoUrl =
                data.url ||
                data.link ||
                data.formats?.find(
                    format =>
                        format.url
                )?.url ||
                data.streamingData
                    ?.formats
                    ?.find(
                        format =>
                            format.url
                    )?.url;

            if (!videoUrl) {
                return res.status(400).json({
                    error:
                        "Video URL not found",

                    response:
                        data
                });
            }

            fileName =
                url.includes("/shorts/")
                    ? "youtube-shorts.mp4"
                    : "youtube-video.mp4";
        }

        /*
        =================================
        UNKNOWN URL
        =================================
        */

        else {
            return res.status(400).json({
                error:
                    "Unsupported platform"
            });
        }

        /*
        =================================
        CHECK URL
        =================================
        */

        if (!videoUrl) {
            return res.status(400).json({
                error:
                    "Download URL not found"
            });
        }

        console.log(
            "Starting video stream..."
        );

        /*
        =================================
        STREAM VIDEO
        =================================
        */

        const videoResponse =
            await axios({
                method: "GET",

                url: videoUrl,

                responseType: "stream",

                timeout: 120000,

                maxRedirects: 5,

                headers: {
                    "User-Agent":
                        "Mozilla/5.0"
                }
            });

        res.setHeader(
            "Content-Type",
            videoResponse.headers[
                "content-type"
            ] || "video/mp4"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );

        if (
            videoResponse.headers[
                "content-length"
            ]
        ) {
            res.setHeader(
                "Content-Length",
                videoResponse.headers[
                    "content-length"
                ]
            );
        }

        videoResponse.data.pipe(res);

        videoResponse.data.on(
            "error",
            error => {
                console.error(
                    "Stream error:",
                    error.message
                );

                if (!res.headersSent) {
                    res.status(500).json({
                        error:
                            "Video stream failed"
                    });
                }
            }
        );

    } catch (error) {
        console.error(
            "Download Error:",
            error.message
        );

        if (error.response) {
            console.error(
                "API status:",
                error.response.status
            );

            console.error(
                "API data:",
                error.response.data
            );
        }

        if (!res.headersSent) {
            res.status(500).json({
                error:
                    "Download failed",

                details:
                    error.message
            });
        }
    }
});

app.listen(
    3000,
    () => {
        console.log(
            "Server running on port 3000"
        );
    }
);