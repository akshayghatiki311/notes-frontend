import {Server} from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();


const port = process.env.WEBSOCKET_PORT || 5001;
const io = new Server(port, {
  cors: {
    origin: ["http://localhost:5173", "https://notes-frontend-production.up.railway.app"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

const clients = new Map();
const noteClients = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join_note', (data) => {
    const { noteId } = data;
    clients.set(socket, noteId);
    if (!noteClients.has(noteId)) {
      noteClients.set(noteId, new Set());
    }
    noteClients.get(noteId).add(socket);
    console.log(`Client joined note: ${noteId}`);
  });

  socket.on('update_note', (data) => {
    console.log('Received update_note message:', data);
    const noteId = clients.get(socket);
    const clientSet = noteClients.get(noteId);
    if (clientSet && clientSet.size > 1) {
      for (const client of clientSet) {
        if (client !== socket) {
          const updateMessage = {
            type: 'note_updated',
            noteId: data.noteId,
            content: data.content,
            title: data.title,
            email: data.email  // Add email
          };
          console.log('Sending update message to client:', updateMessage);
          client.emit('note_updated', updateMessage);
        }
      }
    }
  });

  socket.on('disconnect', () => {
    const noteId = clients.get(socket);
    if (noteId) {
      const clientSet = noteClients.get(noteId);
      if (clientSet) {
        clientSet.delete(socket);
        if (clientSet.size === 0) {
          noteClients.delete(noteId);
        }
      }
      clients.delete(socket);
    }
    console.log('Client disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
    const noteId = clients.get(socket);
    if (noteId) {
      const clientSet = noteClients.get(noteId);
      if (clientSet) {
        clientSet.delete(socket);
        if (clientSet.size === 0) {
          noteClients.delete(noteId);
        }
      }
      clients.delete(socket);
    }
  });
});

console.log(`Socket.IO server is running on http://localhost:${port}`);