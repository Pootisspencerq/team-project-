const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use(cors());

app.get("/download", async (req, res) => {
    try {
        const url = req.query.url;

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

        const videoUrl = result.data.hdplay || result.data.play;

        const video = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
        });

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="tiktok-video.mp4"'
        );

        video.data.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Download failed" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});