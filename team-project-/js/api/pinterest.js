window.PinterestAPI = {
    key: "50dd52e0b2msh675e82d018b5553p1eea82jsn588993dd9111",

    async getMedia(pinterestUrl) {
        const encodedUrl = encodeURIComponent(pinterestUrl);

        const response = await fetch(
            `https://pinterest-video-and-image-downloader.p.rapidapi.com/pinterest?url=${encodedUrl}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "pinterest-video-and-image-downloader.p.rapidapi.com",
                    "x-rapidapi-key": this.key
                }
            }
        );

        return await response.json();
    }
};