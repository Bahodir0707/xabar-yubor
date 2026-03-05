const express = require('express');
const axios = require('axios');
const fs = require('fs'); // Ma'lumotlarni saqlash uchun
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const USERS_FILE = './users.json';

// Foydalanuvchilarni o'qish funksiyasi
const getUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE));
};

// 1. Ro'yxatdan o'tish (Register)
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

// 2. Kirish (Login)
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
app.listen(PORT, () => console.log(`Server ${PORT}-portda yondi`));