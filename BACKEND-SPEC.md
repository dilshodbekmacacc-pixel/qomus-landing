# `/api/lead` — backend spetsifikatsiyasi

Sayt `https://qomus-vitiligo.uz` da statik holda turibdi. Formadan
kelgan lidni Telegram guruhiga yuborish uchun **bitta endpoint** kerak.

> **Muhim tuzatish:** amoCRM Vercel funksiyasida **emas edi**. U brauzer
> tomonida, yashirin forma orqali to'g'ridan-to'g'ri `forms.amocrm.ru` ga
> yuboriladi va hozir ham ishlayapti. Backend unga tegmasa ham bo'ladi.
> Tafsilot — 5-bo'limda.

---

## 1. Endpoint

```
POST https://qomus-vitiligo.uz/api/lead
Content-Type: application/json
```

Sayt shu domenda bo'lgani uchun **CORS kerak emas**.

### So'rov tanasi

```json
{
  "name":    "Alisher Valiyev",
  "phone1":  "901234567",
  "phone2":  "912345678",
  "history": "2 yildan beri",
  "website": ""
}
```

| Maydon | Tip | Izoh |
|---|---|---|
| `name` | string | Mijoz ismi, 2–100 belgi |
| `phone1` | string | Asosiy raqam, **+998 siz, 9 ta raqam** |
| `phone2` | string | Qo'shimcha raqam, xuddi shunday |
| `history` | string | "Oq dog'lar qachondan beri", 1–300 belgi |
| `website` | string | **Honeypot** — pastga qarang |

### Javob

| Holat | HTTP | Tana |
|---|---|---|
| Yuborildi | 200 | `{"ok":true}` |
| Noto'g'ri ma'lumot | 400 | `{"ok":false,"error":"invalid_input"}` |
| Juda ko'p so'rov | 429 | `{"ok":false,"error":"rate_limited"}` + `Retry-After` |
| Telegram javob bermadi | 200 | `{"ok":false,"error":"telegram_failed"}` |
| POST emas | 405 | `{"ok":false,"error":"method_not_allowed"}` |

Frontend javobni **tekshirmaydi** — mijoz har holda "Rahmat" oynasini
ko'radi, chunki amoCRM lidni mustaqil oladi. Ya'ni backend ishlamay
qolsa ham forma sinmaydi. Shuning uchun xatolarni **logga yozing** —
aks holda nosozlik jim o'tib ketadi.

---

## 2. Honeypot

`website` maydoni formada bor, lekin ekrandan tashqariga chiqarilgan —
odam uni ko'rmaydi va to'ldirmaydi. **Bo'sh bo'lmasa — bu bot.**

Bunda `200 {"ok":true}` qaytaring, lekin Telegram'ga **hech narsa
yubormang**. Botga muvaffaqiyat ko'rsatilsa, u qayta urinmaydi.

---

## 3. Telegram

```
POST https://api.telegram.org/bot<TOKEN>/sendMessage
{ "chat_id": "<CHAT_ID>", "text": "...", "parse_mode": "HTML" }
```

