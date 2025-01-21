import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import WebSocketService from "../services/websocket";

export default function EditorForm({ note, userEmail, onSave }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const [activeEditor, setActiveEditor] = useState(null);
  const [collaborators, setCollaborators] = useState(
    Array.isArray(note.collaborators) ? note.collaborators.join(", ") : ""
  );

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
  }, [note]);

  useEffect(() => {
    let timeoutId;
    
    WebSocketService.connect(note._id, (data) => {
      console.log('Received WebSocket data:', data);
      if (data.type === 'note_updated') {
        setTitle(data.title);
        setContent(data.content);
        if (data.email && data.email !== userEmail) {
          console.log('Setting active editor:', data.email);
          setActiveEditor(data.email);
          
          // Clear any existing timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          // Set new timeout
          timeoutId = setTimeout(() => {
            setActiveEditor(null);
          }, 2000);
        }
      }
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      WebSocketService.close();
    };
  }, [note._id, userEmail]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (note._id) {
      WebSocketService.send({
        type: 'update_note',
        noteId: note._id,
        content: newContent,
        title,
        email: userEmail
      });
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (note._id) {
      WebSocketService.send({
        type: 'update_note',
        noteId: note._id,
        content,
        title: newTitle,
        email: userEmail
      });
    }
  };

  const handleSave = () => {
    onSave({ 
      title, 
      content,
      collaborators: collaborators.split(',').map(email => email.trim()).filter(Boolean)
    });
  };

  const handleCancel = () => {
    WebSocketService.close();
    navigate('/dashboard');
  };

  return (
    <div className="p-4 space-y-4 main-content">
      <h1 className="font-bold text-2xl">Note Editor</h1>
      {activeEditor && activeEditor !== userEmail && (
        <div className="text-sm bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-md flex items-center">
          <div className="animate-pulse mr-2">●</div>
          <span>{activeEditor} is currently editing this note...</span>
        </div>
      )}
      <Input
        className="w-full max-w-4xl"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        />
      <Textarea
        className="w-full max-w-4xl h-64"
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
        />
      <Input
        className="w-full max-w-4xl"
        placeholder="Add Collaborators (comma-separated emails)"
        value={collaborators}
        onChange={(e) => setCollaborators(e.target.value)}
      />
      <div className="flex space-x-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}