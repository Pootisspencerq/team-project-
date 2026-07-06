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
            // Если внутри элемента есть ссылка (как в меню), меняем текст только у текстового узла
            if (element.tagName === 'LI' && element.querySelector('a')) {
                element.querySelector('a').innerText = translations[lang][id];
            } else {
                element.innerText = translations[lang][id];
            }
        }
    }
    localStorage.setItem("lang", lang);
}

// При загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "ru";
    setLanguage(savedLang);
});