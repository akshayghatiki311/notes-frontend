import { io } from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnecting = false;
  }

  connect(noteId, onMessage) {
    if (this.socket) {
      console.log('Socket.IO is already connected');
      return;
    }

    try {
      this.socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true
      });

      this.socket.on('connect', () => {
        console.log('Socket.IO connection established');
        this.socket.emit('join_note', { noteId });
      });

      this.socket.on('note_updated', (data) => {
        console.log('Received update:', data);
        onMessage(data);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket.IO disconnected');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error);
      });

    } catch (error) {
      console.error('Socket.IO initialization error:', error);
    }
  }

  send(data) {
    if (this.socket && this.socket.connected) {
      const message = {
        type: 'update_note',
        noteId: data.noteId,
        content: data.content,
        title: data.title,
        email: data.email  // Add email
      };
      console.log('Sending WebSocket message:', message);
      this.socket.emit('update_note', message);
    } else {
      console.warn('Socket.IO is not connected. Message not sent:', data);
    }
  }

  close() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected() {
    return this.socket && this.socket.connected;
  }
}

export default new WebSocketService();