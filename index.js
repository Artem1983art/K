const bedrock = require('bedrock-protocol');
const express = require('express');

// 1. Веб-сервер для Render (обязателен, чтобы хостинг не выключал приложение)
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send('Aternos Bedrock Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Web server is listening on port ${PORT}`);
});

// 2. Бот для подключения к Minecraft Bedrock
function createBot() {
    console.log('Попытка подключения к серверу Trainix.aternos.me:19132...');

    const client = bedrock.createClient({
        host: 'Trainix.aternos.me',
        port: 19132,
        username: 'TrainixBot', // Ник бота в игре
        offline: true          // Обязательно для серверов без официальной лицензии (пираток)
    });

    client.on('spawn', () => {
        console.log('Успех! Бот зашел на сервер Trainix.aternos.me!');
    });

    client.on('text', (packet) => {
        console.log(`[Чат] ${packet.message}`);
    });

    client.on('close', () => {
        console.log('Бот отключился от сервера. Пробуем переподключиться через 30 секунд...');
        setTimeout(createBot, 30000);
    });

    client.on('error', (err) => {
        console.log('Ошибка у бота:', err);
    });
}

// Запускаем подключение
createBot();
