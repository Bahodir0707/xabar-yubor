// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TELEGRAM_TOKEN = '8646623223:AAHgvSmmF28fiw8Z4zam7nsi0iJwUn899P4';
const CHAT_ID = '1634980161';

// Frontend sahifasini ko'rsatish
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend.html'));
});

// Ma'lumotlarni qabul qilish va Telegramga yuborish
app.post('/send-data', async (req, res) => {
    const { name, phone, message } = req.body;
    
    const text = `🚀 **Yangi xabar!**\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n💬 Xabar: ${message}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'Markdown'
        });
        res.send("Ma'lumot yuborildi!");
    } catch (error) {
        res.status(500).send("Xatolik yuz berdi.");
    }
});

// server.js oxiridagi app.listen qismini mana bunga almashtiring:
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ${PORT}-portda ishlamoqda`);
});