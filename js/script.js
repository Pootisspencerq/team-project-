// ==========================================
// 1. МУЛЬТИЯЗЫЧНАЯ БАЗА ДАННЫХ (ИНТЕРФЕЙС И ВОПРОСЫ)
// ==========================================
const translations = {
    ua: {
        startSubtitle: "Ready to test your power?",
        startTitlePurple: "Prototyping",
        startDesc: "Ласкаво просимо до інтерактивного квізу. Перевір свої знання, зароби очки впевненості та відкрий унікальні досягнення в стилі кібербез.",
        startBtn: "Почати гру",
        tabQuestion: "Питання",
        tabTimer: "Таймер",
        footerGiveUp: "Здатися",
        footerStuck: "Застряг?",
        finalVictory: "ПЕРЕМОГА",
        finalDefeat: "ПОРАЗКА",
        finalDesc: "Систему проскановано. Всі дані успішно вилучено та синхронізовано з вашим профілем.",
        finalXpLabel: "XP ОТРИМАНО",
        finalMenuBtn: "MAIN TERMINAL",
        questions: [
            { question: "Вам надійшов лист від банку про блокування картки з посиланням на сайт, адреса якого відрізняється на одну літеру. Що це за атака?", answers: ["Спуфінг", "Фішинг", "Брутфорс", "Ін'єкція коду"], correct: 1 },
            { question: "Яка атака базується на автоматичному переборі мільярдів комбінацій символів для зламу пароля?", answers: ["DDoS-атака", "Man-in-the-Middle", "Брутфорс", "Сніффінг"], correct: 2 },
            { question: "Як називається атака, коли хакер таємно перехоплює та підміняє повідомлення між двома користувачами?", answers: ["Man-in-the-Middle", "SQL-ін'єкція", "Ransomware", "Zero-Day"], correct: 0 },
            { question: "Шкідлива програма зашифрувала файли на комп'ютері та вимагає викуп у біткоїнах. До якого класу вона належить?", answers: ["Троян", "Майнер", "Рэнсомвар (Вимагач)", "Шпигунське ПО"], correct: 2 },
            { question: "Що з переліченого є прикладом біометричного фактора при двофакторній автентифікації?", answers: ["Одноразовий код з SMS", "Сканування відпечатка пальця / FaceID", "USB-токен", "Секретне слово"], correct: 1 },
            { question: "Яка уязвимість дозволяє хакеру ввести шкідливий запит у поле логіна і отримати доступ до бази даних сайту?", answers: ["XSS-скриптинг", "SQL-ін'єкція", "CSRF-підробка", "Фішинг"], correct: 1 },
            { question: "Який протокол безпечно шифрує трафік між вашим браузером і сайтом, захищаючи дані карток?", answers: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: 2 },
            { question: "Що означає термін 'Уязвимість нульового дня'?", answers: ["Уязвимість, яку виправляють за 0 днів", "Помилка, яка зникає при перезавантаженні", "Пролом у безпеці, для якого розробники ще не створили патч виправлення", "Вірус, який активується рівно о півночі"], correct: 2 }
        ]
    },
    ru: {
        startSubtitle: "Ready to test your power?",
        startTitlePurple: "Prototyping",
        startDesc: "Добро пожаловать в интерактивный квиз. Проверь свои знания, заработай очки уверенности и открой уникальные достижения в стиле кибербез.",
        startBtn: "Начать игру",
        tabQuestion: "Вопрос",
        tabTimer: "Таймер",
        footerGiveUp: "Сдаться",
        footerStuck: "Застрял?",
        finalVictory: "ПОБЕДА",
        finalDefeat: "ПОРАЖЕНИЕ",
        finalDesc: "Система просканирована. Все данные успешно извлечены и синхронизированы с вашим профилем.",
        finalXpLabel: "XP ПОЛУЧЕНО",
        finalMenuBtn: "MAIN TERMINAL",
        questions: [
            { question: "Вам пришло письмо от банка о блокировке карты со ссылкой на сайт, адрес которого отличается на одну букву. Что это за атака?", answers: ["Спуфинг", "Фишинг", "Брутфорс", "Инъекция кода"], correct: 1 },
            { question: "Какая атака базируется на автоматическом переборе миллиардов комбинаций символов для взлома пароля?", answers: ["DDoS-атака", "Man-in-the-Middle", "Брутфорс", "Сниффинг"], correct: 2 },
            { question: "Как называется атака, когда хакер тайно перехватыет и подменяет сообщения между двумя пользователями?", answers: ["Man-in-the-Middle", "SQL-инъекция", "Ransomware", "Zero-Day"], correct: 0 },
            { question: "Вредоносная программа зашифрованная файлы на компьютере и требует выкуп в биткоинах. К какому классу она относится?", answers: ["Троян", "Майнер", "Рэнсомвар (Вымогатель)", "Шпионское ПО"], correct: 2 },
            { question: "Что из перечисленного является примером биометрического фактора при двухфакторной аутентификации?", answers: ["Одноразовый код из SMS", "Сканирование отпечатка пальца / FaceID", "USB-токен", "Секретное слово"], correct: 1 },
            { question: "Какая уязвимость позволяет хакеру ввести вредоносный запрос в поле логина и получить доступ к базе данных сайта?", answers: ["XSS-скриптинг", "SQL-инъекция", "CSRF-подделка", "Фишинг"], correct: 1 },
            { question: "Какой протокол безопасно шифрует трафик между вашим браузером и сайтом, защищая данные карт?", answers: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: 2 },
            { question: "Что означает термин 'Уязвимость нулевого дня'?", answers: ["Уязвимость, которую исправляют за 0 дней", "Ошибка, исчезающая при перезагрузке", "Брешь в безопасности, для которой разработчики еще не создали патч исправления", "Вирус, активирующийся ровно в полночь"], correct: 2 }
        ]
    },
    en: {
        startSubtitle: "Ready to test your power?",
        startTitlePurple: "Prototyping",
        startDesc: "Welcome to the interactive quiz. Test your knowledge, earn confidence points, and unlock unique cybersec-styled achievements.",
        startBtn: "Start Game",
        tabQuestion: "Question",
        tabTimer: "Timer",
        footerGiveUp: "Give Up",
        footerStuck: "Stuck?",
        finalVictory: "VICTORY",
        finalDefeat: "DEFEAT",
        finalDesc: "System scanned. All data successfully extracted and synchronized with your profile.",
        finalXpLabel: "XP GAINED",
        finalMenuBtn: "MAIN TERMINAL",
        questions: [
            { question: "You received an email from a bank about a card lock containing a link to a website with an address misspelled by one letter. What attack is this?", answers: ["Spoofing", "Phishing", "Brute-force", "Code injection"], correct: 1 },
            { question: "Which attack relies on automated guessing of billions of character combinations to crack a password?", answers: ["DDoS attack", "Man-in-the-Middle", "Brute-force", "Sniffing"], correct: 2 },
            { question: "What is the attack called when a hacker secretly intercepts and alters communication between two parties?", answers: ["Man-in-the-Middle", "SQL injection", "Ransomware", "Zero-Day"], correct: 0 },
            { question: "Malicious software encrypted files on a computer and demands a bitcoin ransom. What class does it belong to?", answers: ["Trojan", "Miner", "Ransomware", "Spyware"], correct: 2 },
            { question: "Which of the following is an example of a biometric factor in two-factor authentication?", answers: ["One-time SMS code", "Fingerprint scan / FaceID", "USB token", "Secret word"], correct: 1 },
            { question: "Which vulnerability allows a hacker to insert a malicious query into a login input to access the site database?", answers: ["XSS scripting", "SQL injection", "CSRF forgery", "Phishing"], correct: 1 },
            { question: "Which protocol securely encrypts traffic between your browser and a website, protecting card data?", answers: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: 2 },
            { question: "What does the term 'Zero-Day Vulnerability' mean?", answers: ["A vulnerability fixed in 0 days", "An error that disappears upon rebooting", "A security flaw for which developers have not yet created a corrective patch", "A virus that activates precisely at midnight"], correct: 2 }
        ]
    }
};

