// Встановлюємо строгий режим
"use strict";

// Імпортуємо модуль http
import http from "http";

// Визначаємо порт для сервера
const PORT = 8000;

// Функція для отримання тіла запиту
const receiveBody = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

// Створюємо сервер
http
  .createServer(async (req, res) => {
    // Витягуємо необхідні властивості з запиту
    const { headers, url, method } = req;
    const { pathname, hostname } = new URL(url);

    // Задаємо параметри для зовнішнього запиту
    const options = { hostname, path: pathname, method, headers };

    // Ініціалізуємо зовнішній запит
    const request = http.request(
      options,
      (response) => void response.pipe(res),
    );

    // Обробляємо POST-запити, якщо такі є
    if (method === "POST") {
      const body = await receiveBody(req);
      request.write(body);
    }

    // Завершуємо зовнішній запит
    request.end();
  })
  .listen(PORT); // Слухаємо зазначений порт
