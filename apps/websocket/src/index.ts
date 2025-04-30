import { WebSocketServer } from 'ws';
import { prismaClient } from 'db/client';


const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    console.log('Received:', message.toString());

    const user = await prismaClient.user.create({
      data: {
        username: Math.random().toString(36).substring(2, 10),
        password: Math.random().toString(36).substring(2, 10),
      },
    });
    ws.send(JSON.stringify({
      message: "User created",
      user,
    }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8081');