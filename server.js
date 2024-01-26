import http from "http";
import httpProxy from "http-proxy";

// Створюємо проксі-сервер
const proxy = httpProxy.createProxyServer();

// Створюємо HTTP-сервер
const server = http.createServer((req, res) => {
  // Перенаправляємо запити через проксі до локального сервера на порті 8080
  proxy.web(req, res, { target: "http://localhost:3000" });
});

// Слухаємо порт, на якому буде доступний проксі-сервер
const port = 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Обробляємо помилки проксі
proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("Proxy error");
});
