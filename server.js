const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado.');

    // Eventos del servidor WebSocket
    ws.on('message', (message) => {
        console.log('Mensaje recibido del cliente:', message);
        // Aquí puedes procesar los mensajes recibidos del cliente y responder si es necesario
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
        // Aquí puedes manejar la lógica cuando un cliente se desconecta
    });
});

const PORT = 8080; // Puedes cambiar este puerto por el que desees

server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${PORT}.`);
});

