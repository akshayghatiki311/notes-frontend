import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import WebSocketService from "../services/websocket";
import debounce from 'lodash.debounce';

export default function EditorForm({ note, onSave, onContentUpdate }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const [collaborators, setCollaborators] = useState(
    Array.isArray(note.collaborators) ? note.collaborators.join(", ") : ""
  );

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
  }, [note]);

  useEffect(() => {
    if (onContentUpdate) {
      setContent(onContentUpdate.content);
    }
  }, [onContentUpdate]);

  const handleSave = () => {
    onSave({ 
      title, 
      content,
      collaborators
    });
  };

  const handleCancel = () => {
    WebSocketService.close();
    navigate('/dashboard');
  };

  const debouncedSend = useCallback(
    debounce((data) => {
      WebSocketService.send(data);
    }, 300),
    []
  );

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedSend({
      type: 'update_note',
      noteId: note._id,
      content: newContent,
      title,
    });
  };

  useEffect(() => {
    WebSocketService.connect(note._id, (data) => {
      if (data.type === 'note_updated') {
        setContent(data.content);
        setTitle(data.title);
      }
    });
  }, [content, title]);

  useEffect(() => {
    WebSocketService.connect(note._id, (data) => {
      if (data.type === 'note_updated') {
        setContent(data.content);
        setTitle(data.title);
      }
    });
  }, []);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSend({
      type: 'update_note',
      noteId: note._id,
      content,
      title: newTitle,
    });
  };



  return (
    <div className="p-4 space-y-4 main-content">
      <h1 className="font-bold text-2xl">Note Editor</h1>
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