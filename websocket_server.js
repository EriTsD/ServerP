const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

wss.on('connection', (ws) => {
  // Evento que se ejecuta cuando se recibe un mensaje del cliente
  ws.on('message', (message) => {
    // Envia el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// Utiliza el puerto proporcionado por Vercel o el 8080 si se ejecuta localmente
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Servidor de websockets iniciado en el puerto ${port}`);
});
