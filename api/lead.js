// Lidni Telegram guruhiga yuboruvchi server funksiyasi.
// Bot tokeni faqat shu yerda, Vercel env o'zgaruvchilarida saqlanadi —
// brauzerga hech qachon tushmaydi.

const MAX = { name: 100, history: 300 };

function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function clean(v, limit) {
    return typeof v === 'string' ? v.trim().slice(0, limit) : '';
}

// Faqat raqamlarni qoldiramiz; "+998 90 123 45 67" ham, "901234567" ham ishlaydi.
function phone(v) {
    let d = String(v == null ? '' : v).replace(/\D/g, '');
    if (d.length > 9 && d.startsWith('998')) d = d.slice(3);
    return d.slice(0, 9);
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ ok: false, error: 'method_not_allowed' });
    }

    const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});

    // Honeypot: odam bu maydonni ko'rmaydi, bot to'ldiradi.
    if (body.website) return res.status(200).json({ ok: true });

    const name = clean(body.name, MAX.name);
    const phone1 = phone(body.phone1);
    const phone2 = phone(body.phone2);
    const history = clean(body.history, MAX.history);

    if (name.length < 2 || phone1.length !== 9 || phone2.length !== 9 || !history) {
        return res.status(400).json({ ok: false, error: 'invalid_input' });
    }

    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    // Sozlanmagan bo'lsa ham formani buzmaymiz — amoCRM baribir lidni oladi.
    if (!token || !chatId) {
        console.error('TG_BOT_TOKEN yoki TG_CHAT_ID o\'rnatilmagan');
        return res.status(200).json({ ok: false, error: 'not_configured' });
    }

    const text =
        '🚀 <b>YANGI BUYURTMA (QOMUS)</b>\n\n' +
        '👤 <b>Mijoz:</b> ' + esc(name) + '\n' +
        '📞 <b>Asosiy tel:</b> <code>+998' + phone1 + '</code>\n' +
        '📱 <b>Qo\'shimcha tel:</b> <code>+998' + phone2 + '</code>\n' +
        '⏳ <b>Dog\'lar tarixi:</b> ' + esc(history) + '\n\n' +
        '🌐 <i>Sayt orqali yuborildi</i>';

    function send(id) {
        return fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: id, text: text, parse_mode: 'HTML' })
        });
    }

    try {
        let tg = await send(chatId);
        let data = await tg.json().catch(function () { return {}; });

        // Oddiy guruh supergruppaga o'tkazilsa ID o'zgaradi va Telegram
        // yangisini qaytaradi. Lid yo'qolmasligi uchun darhol qayta yuboramiz.
        const migrated = data && data.parameters && data.parameters.migrate_to_chat_id;
        if (!data.ok && migrated) {
            console.warn(
                'Telegram guruh ID o\'zgargan: ' + chatId + ' -> ' + migrated +
                '. Vercel dagi TG_CHAT_ID ni yangilang.'
            );
            tg = await send(String(migrated));
            data = await tg.json().catch(function () { return {}; });
        }

        if (!data.ok) {
            console.error('Telegram rad etdi:', tg.status, JSON.stringify(data));
            return res.status(200).json({ ok: false, error: 'telegram_failed' });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Telegram xatosi:', err);
        return res.status(200).json({ ok: false, error: 'telegram_unreachable' });
    }
};

function safeParse(s) {
    try { return JSON.parse(s); } catch (e) { return {}; }
}
