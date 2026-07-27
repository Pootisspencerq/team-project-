const express = require("express");
const axios = require("axios");
const cors = require("cors");
const ytDlp = require("yt-dlp-exec");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

// =================================
// API KEYS
// =================================

const TIKWM_API_KEY =
    "f43999988a1733b02537278ac9f883a0";

const INSTAGRAM_RAPIDAPI_KEY =
    "1fcfd23dfdmshfa5cb595cb8d07fp1e51b7jsn259b091c1f03";


// =================================
// MIDDLEWARE
// =================================

app.use(cors());
app.use(express.static(__dirname));


// =================================
// DOWNLOADS FOLDER
// =================================

const downloadsFolder = path.join(
    __dirname,
    "downloads"
);

if (!fs.existsSync(downloadsFolder)) {
    fs.mkdirSync(downloadsFolder, {
        recursive: true
    });
}


// =================================
// STREAM MEDIA
// =================================

async function streamMedia(
    mediaUrl,
    res,
    fileName
) {
    try {
        console.log("Downloading media:");
        console.log(mediaUrl);

        const response = await axios({
            method: "GET",

            url: mediaUrl,

            responseType: "stream",

            timeout: 120000,

            maxRedirects: 10,

            headers: {
                "User-Agent":
                    "Mozilla/5.0",

                "Accept":
                    "*/*"
            },

            validateStatus: status =>
                status >= 200 &&
                status < 400
        });

        const contentType =
            response.headers["content-type"] ||
            "application/octet-stream";

        const contentLength =
            response.headers["content-length"];

        console.log(
            "Content-Type:",
            contentType
        );

        console.log(
            "Content-Length:",
            contentLength
        );

        if (
            contentType.includes(
                "text/html"
            )
        ) {
            return res.status(400).json({
                error:
                    "Media URL returned HTML instead of media"
            });
        }

        res.setHeader(
            "Content-Type",
            contentType
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );

        if (contentLength) {
            res.setHeader(
                "Content-Length",
                contentLength
            );
        }

        response.data.pipe(res);

        response.data.on(
            "error",
            error => {
                console.error(
                    "Stream error:",
                    error.message
                );

                if (!res.headersSent) {
                    res.status(500).json({
                        error:
                            "Media stream failed"
                    });
                }
            }
        );
    }

    catch (error) {
        console.error(
            "MEDIA ERROR:",
            error.message
        );

        if (!res.headersSent) {
            res.status(500).json({
                error:
                    "Media download failed",

                details:
                    error.message
            });
        }
    }
}


// =================================
// YOUTUBE / SHORTS
// =================================

async function downloadYouTube(
    url,
    res,
    fileName
) {
    console.log("Starting yt-dlp:");
    console.log(url);

    const outputPath = path.join(
        downloadsFolder,
        `${Date.now()}-${fileName}`
    );

    try {
        console.log("Output path:");
        console.log(outputPath);

        const process = ytDlp(
            url,
            {
                noPlaylist: true,

                format:
                    "best[ext=mp4]/best",

                output:
                    outputPath,

                mergeOutputFormat:
                    "mp4",

                noWarnings:
                    true,

                verbose:
                    true
            }
        );

        process.stdout?.on(
            "data",
            data => {
                console.log(
                    "YT-DLP STDOUT:",
                    data.toString()
                );
            }
        );

        process.stderr?.on(
            "data",
            data => {
                console.log(
                    "YT-DLP STDERR:",
                    data.toString()
                );
            }
        );

        await process;

        console.log(
            "yt-dlp finished"
        );

        if (
            !fs.existsSync(outputPath)
        ) {
            return res.status(500).json({
                error:
                    "Downloaded file was not created"
            });
        }

        console.log(
            "File exists, sending..."
        );

        res.download(
            outputPath,
            fileName,
            error => {
                if (error) {
                    console.error(
                        "Send error:",
                        error.message
                    );
                }

                if (
                    fs.existsSync(outputPath)
                ) {
                    fs.unlinkSync(
                        outputPath
                    );
                }
            }
        );
    }

    catch (error) {
        console.error(
            "YT-DLP ERROR:"
        );

        console.error(
            error
        );

        if (
            fs.existsSync(outputPath)
        ) {
            fs.unlinkSync(
                outputPath
            );
        }

        if (
            !res.headersSent
        ) {
            return res.status(500).json({
                error:
                    "YouTube download failed",

                details:
                    error.stderr ||
                    error.message
            });
        }
    }
}

