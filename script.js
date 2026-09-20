const TELEGRAM_BOT_TOKEN = 'BU_YERGA_BOT_TOKENINI_QOYING';
const TELEGRAM_CHAT_ID = 'BU_YERGA_CHAT_ID_NI_QOYING';
const GOOGLE_SCRIPT_URL = 'BU_YERGA_GOOGLE_WEB_APP_URL_NI_QOYING';

const translations = {
    uz_cyr: {
        tickerText: "<span>🚚 Ўзбекистон бўйлаб БЕПУЛ етказиб бериш</span><span>🌿 100% Табиий таркиб</span><span>⭐ 20,000+ Мамнун мижозлар</span><span>🔐 100% Махфийлик кафолатланади</span>",
        navBtn: "Буюртма бериш",
        heroBadge: "⭐ 20,000+ Мижозлар Ишончи",
        heroTitle: "ОҚ ДОҒЛАРДАН ҲАЛОС БЎЛИШ ЭНДИ ИЛОЖСИЗ ЭМАС!",
        heroDesc: "Витилиго ва тери пигментацияси муаммолари учун 100% табиий комплекс ечим.",
        feat1: "100% Табиий гиёҳлар", feat2: "Ўзига ўргатиб қўймайди", feat3: "Кафолатланган сифат",
        heroBtn: "Буюртма бериш", subCta: "🔒 Маълумотларингиз сир тутилиши кафолатланади",
        painTitle: "Терингизни аввалги ҳолатига қайтаришнинг иложи йўқ деб ўйласангиз – Адашасиз!",
        pain1T: "Теридаги оқ доғлар", pain2T: "Уят ва ноқулайлик ҳисси", pain3T: "Руҳий босим ва асабийлик", pain4T: "Натижасиз даволаш уринишлари",
        howMainTitle: "QOMUS табиий комплекси қандай ишлайди?",
        compTitle: "Нинга айнан QOMUS воситасини танлашади?",
        bundleTitle: "Ўзингизга мос курсни танланг",
        certTitle: "Сифат ва Хавфсизлик Сертификатлари",
        formTitle: "Бепул Мутахассис Консультацияси ва Буюртма",
        formBtn: "Буюртма бериш"
    },
    uz: {
        tickerText: "<span>🚚 O'zbekiston bo'ylab BEPUL yetkazib berish</span><span>🌿 100% Tabiiy tarkib</span><span>⭐ 20,000+ Mamnun mijozlar</span>",
        navBtn: "Buyurtma berish",
        heroBadge: "⭐ 20,000+ Mijozlar Ishonchi",
        heroTitle: "OQ DOG'LARDAN HALOS BO'LISH ENDI ILOJSIZ EMAS!",
        heroDesc: "Vitiligo va teri pigmentatsiyasi muammolari uchun 100% tabiiy kompleks yechim.",
        feat1: "100% Tabiiy giyohlar", feat2: "O'ziga o'rgatib qo'ymaydi", feat3: "Kafolatlangan sifat",
        heroBtn: "Buyurtma berish", subCta: "🔒 Ma'lumotlaringiz sir tutilishi kafolatlanadi",
        painTitle: "Teringizni avvalgi holatiga qaytarishning iloji yo'q deb o'ylasangiz – Adashasiz!",
        pain1T: "Teridagi oq dog'lar", pain2T: "Uyat va noqulaylik hissi", pain3T: "Ruhiy bosim va asabiylik", pain4T: "Natijasiz davolash urinishlari",
        howMainTitle: "QOMUS tabiiy kompleksi qanday ishlaydi?",
        compTitle: "Nega aynan QOMUS vositasini tanlashadi?",
        bundleTitle: "O'zingizga mos kursni tanlang",
        certTitle: "Sifat va Xavfsizlik Sertifikatlari",
        formTitle: "Bepul Mutaxassis Konsultatsiyasi va Buyurtma",
        formBtn: "Buyurtma berish"
    },
    ru: {
        tickerText: "<span>🚚 Бесплатная доставка по всему Узбекистану</span><span>🌿 100% Натуральный состав</span>",
        navBtn: "Оформить заказ",
        heroBadge: "⭐ Доверие более 20,000+ клиентов",
        heroTitle: "ИЗБАВЛЕНИЕ ОТ БЕЛЫХ ПЯТЕН ТЕПЕРЬ ВОЗМОЖНО!",
        heroDesc: "100% натуральное комплексное решение проблем с витилиго и пигментацией кожи.",
        feat1: "100% Натуральные травы", feat2: "Не вызывает привыкания", feat3: "Гарантированное качество",
        heroBtn: "Оформить заказ", subCta: "🔒 Полная конфиденциальность ваших данных",
        painTitle: "Если вы думаете, что вернуть коже прежний вид невозможно – вы ошибаетесь!",
        pain1T: "Белые пятна на коже", pain2T: "Чувство стыда и дискомфорта", pain3T: "Стресс и неуверенность", pain4T: "Бесполезные попытки лечения",
        howMainTitle: "Как работает натуральный комплекс QOMUS?",
        compTitle: "Почему выбирают именно QOMUS?",
        bundleTitle: "Выберите подходящий курс",
        certTitle: "Сертификаты Качества и Безопасности",
        formTitle: "Бесплатная Консультация и Заказ",
        formBtn: "Оформить заказ"
    }
};

function changeLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
    const t = translations[lang] || translations['uz_cyr'];

    document.getElementById('ticker-text').innerHTML = t.tickerText;
    document.getElementById('nav-btn').innerText = t.navBtn;
    document.getElementById('hero-badge').innerText = t.heroBadge;
    document.getElementById('hero-title').innerText = t.heroTitle;
    document.getElementById('hero-desc').innerText = t.heroDesc;
    document.getElementById('feat-1').innerText = t.feat1;
    document.getElementById('feat-2').innerText = t.feat2;
    document.getElementById('feat-3').innerText = t.feat3;
    document.getElementById('hero-btn-text').innerText = t.heroBtn;
    document.getElementById('sub-cta-text').innerText = t.subCta;
    document.getElementById('pain-title').innerText = t.painTitle;
    document.getElementById('pain-1-t').innerText = t.pain1T;
    document.getElementById('pain-2-t').innerText = t.pain2T;
    document.getElementById('pain-3-t').innerText = t.pain3T;
    document.getElementById('pain-4-t').innerText = t.pain4T;
    document.getElementById('how-main-title').innerText = t.howMainTitle;
    document.getElementById('comp-title').innerText = t.compTitle;
    document.getElementById('bundle-title').innerText = t.bundleTitle;
    document.getElementById('cert-title').innerText = t.certTitle;
    document.getElementById('form-title').innerText = t.formTitle;
    document.getElementById('form-btn-text').innerText = t.formBtn;
}

// FORM SUBMIT INTEGRATION
const leadForm = document.getElementById('main-lead-form');
if (leadForm) {
    leadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        const name = document.getElementById('user-name').value;
        const phone = document.getElementById('user-phone').value;
        const question = document.getElementById('user-question').value;

        const tgText = `🎯 <b>YANGI LEAD (QOMUS)!</b>\n\n👤 <b>Ism:</b> ${name}\n📞 <b>Tel:</b> ${phone}\n❓ <b>Muddat:</b> ${question}`;

        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: tgText, parse_mode: 'HTML' })
            });
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, question })
            });
            alert('Rahmat! So\'rovingiz qabul qilindi.');
            this.reset();
        } catch (err) {
            console.error(err);
        } finally {
            submitBtn.disabled = false;
        }
    });
}