Token va chat ID **alohida beriladi** (bu faylda yo'q — repo ochiq).
Ularni kodga yozmang, env o'zgaruvchisida saqlang.

### Xabar formati

```
🚀 <b>YANGI BUYURTMA (QOMUS)</b>

👤 <b>Mijoz:</b> {name}
📞 <b>Asosiy tel:</b> <code>+998{phone1}</code>
📱 <b>Qo'shimcha tel:</b> <code>+998{phone2}</code>
⏳ <b>Dog'lar tarixi:</b> {history}

🌐 <i>Sayt orqali yuborildi</i>
```

---

## 4. Uchta tuzoq — ularga tushmang

Bular amalda yuz bergan, shuning uchun alohida yozyapman.

### 4.1. HTML escape

`parse_mode: "HTML"` ishlatilgani uchun mijoz ismidagi `<` yoki `&`
xabarni buzadi yoki Telegram uni rad etadi. Foydalanuvchi matnini
qo'yishdan oldin almashtiring:

```
&  →  &amp;
<  →  &lt;
>  →  &gt;
```

### 4.2. Guruh supergruppaga o'tishi

Telegram guruhi supergruppaga aylansa **chat ID o'zgaradi**. Eski ID ga
yuborilgan xabar 400 bilan rad etiladi, lekin javobda yangisi keladi:

```json
{
  "ok": false,
  "error_code": 400,
  "description": "Bad Request: group chat was upgraded to a supergroup chat",
  "parameters": { "migrate_to_chat_id": -1004424962749 }
}
```

Shu ID bilan **darhol qayta yuboring** va logga ogohlantirish yozing.
Aks holda lidlar jim yo'qoladi — bu aynan shu loyihada bo'lgan va
uzoq vaqt sezilmay qolgan.

### 4.3. Telefon normalizatsiyasi

Frontend `+998` ni olib tashlaydi, lekin API ga to'g'ridan-to'g'ri
so'rov kelishi mumkin. Avval raqam bo'lmagan belgilarni tashlang,
keyin boshidagi `998` ni olib tashlang, keyin 9 ta raqamga kesing —
shu tartibda. Teskari tartib `+998901234567` ni buzadi.

---

## 5. amoCRM — backend kerak emas

Brauzer tomonida, yashirin forma orqali ishlaydi:

```html
<form method="POST" action="https://forms.amocrm.ru/queue/add"
      target="amo_hidden_iframe">
  <input type="hidden" name="form_id" value="1747798">
  <input type="hidden" name="hash"    value="24e6963abc7ee9c7741b94c3d67693a7">
  <input type="hidden" name="fields[name_1]">
  <input type="hidden" name="fields[phone_1]">
  <input type="hidden" name="fields[note_2]">
</form>
```

`fields[note_2]` ga uchta qator tushadi:

```
📞 Асосий тел: +998901234567
📱 Қўшимча тел: +998912345678
⏳ Оқ доғлар тарихи: 2 йилдан бери
```

Bu `form_id` va `hash` saytning HTML'ida ochiq turibdi — amoCRM web
formasining dizayni shunday. Ya'ni kimdir to'g'ridan-to'g'ri soxta lid
yubora oladi. Agar bu bezovta qilsa, amoCRM'ni ham backend'ga ko'chirib,
HTML'dan olib tashlash kerak bo'ladi.

---

## 6. Tezlik cheklovi

Vercel'dagi nusxada: **bir IP dan daqiqasiga 10 ta so'rov**, oshsa 429
va `Retry-After`.

10 ta deb olinganining sababi: O'zbekistonda mobil operatorlar NAT
ortida ko'p foydalanuvchini bitta IP ga joylashtiradi. Past chek
haqiqiy mijozlarni bloklab qo'yadi.

Cheklov **validatsiyadan oldin** ishlaydi — aks holda bo'sh so'rovlar
bilan cheksiz urinish mumkin bo'lardi.

---

## 7. Formadagi maydonlar

| HTML `id` | Tip | Cheklov |
|---|---|---|
| `clientName` | text | `maxlength=100`, majburiy |
| `clientPhone1` | tel | `pattern=[0-9]{9}`, majburiy |
| `clientPhone2` | tel | `pattern=[0-9]{9}`, majburiy |
| `clientHistory` | text | `maxlength=300`, majburiy |
| `website` | text | honeypot, ekrandan tashqarida |

Frontend yuborishdan oldin o'zi ham tekshiradi, lekin **backend
qaytadan tekshirsin** — API ga to'g'ridan-to'g'ri so'rov kelishi mumkin.

---

## 8. Ishlaydigan namuna

To'liq, sinovdan o'tgan Node.js implementatsiyasi shu repoda:
`api/lead.js`. U Vercel uchun yozilgan (`module.exports = (req, res)`),
lekin mantiq har qanday stack'ka ko'chadi — yuqoridagi to'rtta tuzoq
ham o'sha yerda hal qilingan.
