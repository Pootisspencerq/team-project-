const translations = {
    ru: {
        "nav-home": "Главная",
        "nav-how-to": "Как скачать",
        "nav-languages": "Языки",
        "title": "SnapTik Video Downloader",
        "description": "Вставьте ссылку на видео TikTok ниже, чтобы скачать его без водяных знаков",
        "button-download": "Скачать",
        "sub-title": "Нажимая кнопку Скачать, вы соглашаетесь с нашими правилами.",
        "prava": "2026 SnapTik. Все права защищены.",
        "users-confirm": "Пользовательское соглашение",
        "politics": "Политика конфиденциальности",
        "telegram": "Telegram-бот"
    },
    uk: {
        "nav-home": "Головна",
        "nav-how-to": "Як завантажити",
        "nav-languages": "Мови",
        "title": "SnapTik Video Downloader",
        "description": "Вставте посилання на відео TikTok нижче, щоб завантажити його без водяних знаків",
        "button-download": "Завантажити",
        "sub-title": "Натискаючи кнопку Завантажити, ви погоджуєтесь з нашими правилами.",
        "prava": "2026 SnapTik. Усі права захищені.",
        "users-confirm": "Угода користувача",
        "politics": "Політика конфіденційності",
        "telegram": "Telegram-бот"
    },
    en: {
        "nav-home": "Home",
        "nav-how-to": "How to download",
        "nav-languages": "Languages",
        "title": "SnapTik Video Downloader",
        "description": "Paste your TikTok video link below to download without watermark",
        "button-download": "Download",
        "sub-title": "By clicking Download, you agree to our terms.",
        "prava": "2026 SnapTik. All rights reserved.",
        "users-confirm": "Terms of Service",
        "politics": "Privacy Policy",
        "telegram": "Telegram-bot"
    }
};

function setLanguage(lang) {
    for (let id in translations[lang]) {
        const element = document.getElementById(id);

        if (element) {
            if (element.tagName === "LI" && element.querySelector("a")) {
                element.querySelector("a").innerText = translations[lang][id];
            } else {
                element.innerText = translations[lang][id];
            }
        }
    }

    localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "ru";
    setLanguage(savedLang);

    document.getElementById("button-download").addEventListener("click", async () => {
        const url = document.querySelector(".links-paste").value.trim();

        if (!url) return;

        const loader = document.getElementById("loader");
        loader.style.display = "flex";

        try {
            let result;

            if (url.includes("instagram.com")) {
                result = await InstagramAPI.getVideo(url);
            }
            else if (url.includes("tiktok.com")) {
                result = await TikTokAPI.getVideo(url);
            }
            else {
                throw new Error("Підтримуються тільки TikTok та Instagram посилання");
            }



            const response = await fetch(
                `http://127.0.0.1:3000/download?url=${encodeURIComponent(url)}`
            );

            if (!response.ok) {
                throw new Error("Download failed");
            }

            const blob = await response.blob();

            const downloadUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "video.mp4";

            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            console.error(error);
            alert(error.message || "Сталася помилка");
        } finally {
            loader.style.display = "none";
        }
    });
});