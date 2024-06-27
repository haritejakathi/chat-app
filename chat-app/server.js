

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const userRoutes = require('./routes/user');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static('public'));

// API routes
app.use('/api', userRoutes);

// WebSocket connection
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

