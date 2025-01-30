const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Novo usuário conectado");

    ws.on("message", (message) => {
        console.log("Mensagem recebida:", message);

        // Enviar mensagem para todos os usuários conectados
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("Usuário desconectado");
    });
});

app.use(express.static(__dirname));

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});