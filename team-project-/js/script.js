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
        const tiktokUrl = document.querySelector(".links-paste").value.trim();

        if (!tiktokUrl) return;

        document.getElementById("loader").style.display = "flex";

        try {
            const result = await API.getVideo(tiktokUrl);

            console.log(result);

            if (result.code === 0) {
                const response = await fetch(
                    `http://127.0.0.1:3000/download?url=${encodeURIComponent(tiktokUrl)}`
                );

                if (!response.ok) {
                    throw new Error("Download failed");
                }

                const blob = await response.blob();

                document.getElementById("loader").style.display = "none";

                const downloadUrl = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = "tiktok-video.mp4";

                document.body.appendChild(a);
                a.click();
                a.remove();

                URL.revokeObjectURL(downloadUrl);
            } else {
                document.getElementById("loader").style.display = "none";
                alert("Помилка отримання відео");
            }
        } catch (error) {
            document.getElementById("loader").style.display = "none";
            console.error(error);
            alert("Сталася помилка");
        }
    });
});