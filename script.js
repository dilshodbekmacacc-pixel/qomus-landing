// 1. TILLAR LUG'ATI (Header va asosiy matnlar uchun)
const translations = {
    uz: {
        orderBtn: "Buyurtma berish",
        callText: "📞 +998 71 203-04-08",
        freezeBtn: "Buyurtma berish"
    },
    uz_cyr: {
        orderBtn: "Буюртма бериш",
        callText: "📞 +998 71 203-04-08",
        freezeBtn: "Буюртма бериш"
    },
    ru: {
        orderBtn: "Заказать",
        callText: "📞 +998 71 203-04-08",
        freezeBtn: "Заказать"
    }
};

// 2. TILNI ALMASHTIRISH FUNKSIYASI
function changeLanguage(lang) {
    // Barcha til tugmalaridan 'active' klassini olib tashlash
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Tanlangan tugmaga 'active' klassini qo'shish
    const selectedBtn = Array.from(document.querySelectorAll('.lang-btn')).find(
        btn => btn.textContent.trim().toLowerCase() === (lang === 'uz_cyr' ? 'ўз' : lang)
    );
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Matnlarni almashtirish (Kelajakda 2, 3-bloklar qo'shilganda shu yerga ulanadi)
    const t = translations[lang];
    if (t) {
        const orderBtns = document.querySelectorAll('.btn-outline-green:not(.btn-phone-text)');
        orderBtns.forEach(btn => btn.textContent = t.orderBtn);

        const freezeBtn = document.querySelector('.btn-solid-green');
        if (freezeBtn) freezeBtn.textContent = t.freezeBtn;
    }
}

// 3. TUGMALARGA EVENT LISTENER BIRIKTIRISH
document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = e.target.textContent.trim().toLowerCase();
            let langCode = 'uz';
            if (text === 'ўз') langCode = 'uz_cyr';
            if (text === 'ru') langCode = 'ru';
            
            changeLanguage(langCode);
        });
    });
});