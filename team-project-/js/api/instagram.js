window.InstagramAPI = {
    key: "1fcfd23dfdmshfa5cb595cb8d07fp1e51b7jsn259b091c1f03",

    async getVideo(instagramUrl) {
        const response = await fetch(
            "https://instagram120.p.rapidapi.com/api/instagram/links",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "instagram120.p.rapidapi.com",
                    "x-rapidapi-key": this.key
                },
                body: JSON.stringify({
                    url: instagramUrl
                })
            }
        );

        return await response.json();
    }
};