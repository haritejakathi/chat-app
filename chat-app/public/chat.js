const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = (event) => {
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    message.textContent = event.data;
    messages.appendChild(message);
};

const sendMessage = () => {
    const input = document.getElementById('messageInput');
    const message = input.value;
    ws.send(message);
    input.value = '';
};
