window.TikTokAPI = {
    key: "f43999988a1733b02537278ac9f883a0",

    async getVideo(tiktokUrl) {
        const response = await fetch(
            `https://api.tikwmapi.com/?url=${encodeURIComponent(tiktokUrl)}&hd=1`,
            {
                method: "GET",
                headers: {
                    "x-tikwmapi-key": this.key
                }
            }
        );

        return await response.json();
    }
};