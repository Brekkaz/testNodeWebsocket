const { io } = require("socket.io-client");
const prompt = require("prompt");

let token = "jwt_token";
let url = 'http://ip:8008/chat';
let receiverId = '00000000-605f-4654-95c0-000000000000';

const socket = io(url, {
    transports: ['websocket'],
    autoConnect: true,
    auth: {
        token
    },
    query: {
        deviceId: '00000000-3c13-4a94-9a0f-000000000000'
    }
});

socket.on("connect", () => {
    console.log('Client connected');
    getMessage();
});
socket.on("connect_error", (error) => {
    console.log(error);
});
socket.on('exception', (data) => {
    console.log(data);
});
socket.on('error', (data) => {
    console.log(data);
});
socket.on('disconnect', (data) => {
    console.log('Client disconnected');
});
socket.on('newEvent', (data) => {
    console.log('newEvent');
});

function getMessage() {
    prompt.get("msg", (err, data) => {
        if (err) process.exit(1);
        socket.emit('typingMessage', {
            receiverId
        });
        socket.emit('newEvent', {
            text: data.msg,
            type: 'BASIC',
            contentType: 'TEXT',
            receiverId
        });
        getMessage();
    });
}

