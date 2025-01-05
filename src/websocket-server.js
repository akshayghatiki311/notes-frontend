import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });
const clients = new Map();

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received message:', data);
      
      switch (data.type) {
        case 'join_note':
          clients.set(ws, data.noteId);
          console.log(`Client joined note: ${data.noteId}`);
          break;

        case 'update_note':
          const noteId = clients.get(ws);
          for (const [client, clientNoteId] of clients.entries()) {
            if (clientNoteId === noteId) {
              const updateMessage = JSON.stringify({
                type: 'note_updated',
                noteId: data.noteId,
                content: data.content,
                title: data.title
              });
              console.log('Sending update message:', updateMessage);
              client.send(updateMessage);
            }
          }
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

console.log('WebSocket server is running on ws://localhost:3001');