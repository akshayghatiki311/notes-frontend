import * as dotenv from 'dotenv';

class WebSocketService {
    constructor() {
      this.ws = null;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
      this.isConnecting = false;
    }
  
    connect(noteId, onMessage) {
      if (this.isConnecting) return;
      this.isConnecting = true;
  
      try {
        this.ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        
        this.ws.onopen = () => {
          console.log('WebSocket connection established');
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.ws.send(JSON.stringify({ type: 'join_note', noteId }));
        };
  
        this.ws.onmessage = (event) => {
          try {
            if (event.data) {
              console.log('Received message:', event.data);
              const data = JSON.parse(event.data);
              onMessage(data);
            } else {
              console.warn('Received empty message');
            }
          } catch (error) {
            console.error('Error processing message:', error);
          }
        };
  
        this.ws.onclose = () => {
          console.log('WebSocket connection closed');
          this.isConnecting = false;
          this.reconnect(noteId, onMessage);
        };
  
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnecting = false;
        };
      } catch (error) {
        console.error('WebSocket connection error:', error);
        this.isConnecting = false;
      }
    }
  
    reconnect(noteId, onMessage) {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        setTimeout(() => {
          this.connect(noteId, onMessage);
        }, 1000 * this.reconnectAttempts);
      }
    }
  
    send(data) {
      if (this.ws) {
        const message = JSON.stringify({
          type: 'update_note',
          noteId: data.noteId,
          content: data.content,
          title: data.title
        });
        console.log('Sending message:', message);
        this.ws.send(message);
      } else {
        console.warn('WebSocket is not connected. Message not sent:', data);
      }
    }
  
    close() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    }
  }
  
  export default new WebSocketService();