let currentLang = 'ua'; // Язык по умолчанию

// ==========================================
// 2. СЕЛЕКТОРЫ СТРУКТУРЫ UI
// ==========================================
const startScreen = document.querySelector('.start-screen');
const quizScreen = document.querySelector('.quize-screen');
const finalScreen = document.querySelector('.final-container');

// Элементы стартового экрана для перевода
const startSubtitle = document.getElementById('start-subtitle');
const startTitlePurple = document.getElementById('start-title-purple');
const startDesc = document.getElementById('start-desc');

// Кнопки управления
const startBtn = document.querySelector('.str-button');
const restartBtn = document.querySelector('.menu-btn');
const giveUpLink = document.querySelector('.footer a'); 
const footerStuckBtn = document.getElementById('footer-stuck');

// Динамические текстовые блоки квиза
const questionNumberText = document.querySelector('.Tab h2:nth-child(1)');
const timerText = document.querySelector('.Tab h2:nth-child(2)');
const xpText = document.querySelector('.Tab h2:nth-child(3)');

const questionTitle = document.querySelector('.question h1');
const answersContainer = document.querySelector('.answers-button');

// Блоки финального экрана
const finalTitle = document.querySelector('.final-container h1');
const finalDesc = document.getElementById('final-desc');
const finalXpLabel = document.getElementById('final-xp-label');
const finalScoreValue = document.querySelector('.score-value');

