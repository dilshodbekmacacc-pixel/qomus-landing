// Lug'at (UZ, UZ-CYR, RU)
const dictionary = {
    uz: {
        badge: "Tabiiy Majmua",
        hero_title: "Teri pigmentatsiyasini ichki tomondan qo'llab-quvvatlash uchun",
        hero_desc: "Mikroelementlar, minerallar va o'simlik ekstraktlariga boy biologik faol majmua.",
        cta_btn: "Bepul konsultatsiya olish",
        features_title: "Tarkibiy ustunliklar",
        feat_1: "Hujayralarni erkin radikallardan va ultrabinafsha nurlanishning salbiy ta'siridan himoya qiladi.",
        feat_2: "Teri rang pigmentlari ishlab chiqarish jarayonlarini oziqlantiradi hamda immun tizimini balanslaydi.",
        feat_3: "Xalqaro standartlarga mos va xavfsiz laboratoriya tekshiruvlaridan o'tgan mahsulot.",
        usage_title: "Qabul qilish tartibi",
        usage_desc: "Kattalar uchun: Kuniga 1-2 mahaldan, ovqat paytida suv bilan qabul qilinadi.",
        cta_banner_title: "Mutaxassisdan batafsil ma'lumot oling",
        cta_banner_desc: "So'rov qoldiring, operatorlarimiz siz bilan bog'lanishadi.",
        disclaimer_title: "DIQQAT:",
        disclaimer_text: "Ushbu mahsulot Biologik Faol Qo'shimcha (BAD) hisoblanadi va dori vositasi emas. Kasalliklarni davolash uchun mo'ljallanmagan. Qo'llashdan oldin shifokor bilan maslahatlashish tavsiya etiladi.",
        form_title: "Konsultatsiya olish",
        form_desc: "Ma'lumotlaringizni qoldiring, tez orada aloqaga chiqamiz.",
        label_name: "Ismingiz",
        label_phone: "Telefon raqamingiz",
        label_question: "Qancha vaqtdan beri kuzatilmoqda?",
        btn_submit: "Yuborish"
    },
    "uz-cyr": {
        badge: "Табиий Мажмуа",
        hero_title: "Тери пигментациясини ички томондан қўллаб-қувватлаш учун",
        hero_desc: "Микроэлементлар, минераллар ва ўсимлик экстрактларига бой биологик фаол мажмуа.",
        cta_btn: "Бепул консультация олиш",
        features_title: "Таркибий устунликлар",
        feat_1: "Ҳужайраларни эркин радикаллардан ва ультрабинафша нурланишнинг салбий таъсиридан ҳимоя қилади.",
        feat_2: "Тери ранг пигментлари ишлаб чиқариш жараёнларини озиқлантиради ҳамда иммун тизимини баланслайди.",
        feat_3: "Халқаро стандартларга мос ва хавфсиз лаборатория текширувларидан ўтган маҳсулот.",
        usage_title: "Қабул қилиш тартиби",
        usage_desc: "Катталар учун: Кунига 1-2 маҳалдан, овқат пайтида сув билан қабул қилинади.",
        cta_banner_title: "Мутахассисдан батафсил маълумот олинг",
        cta_banner_desc: "Сўров қолдиринг, операторларимиз сиз билан боғланишади.",
        disclaimer_title: "ДИҚҚАТ:",
        disclaimer_text: "Ушбу маҳсулот Биологик Фаол Қўшимча (БАД) ҳисобланади ва дори воситаси эмас. Касалликларни даволаш учун мўлжалланмаган. Қўллашдан олдин шифокор билан маслаҳатлашиш тавсия этилади.",
        form_title: "Консультация олиш",
        form_desc: "Маълумотларингизни қолдиринг, тез орада алоқага чиқамиз.",
        label_name: "Исмингиз",
        label_phone: "Телефон рақамингиз",
        label_question: "Қанча вақтдан бери кузатилмоқда?",
        btn_submit: "Юбориш"
    },
    ru: {
        badge: "Натуральный Комплекс",
        hero_title: "Для поддержки пигментации кожи изнутри",
        hero_desc: "Биологически активный комплекс, богатый микроэлементами, минералами и растительными экстрактами.",
        cta_btn: "Получить бесплатную консультацию",
        features_title: "Преимущества состава",
        feat_1: "Защищает клетки от свободных радикалов и негативного воздействия ультрафиолета.",
        feat_2: "Питает процессы выработки пигмента кожи и балансирует иммунную систему.",
        feat_3: "Сертифицированный продукт, прошедший лабораторные проверки качества.",
        usage_title: "Способ применения",
        usage_desc: "Для взрослых: по 1-2 капсулы в день во время еды, запивая водой.",
        cta_banner_title: "Получите подробную информацию",
        cta_banner_desc: "Оставьте заявку, и наши специалисты свяжутся с вами.",
        disclaimer_title: "ВНИМАНИЕ:",
        disclaimer_text: "Данный продукт является БАД и не является лекарственным средством. Не предназначен для лечения заболеваний. Перед применением рекомендуется проконсультироваться с врачом.",
        form_title: "Получить консультацию",
        form_desc: "Оставьте свои данные, мы свяжемся с вами в ближайшее время.",
        label_name: "Ваше имя",
        label_phone: "Ваш номер телефона",
        label_question: "Как долго это наблюдается?",
        btn_submit: "Отправить"
    }
};

// Tilni o'zgartirish funksiyasi
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const lang = btn.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[lang] && dictionary[lang][key]) {
            el.innerText = dictionary[lang][key];
        }
    });
}

// Modal Form
function openModal() {
    document.getElementById('leadModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('leadModal').style.display = 'none';
}