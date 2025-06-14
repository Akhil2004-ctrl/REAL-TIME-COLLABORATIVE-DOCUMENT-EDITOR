const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
let currentText = '';

wss.on('connection', (ws) => {
  // Send current text to new user
  ws.send(JSON.stringify({ text: currentText }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    currentText = data.text;

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ text: currentText }));
      }
    });
  });
});

console.log('WebSocket server started on ws://localhost:3000');