// =================================
// DOWNLOAD ROUTE
// =================================

app.get(
    "/download",
    async (req, res) => {
        try {
            const url =
                req.query.url;

            if (!url) {
                return res.status(400).json({
                    error:
                        "URL is required"
                });
            }

            console.log(
                "Download request:",
                url
            );


            // =================================
            // TIKTOK
            // =================================

            if (
                url.includes(
                    "tiktok.com"
                )
            ) {
                const response =
                    await axios.get(
                        `https://api.tikwmapi.com/?url=${encodeURIComponent(url)}&hd=1`,
                        {
                            headers: {
                                "x-tikwmapi-key":
                                    TIKWM_API_KEY
                            },

                            timeout:
                                60000
                        }
                    );

                const result =
                    response.data;

                if (
                    result.code !==
                    0
                ) {
                    return res.status(400).json(
                        result
                    );
                }

                const videoUrl =
                    result.data?.hdplay ||
                    result.data?.play;

                if (!videoUrl) {
                    return res.status(400).json({
                        error:
                            "TikTok video URL not found"
                    });
                }

                return streamMedia(
                    videoUrl,
                    res,
                    "tiktok-video.mp4"
                );
            }


            // =================================
            // INSTAGRAM
            // =================================

            if (
                url.includes(
                    "instagram.com"
                )
            ) {
                const response =
                    await axios.post(
                        "https://instagram120.p.rapidapi.com/api/instagram/links",

                        {
                            url
                        },

                        {
                            headers: {
                                "Content-Type":
                                    "application/json",

                                "x-rapidapi-host":
                                    "instagram120.p.rapidapi.com",

                                "x-rapidapi-key":
                                    INSTAGRAM_RAPIDAPI_KEY
                            },

                            timeout:
                                60000
                        }
                    );

                const data =
                    response.data;

                console.log(
                    "Instagram response:",
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                );

                if (
                    !Array.isArray(data) ||
                    data.length === 0
                ) {
                    return res.status(400).json({
                        error:
                            "Invalid Instagram response"
                    });
                }

                const media =
                    data[0]?.urls?.[0];

                if (!media?.url) {
                    return res.status(400).json({
                        error:
                            "Instagram media URL not found"
                    });
                }

                const ext =
                    media.extension?.toLowerCase();

                let fileName =
                    "instagram-video.mp4";

                if (
                    ext === "jpg" ||
                    ext === "jpeg"
                ) {
                    fileName =
                        "instagram-photo.jpg";
                }

                else if (
                    ext === "png"
                ) {
                    fileName =
                        "instagram-photo.png";
                }

                return streamMedia(
                    media.url,
                    res,
                    fileName
                );
            }


            // =================================
            // YOUTUBE / SHORTS
            // =================================

            if (
                url.includes(
                    "youtube.com"
                ) ||
                url.includes(
                    "youtu.be"
                )
            ) {
                const fileName =
                    url.includes(
                        "/shorts/"
                    )
                        ? "youtube-shorts.mp4"
                        : "youtube-video.mp4";

                return downloadYouTube(
                    url,
                    res,
                    fileName
                );
            }


            // =================================
            // UNSUPPORTED
            // =================================

            return res.status(400).json({
                error:
                    "Unsupported platform"
            });
        }

        catch (error) {
            console.error(
                "DOWNLOAD ERROR:",
                error.message
            );

            if (
                error.response
            ) {
                console.error(
                    "API STATUS:",
                    error.response.status
                );

                console.error(
                    "API DATA:",
                    error.response.data
                );
            }

            if (
                !res.headersSent
            ) {
                return res.status(500).json({
                    error:
                        "Download failed",

                    details:
                        error.message
                });
            }
        }
    }
);


// =================================
// SERVER
// =================================

app.listen(
    PORT,
    () => {
        console.log(
            `Server running on port ${PORT}`
        );
    }
);