// FAQ Accordion Toggle
function toggleFaq(btn) {
    const item = btn.parentElement;
    item.classList.toggle('active');
    const icon = btn.querySelector('.faq-icon');
    icon.innerText = item.classList.contains('active') ? '−' : '+';
}

// Translations Dictionary
const translations = {
    uz: {
        mobileInfo: "🚚 Tekin yetkazib berish | 🌿 100% tabiiy | ⭐ 20,000+ mijozlar",
        navBtn: "Konsultatsiya",
        heroBadge: "⭐ 20,000+ mamnun mijozlar ishonchi",
        heroTitle: "Teri pigmentatsiyasini ichki tomondan va hujayra darajasida qo'llab-quvvatlang",
        heroDesc: "Qomus — o'simlik ekstraktlari va hayotiy muhim minerallar birlashmasi. Teringizning naturally va bir tekis ko'rinishini qaytarish uchun maxsus ishlab chiqilgan majmua.",
        feat1: "100% Tabiiy tarkib",
        feat2: "Sertifikatlangan GMP",
        feat3: "Xavfsiz va samarali",
        heroBtn: "Bepul Konsultatsiya Olish",
        subCta: "🔒 Ma'lumotlaringiz sir tutilishi kafolatlanadi",
        
        howTitle: "Qomus Qanday Ishlaydi?",
        howSubtitle: "Organizmda melanotsitlar faoliyatini bosqichma-bosqich tiklash mexanizmi",
        step1Title: "Hujayraviy Oziqlanish",
        step1Desc: "Tarkibdagi mikroelementlar va Kashkarbegi ekstrakti qon aylanishi orqali melanotsitlarga yetib boradi.",
        step2Title: "Melanin Sintezi",
        step2Desc: "Mis va Rux minerallari pigment rang berish jarayonini ichki tomondan faollashtiradi.",
        step3Title: "Rang Balansi",
        step3Desc: "Muntazam qabul natijasida teri dog'lari atrofi bir tekis pigment bilan to'yinishni boshlaydi.",

        baTitle: "Natijalar: Avval va Keyin",
        baSubtitle: "Qomus majmuasini muntazam qabul qilish natijasida kuzatilgan o'zgarishlar",
        baCard1Title: "3 oylik qabul natijasi",
        baCard1Desc: "Qo'l sohasidagi teri pigmentining bosqichma-bosqich tiklanishi.",
        baCard2Title: "2 oylik qabul natijasi",
        baCard2Desc: "Yuz va bo'yin sohasidagi melanotsitlar faollashuvi va bir tekis tus.",

        ingTitle: "Qomus Tarkibidagi Tabiiy Kuch",
        ing1Title: "Ammi Majus (Kashkarbegi)",
        ing1Desc: "Melanotsitlarni rag'batlantiradi va terining nurlarga sezgirligini me'yorlashtiradi.",
        ing2Title: "Mis va Rux Minerallari",
        ing2Desc: "Melanin sintezida qatnashuvchi fermentlar faoliyatini ichki tomondan qo'llab-quvvatlaydi.",
        ing3Title: "Antioksidant Kompleks",
        ing3Desc: "Hujayralarni erkin radikallar va stress ta'sirida emirilishidan samarali himoya qiladi.",

        compTitle: "Nega Aynan Qomus?",
        thFeature: "Xususiyatlari",
        thOthers: "Oddiy Maz / Kremlar",
        tdF1: "Ta'sir qilishi",
        tdF2: "Tarkibi",
        tdF3: "Nojo'ya ta'sirlar",

        faqTitle: "Ko'p Beriladigan Savollar",
        faq1Q: "Qomus mahsulotini qancha vaqt qabul qilish kerak?",
        faq1A: "Maksimal va barqaror natija uchun kamida 2-3 oy muntazam qabul qilish tavsiya etiladi.",
        faq2Q: "Mahsulot nojo'ya ta'sirga egami?",
        faq2A: "Qomus 100% tabiiy tarkibga ega va to'g'ri dozada qabul qilinganda nojo'ya ta'sirlar kuzatilmaydi.",

        formTitle: "Bepul Mutaxassis Konsultatsiyasini Oling",
        formSubtitle: "Formani to'ldiring, mutaxassisimiz tez orada siz bilan bog'lanib, barcha savollaringizga javob beradi.",
        lblName: "Ismingiz:",
        lblPhone: "Telefon raqamingiz:",
        lblQ: "Bu holat qancha vaqtdan beri kuzatilmoqda?",
        opt1: "6 oygacha",
        opt2: "1 yildan 3 yilgacha",
        opt3: "3 yildan ortiq",
        formBtn: "Buyurtma va Konsultatsiya Olish"
    },
    uz_cyr: {
        mobileInfo: "🚚 Текин етказиб бериш | 🌿 100% табиий | ⭐ 20,000+ мижозлар",
        navBtn: "Консультация",
        heroBadge: "⭐ 20,000+ мамнун мижозлар ишончи",
        heroTitle: "Тери пигментациясини ички томондан ва ҳужайра даражасида қўллаб-қувватланг",
        heroDesc: "Қомус — ўсимлик экстрактлари ва ҳаётий муҳим минераллар бирлашмаси. Терингизнинг табиий ва бир текис кўринишини қайтариш учун махсус ишлаб чиқилган мажмуа.",
        feat1: "100% Табиий таркиб",
        feat2: "Сертификатланган GMP",
        feat3: "Хавфсиз ва самарали",
        heroBtn: "Бепул Консультация Олиш",
        subCta: "🔒 Маълумотларингиз сир тутилиши кафолатланади",

        howTitle: "Қомус Қандай Ишлайди?",
        howSubtitle: "Организмда меланоцитлар фаолиятини босқичма-босқич тиклаш механизми",
        step1Title: "Ҳужайравий Озиқланиш",
        step1Desc: "Таркибдаги микроэлементлар ва Кашкарбеги экстракти қон айланиши орқали меланоцитларга етиб боради.",
        step2Title: "Меланин Синтези",
        step2Desc: "Мис ва Рух минераллари пигмент ранг бериш жараёнини ички томондан фаоллаштиради.",
        step3Title: "Ранг Баланси",
        step3Desc: "Мунтазам қабул натижасида тери доғлари атрофи бир текис пигмент билан тўйинишни бошлайди.",

        baTitle: "Натижалар: Аввал ва Кейин",
        baSubtitle: "Қомус мажмуасини мунтазам қабул қилиш натижасида кузатилган ўзгаришлар",
        baCard1Title: "3 ойлик қабул натижаси",
        baCard1Desc: "Қўл соҳасидаги тери пигментининг босқичма-босқич тикланиши.",
        baCard2Title: "2 ойлик қабул натижаси",
        baCard2Desc: "Юз ва бўйин соҳасидаги меланоцитлар фаоллашуви ва бир текис тус.",

        ingTitle: "Қомус Таркибидаги Табиий Куч",
        ing1Title: "Ammi Majus (Кашкарбеги)",
        ing1Desc: "Меланоцитларни рағбатлантиради ва терининг нурларга сезувчанлигини меъёрлаштиради.",
        ing2Title: "Мис ва Рух Минераллари",
        ing2Desc: "Меланин синтезида қатнашувчи ферментлар фаолиятини ички томондан қўллаб-қувватлайди.",
        ing3Title: "Антиоксидант Комплекс",
        ing3Desc: "Ҳужайраларни эркин радикаллар ва стресс таъсирида емирилишидан самарали ҳимоя қилади.",

        compTitle: "Нега Айнан Қомус?",
        thFeature: "Хусусиятлари",
        thOthers: "Оддий Маз / Кремлар",
        tdF1: "Таъсир қилиши",
        tdF2: "Таркиби",
        tdF3: "Ножўя таъсирлар",

        faqTitle: "Кўп Бериладиган Саволлар",
        faq1Q: "Қомус маҳсулотини қанча вақт қабул қилиш керак?",
        faq1A: "Максимал ва барқарор натижа учун камида 2-3 ой мунтазам қабул қилиш тавсия этилади.",
        faq2Q: "Маҳсулот ножўя таъсирга эгами?",
        faq2A: "Қомус 100% табиий таркибга эга ва тўғри дозада қабул қилинганда ножўя таъсирлар кузатилмайди.",

        formTitle: "Бепул Мутахассис Консультациясини Олинг",
        formSubtitle: "Формани тўлдиринг, мутахассисимиз тез орада сиз билан боғланиб, барча саволларингизга жавоб беради.",
        lblName: "Исмингиз:",
        lblPhone: "Телефон рақамингиз:",
        lblQ: "Бу ҳолат қанча вақтдан бери кузатилмоқда?",
        opt1: "6 ойгача",
        opt2: "1 йилдан 3 йилгача",
        opt3: "3 йилдан ортиқ",
        formBtn: "Буюртма ва Консультация Олиш"
    },
    ru: {
        mobileInfo: "🚚 Бесплатная доставка | 🌿 100% Натурально | ⭐ 20,000+ клиентов",
        navBtn: "Консультация",
        heroBadge: "⭐ Доверие более 20,000+ довольных клиентов",
        heroTitle: "Поддержите пигментацию кожи на клеточном уровне изнутри",
        heroDesc: "Qomus — это комплекс растительных экстрактов и жизненно важных минералов, созданный для поддержки естественного баланса и ровного тона кожи.",
        feat1: "100% Натуральный состав",
        feat2: "Сертифицирован GMP",
        feat3: "Безопасно и эффективно",
        heroBtn: "Получить Бесплатную Консультацию",
        subCta: "🔒 Полная конфиденциальность ваших данных",

        howTitle: "Как Работает Qomus?",
        howSubtitle: "Пошаговый механизм восстановления активности меланоцитов",
        step1Title: "Клеточное Питание",
        step1Desc: "Микроэлементы и экстракт Амми Большой поступают к меланоцитам через кровоток.",
        step2Title: "Синтез Меланина",
        step2Desc: "Минералы медь и цинк активируют процесс выработки пигмента изнутри.",
        step3Title: "Баланс Тона",
        step3Desc: "При регулярном приеме пигментация вокруг пятен постепенно выравнивается.",

        baTitle: "Результаты: До и После",
        baSubtitle: "Изменения пигментации кожи при регулярном приеме комплекса Qomus",
        baCard1Title: "Результат за 3 месяца",
        baCard1Desc: "Постепенное восстановление пигментации кожи на руках.",
        baCard2Title: "Результат за 2 месяца",
        baCard2Desc: "Улучшение цветового баланса в области лица и шеи.",

        ingTitle: "Сила Природы в Составе Qomus",
        ing1Title: "Ammi Majus (Амми Большая)",
        ing1Desc: "Стимулирует меланоциты и нормализует чувствительность кожи.",
        ing2Title: "Минералы Медь и Цинк",
        ing2Desc: "Поддерживают ферменты, участвующие в синтезе меланина.",
        ing3Title: "Антиоксидантный Комплекс",
        ing3Desc: "Защищает клетки от разрушения свободными радикалами.",

        compTitle: "Почему Именно Qomus?",
        thFeature: "Характеристики",
        thOthers: "Обычные Мази / Кремы",
        tdF1: "Воздействие",
        tdF2: "Состав",
        tdF3: "Побочные эффекты",

        faqTitle: "Часто Задаваемые Вопросы",
        faq1Q: "Как долго нужно принимать Qomus?",
        faq1A: "Для устойчивого результата рекомендуется курс не менее 2-3 месяцев.",
        faq2Q: "Есть ли побочные эффекты?",
        faq2A: "Состав 100% натуральный, при правильном приеме побочные эффекты отсутствуют.",

        formTitle: "Получите Консультацию Специалиста",
        formSubtitle: "Заполните форму, и наш специалист свяжется с вами для консультации.",
        lblName: "Ваше имя:",
        lblPhone: "Ваш номер телефона:",
        lblQ: "Как долго наблюдается это состояние?",
        opt1: "До 6 месяцев",
        opt2: "От 1 до 3 лет",
        opt3: "Более 3 лет",
        formBtn: "Оформить Заказ и Консультацию"
    }
};

function changeLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');

    const t = translations[lang];
    document.getElementById('mobile-top-info').innerText = t.mobileInfo;
    document.getElementById('nav-btn').innerText = t.navBtn;
    document.getElementById('hero-badge').innerText = t.heroBadge;
    document.getElementById('hero-title').innerText = t.heroTitle;
    document.getElementById('hero-desc').innerText = t.heroDesc;
    document.getElementById('feat-1').innerText = t.feat1;
    document.getElementById('feat-2').innerText = t.feat2;
    document.getElementById('feat-3').innerText = t.feat3;
    document.getElementById('hero-btn-text').innerText = t.heroBtn;
    document.getElementById('sub-cta-text').innerText = t.subCta;

    document.getElementById('how-title').innerText = t.howTitle;
    document.getElementById('how-subtitle').innerText = t.howSubtitle;
    document.getElementById('step1-title').innerText = t.step1Title;
    document.getElementById('step1-desc').innerText = t.step1Desc;
    document.getElementById('step2-title').innerText = t.step2Title;
    document.getElementById('step2-desc').innerText = t.step2Desc;
    document.getElementById('step3-title').innerText = t.step3Title;
    document.getElementById('step3-desc').innerText = t.step3Desc;

    document.getElementById('ba-title').innerText = t.baTitle;
    document.getElementById('ba-subtitle').innerText = t.baSubtitle;
    document.getElementById('ba-card1-title').innerText = t.baCard1Title;
    document.getElementById('ba-card1-desc').innerText = t.baCard1Desc;
    document.getElementById('ba-card2-title').innerText = t.baCard2Title;
    document.getElementById('ba-card2-desc').innerText = t.baCard2Desc;

    document.getElementById('ing-title').innerText = t.ingTitle;
    document.getElementById('ing1-title').innerText = t.ing1Title;
    document.getElementById('ing1-desc').innerText = t.ing1Desc;
    document.getElementById('ing2-title').innerText = t.ing2Title;
    document.getElementById('ing2-desc').innerText = t.ing2Desc;
    document.getElementById('ing3-title').innerText = t.ing3Title;
    document.getElementById('ing3-desc').innerText = t.ing3Desc;

    document.getElementById('comp-title').innerText = t.compTitle;
    document.getElementById('th-feature').innerText = t.thFeature;
    document.getElementById('th-others').innerText = t.thOthers;
    document.getElementById('td-f1').innerText = t.tdF1;
    document.getElementById('td-f2').innerText = t.tdF2;
    document.getElementById('td-f3').innerText = t.tdF3;

    document.getElementById('faq-title').innerText = t.faqTitle;
    document.getElementById('faq1-q').innerText = t.faq1Q;
    document.getElementById('faq1-a').innerText = t.faq1A;
    document.getElementById('faq2-q').innerText = t.faq2Q;
    document.getElementById('faq2-a').innerText = t.faq2A;

    document.getElementById('form-title').innerText = t.formTitle;
    document.getElementById('form-subtitle').innerText = t.formSubtitle;
    document.getElementById('lbl-name').innerText = t.lblName;
    document.getElementById('lbl-phone').innerText = t.lblPhone;
    document.getElementById('lbl-q').innerText = t.lblQ;
    document.getElementById('opt-1').innerText = t.opt1;
    document.getElementById('opt-2').innerText = t.opt2;
    document.getElementById('opt-3').innerText = t.opt3;
    document.getElementById('form-btn-text').innerText = t.formBtn;
}