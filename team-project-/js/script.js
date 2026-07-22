const translations = {

    /* =========================
       РУССКИЙ
    ========================= */

    ru: {

        // Навигация
        "nav-home": "Главная",
        "nav-how-to": "Как скачать",
        "nav-languages": "Языки",

        // Главная страница
        "title": "SnapTik Video Downloader",

        "description":
            "Вставьте ссылку на видео TikTok ниже, чтобы скачать его без водяных знаков",

        "button-download": "Скачать",

        "sub-title":
            "Нажимая кнопку Скачать, вы соглашаетесь с нашими правилами.",

        "prava":
            "2026 SnapTik. Все права защищены.",

        "users-confirm":
            "Пользовательское соглашение",

        "politics":
            "Политика конфиденциальности",

        "telegram":
            "Telegram-бот",

        // How to download
        "title-page":
            "Как скачать видео?",

        "how-to-h1":
            "Как скачать видео?",

        "step-1":
            "<strong>1. Выбери видео:</strong> Найди понравившееся видео в приложении TikTok.",

        "step-2":
            "<strong>2. Скопируй ссылку:</strong> Нажми кнопку <span>Поделиться</span> (Share) и выбери Копировать ссылку (Copy Link).",

        "step-3":
            "<strong>3. Вставь ссылку:</strong> Вернись на наш сайт и вставь ссылку в поле ввода на главной странице.",

        "step-4":
            "<strong>4. Скачай:</strong> Нажми кнопку <span>Скачать</span> и выбери формат без водяного знака.",

        "note-text":
            "<strong>Примечание:</strong> После того как ты вставишь ссылку, подожди 3-5 секунд, пока система обработает видео.",

        "back-link":
            "← Вернуться на главную",

        "examples-title":
            "<strong>Примеры ссылок, которые можно использовать:</strong>",

        "other-formats":
            "и другие форматы..."
    },


    /* =========================
       УКРАЇНСЬКА
    ========================= */

    uk: {

        // Навігація
        "nav-home": "Головна",
        "nav-how-to": "Як завантажити",
        "nav-languages": "Мови",

        // Головна сторінка
        "title": "SnapTik Video Downloader",

        "description":
            "Вставте посилання на відео TikTok нижче, щоб завантажити його без водяних знаків",

        "button-download": "Завантажити",

        "sub-title":
            "Натискаючи кнопку Завантажити, ви погоджуєтесь з нашими правилами.",

        "prava":
            "2026 SnapTik. Усі права захищені.",

        "users-confirm":
            "Угода користувача",

        "politics":
            "Політика конфіденційності",

        "telegram":
            "Telegram-бот",

        // How to download
        "title-page":
            "Як завантажити відео?",

        "how-to-h1":
            "Як завантажити відео?",

        "step-1":
            "<strong>1. Обери відео:</strong> Знайди відео, яке тобі сподобалося, у застосунку TikTok.",

        "step-2":
            "<strong>2. Скопіюй посилання:</strong> Натисни кнопку <span>Поділитися</span> (Share) і вибери Скопіювати посилання (Copy Link).",

        "step-3":
            "<strong>3. Встав посилання:</strong> Повернися на наш сайт і встав посилання в поле введення на головній сторінці.",

        "step-4":
            "<strong>4. Завантаж:</strong> Натисни кнопку <span>Завантажити</span> і вибери формат без водяного знака.",

        "note-text":
            "<strong>Примітка:</strong> Після того як ти вставиш посилання, зачекай 3-5 секунд, поки система обробить відео.",

        "back-link":
            "← Повернутися на головну",

        "examples-title":
            "<strong>Приклади посилань, які можна використовувати:</strong>",

        "other-formats":
            "та інші формати..."
    },


    /* =========================
       ENGLISH
    ========================= */

    en: {

        // Navigation
        "nav-home": "Home",
        "nav-how-to": "How to download",
        "nav-languages": "Languages",

        // Main page
        "title": "SnapTik Video Downloader",

        "description":
            "Paste your TikTok video link below to download without watermark",

        "button-download":
            "Download",

        "sub-title":
            "By clicking Download, you agree to our terms.",

        "prava":
            "2026 SnapTik. All rights reserved.",

        "users-confirm":
            "Terms of Service",

        "politics":
            "Privacy Policy",

        "telegram":
            "Telegram-bot",

        // How to download
        "title-page":
            "How to Download a Video?",

        "how-to-h1":
            "How to download a video?",

        "step-1":
            "<strong>1. Choose a video:</strong> Find a video you like in the TikTok app.",

        "step-2":
            "<strong>2. Copy the link:</strong> Tap <span>Share</span> and choose Copy Link.",

        "step-3":
            "<strong>3. Paste the link:</strong> Return to our website and paste the link into the input field on the homepage.",

        "step-4":
            "<strong>4. Download:</strong> Click the <span>Download</span> button and choose the format without a watermark.",

        "note-text":
            "<strong>Note:</strong> After you paste the link, wait 3-5 seconds while the system processes the video.",

        "back-link":
            "← Back to homepage",

        "examples-title":
            "<strong>Examples of links you can use:</strong>",

        "other-formats":
            "and other formats..."
    }

};


/* =========================
   LANGUAGE
========================= */

function setLanguage(lang) {

    if (!translations[lang]) {
        lang = "ru";
    }

    for (const id in translations[lang]) {

        const element =
            document.getElementById(id);

        if (!element) continue;

        const text =
            translations[lang][id];

        if (
            text.includes("<strong>") ||
            text.includes("<span>")
        ) {
            element.innerHTML = text;
        } else {

            if (
                element.tagName === "LI" &&
                element.querySelector("a")
            ) {
                element.querySelector("a").innerText = text;
            } else {
                element.innerText = text;
            }
        }
    }

    localStorage.setItem("lang", lang);
}


/* =========================
   DOWNLOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedLang =
            localStorage.getItem("lang") || "ru";

        setLanguage(savedLang);


        const downloadButton =
            document.getElementById(
                "button-download"
            );

        const input =
            document.querySelector(
                ".links-paste"
            );

        const loader =
            document.getElementById(
                "loader"
            );


        if (!downloadButton) {

            console.error(
                "Button #button-download not found"
            );

            return;
        }


        if (!input) {

            console.error(
                "Input .links-paste not found"
            );

            return;
        }


        downloadButton.addEventListener(
            "click",
            () => {

                const url =
                    input.value.trim();


                if (!url) {

                    alert(
                        "Вставьте ссылку"
                    );

                    return;
                }


                const isSupported =
                    url.includes(
                        "instagram.com"
                    ) ||
                    url.includes(
                        "tiktok.com"
                    ) ||
                    url.includes(
                        "youtube.com"
                    ) ||
                    url.includes(
                        "youtu.be"
                    );


                if (!isSupported) {

                    alert(
                        "Поддерживаются только TikTok, Instagram и YouTube ссылки"
                    );

                    return;
                }


                /*
                 * Показываем loader
                 */

                if (loader) {

                    loader.style.display =
                        "flex";
                }


                /*
                 * ВАЖНО:
                 *
                 * Не используем fetch()
                 * Не используем blob()
                 *
                 * Браузер скачивает файл напрямую.
                 */

                const downloadUrl =
                    `http://127.0.0.1:3000/download?url=${encodeURIComponent(
                        url
                    )}`;


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    downloadUrl;


                link.download =
                    "video.mp4";


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                /*
                 * Loader убираем
                 * через небольшую задержку
                 */

                setTimeout(
                    () => {

                        if (loader) {

                            loader.style.display =
                                "none";
                        }

                    },
                    1500
                );
            }
        );
    }
);