// Подключаем переключатель языков
const langSelect = document.getElementById('lang-select');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// ==========================================
// 3. СИСТЕМА ЛОКАЛИЗАЦИИ
// ==========================================

function updateInterfaceLanguage() {
    const langData = translations[currentLang];
    
    // Перевод текстов Главного меню
    if (startSubtitle) startSubtitle.textContent = langData.startSubtitle;
    if (startTitlePurple) startTitlePurple.textContent = langData.startTitlePurple;
    if (startDesc) startDesc.textContent = langData.startDesc;
    if (startBtn) startBtn.textContent = langData.startBtn;
    
    // Перевод нижних кнопок квиза
    if (giveUpLink) giveUpLink.textContent = langData.footerGiveUp;
    if (footerStuckBtn) footerStuckBtn.textContent = langData.footerStuck;
    
    // Перевод Финала
    if (finalDesc) finalDesc.textContent = langData.finalDesc;
    if (finalXpLabel) finalXpLabel.textContent = langData.finalXpLabel;
    if (restartBtn) restartBtn.textContent = langData.finalMenuBtn;

    // Перерисовка активного вопроса, если переключили язык прямо в бою
    if (!quizScreen.classList.contains('hide')) {
        updateQuizLabels();
        const activeButtons = answersContainer.querySelectorAll('button');
        if (activeButtons.length > 0) {
            const currentQuestion = translations[currentLang].questions[currentQuestionIndex];
            questionTitle.textContent = currentQuestion.question;
            activeButtons.forEach((btn, idx) => {
                if (currentQuestion.answers[idx]) btn.textContent = currentQuestion.answers[idx];
            });
        }
    }
}

// Отслеживание кликов по селектору языков
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateInterfaceLanguage();
    });
}

function updateQuizLabels() {
    const langData = translations[currentLang];
    const totalQuestions = langData.questions.length;
    questionNumberText.textContent = `${langData.tabQuestion}: ${currentQuestionIndex + 1}/${totalQuestions}`;
    timerText.textContent = `${langData.tabTimer}: ${timeLeft}`;
    xpText.textContent = `XP: ${score}`;
}

// ==========================================
// 4. ИГРОВАЯ ЛОГІКА
// ==========================================

// Запуск игры
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hide');   
    finalScreen.classList.add('hide');   
    quizScreen.classList.remove('hide'); 
    
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
});

// Функция вывода вопроса на экран
function showQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    updateQuizLabels();
    startTimer();

    const currentQuestion = translations[currentLang].questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index));
        answersContainer.appendChild(button);
    });
}

// Проверка ответа
function checkAnswer(selectedIndex) {
    clearInterval(timer); 

    const currentQuestion = translations[currentLang].questions[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll('button');

    buttons.forEach(btn => btn.style.pointerEvents = 'none');

    if (selectedIndex === currentQuestion.correct) {
        score += 1000; 
        buttons[selectedIndex].classList.add('correct-glow'); 
    } else {
        buttons[selectedIndex].classList.add('wrong-glow'); 
        if (buttons[currentQuestion.correct]) {
            buttons[currentQuestion.correct].classList.add('correct-glow');
        }
    }

    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

// Переход к следующему вопросу или финалу
function nextQuestion() {
    currentQuestionIndex++;
    const totalQuestions = translations[currentLang].questions.length;
    
    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        endGame();
    }
}

// Таймер обратного отсчета
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = `${translations[currentLang].tabTimer}: ${timeLeft}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); 
        }
    }, 1000);
}

// Финал игры
function endGame() {
    clearInterval(timer);
    quizScreen.classList.add('hide');       
    startScreen.classList.add('hide');      
    finalScreen.classList.remove('hide');   
    
    if (score >= 4000) {
        finalTitle.textContent = translations[currentLang].finalVictory;
    } else {
        finalTitle.textContent = translations[currentLang].finalDefeat;
    }
    
    finalScoreValue.textContent = score;
}

// Возврат в главное меню
restartBtn.addEventListener('click', () => {
    finalScreen.classList.add('hide');     
    quizScreen.classList.add('hide');      
    startScreen.classList.remove('hide');  
});

// Кнопка "Сдаться"
giveUpLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    endGame();
});

// Запуск первой локализации при загрузке страницы
updateInterfaceLanguage();