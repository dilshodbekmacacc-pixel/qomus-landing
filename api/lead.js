// Lidni Telegram guruhiga yuboruvchi server funksiyasi.
// Bot tokeni faqat shu yerda, Vercel env o'zgaruvchilarida saqlanadi —
// brauzerga hech qachon tushmaydi.

const MAX = { name: 100, history: 300 };

// Oddiy tezlik cheklovi. Vercel funksiyani bir nechta nusxada ishga
// tushirishi mumkin, shuning uchun bu hisob har bir nusxada alohida —
// ya'ni mutlaq kafolat emas, lekin bitta manbadan ketma-ket kelayotgan
// spamni to'xtatish uchun yetarli. Qat'iy cheklov kerak bo'lsa,
// Vercel WAF (Pro tarif) yoki tashqi saqlagich (KV/Redis) kerak bo'ladi.
const WINDOW_MS = 60000;
const MAX_PER_WINDOW = 10;
const hits = new Map();

function clientIp(req) {
    const h = req.headers || {};
    const fwd = h['x-forwarded-for'];
    if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
    return h['x-real-ip'] || 'unknown';
}

function rateLimited(ip) {
    const now = Date.now();

    // Xotira cheksiz o'smasligi uchun eskirgan yozuvlarni tozalaymiz.
    if (hits.size > 5000) {
        for (const [k, v] of hits) {
            if (now > v.resetAt) hits.delete(k);
        }
    }

    const rec = hits.get(ip);
    if (!rec || now > rec.resetAt) {
        hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return 0;
    }

    rec.count += 1;
    return rec.count > MAX_PER_WINDOW ? Math.ceil((rec.resetAt - now) / 1000) : 0;
}

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

    const retryAfter = rateLimited(clientIp(req));
    if (retryAfter) {
        res.setHeader('Retry-After', String(retryAfter));
        return res.status(429).json({ ok: false, error: 'rate_limited' });
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
