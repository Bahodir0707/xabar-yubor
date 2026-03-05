const express = require('express');
const axios = require('axios');
const fs = require('fs'); 
const path = require('path');
const app = express();

app.use(express.json());

// --- BU QISMLARNI O'ZGARTIRING ---
// 1. Serverga "yangi dastur" papkasini ko'rsatamiz
app.use(express.static(path.join(__dirname, 'yangi dastur')));

// 2. Asosiy sahifaga kirganda frontend.html ni ochib berish
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'yangi dastur', 'frontend.html'));
});
// --------------------------------

const USERS_FILE = './users.json';

const getUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    try {
        const data = fs.readFileSync(USERS_FILE);
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        return res.status(400).send("Bu foydalanuvchi mavjud!");
    }
    users.push({ username, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
    res.send("Ro'yxatdan o'tdingiz!");
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, redirect: "https://kun.uz" });
    } else {
        res.status(401).json({ success: false, message: "Login yoki parol xato!" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlamoqda`));