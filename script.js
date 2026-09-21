const dictionary = {
    uz: {
        heroTag: "Sizning hikoyangiz hurmatga loyiq",
        heroTitle: "Vitiligo bilan yashashda o‘zingizni yolg‘iz his qilmang",
        heroDesc: "Qomus qora sedana kapsulalari — teri pigmentatsiyasini ichki tomondan oziqlantirish, immun balansini ushlash va organizmni zarur minerallar bilan ta’minlash uchun tabiiy yondashuv.",
        heroCallout: "<strong>Muhim eslatma:</strong> Qomus kapsulalari dori vositasi emas. Sahifa ma’lumot berish, ehtiyotkorlik va mutaxassis maslahatini olishga yo‘naltirilgan.",
        heroCta: "Bepul Ma’lumot va Konsultatsiya Olish",
        formH2: "Ma’lumot va buyurtma bo‘yicha qo‘ng‘iroq so‘rang",
        formBtn: "Qo‘ng‘iroq So‘rash va Ma'lumot Olish"
    },
    uz_cyr: {
        heroTag: "Сизнинг ҳикоянгиз ҳурматга лойиқ",
        heroTitle: "Витилиго билан яшашда ўзингизни ёлғиз ҳис қилманг",
        heroDesc: "Қомус қора седана капсулалари — тери пигментациясини ички томондан озиқлантириш, иммун балансини ушлаш ва организмни зарур минераллар билан таъминлаш учун табиий ёндашув.",
        heroCallout: "<strong>Муҳим еслатма:</strong> Қомус капсулалари дори воситаси емас. Саҳифа маълумот бериш, еҳтиёткорлик ва мутахассис маслаҳатини олишга йўналтирилган.",
        heroCta: "Бепул Маълумот ва Консультация Олиш",
        formH2: "Маълумот ва буюртма бўйича қўнғироқ сўранг",
        formBtn: "Қўнғироқ Сўраш ва Маълумот Олиш"
    },
    ru: {
        heroTag: "Ваша история заслуживает уважения",
        heroTitle: "Не чувствуйте себя одинокими, живя с витилиго",
        heroDesc: "Капсулы черного тмина Qomus — натуральный подход для питания пигментации кожи изнутри, поддержания иммунного баланса и обеспечения организма необходимыми минералами.",
        heroCallout: "<strong>Важное примечание:</strong> Капсулы Qomus не являются лекарственным средством. Страница предназначена для информации и консультаций.",
        heroCta: "Получить Бесплатную Консультацию",
        formH2: "Запросите звонок для информации и заказа",
        formBtn: "Запросить Звонок"
    }
};

function setLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');

    const t = dictionary[lang];
    document.getElementById('hero-tag').innerText = t.heroTag;
    document.getElementById('hero-title').innerText = t.heroTitle;
    document.getElementById('hero-desc').innerText = t.heroDesc;
    document.getElementById('hero-callout').innerHTML = t.heroCallout;
    document.getElementById('hero-cta-btn').innerText = t.heroCta;
    document.getElementById('form-h2').innerText = t.formH2;
    document.getElementById('form-btn').innerText = t.formBtn;
}